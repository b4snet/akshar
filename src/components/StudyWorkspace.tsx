"use client";

import { useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { UploadIcon, FileIcon, ImageIcon, LinkIcon, TrashIcon, RefreshCwIcon, CheckIcon, AlertCircleIcon, LoaderIcon } from "@/components/StudyIcons";

type SourceFormat = "pdf" | "image" | "text" | "url";
type SourceStatus = "pending" | "extracting" | "ready" | "failed";

interface StudySource {
  id: string;
  title: string;
  format: SourceFormat;
  status: SourceStatus;
  progress: number;
  extracted_data: ExtractedData | null;
  error_message: string | null;
  storage_path: string;
  created_at: string;
  updated_at: string;
}

interface ExtractedData {
  title?: string;
  overview?: string;
  keyPoints?: string[];
  pageCount?: number;
  wordCount?: number;
  [key: string]: unknown;
}

const config = getSupabaseConfig();
const supabase = config ? createSupabaseBrowserClient(config) : null;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const ALLOWED_TEXT_TYPES = ["text/plain", "text/markdown"];

function formatLabel(format: SourceFormat): string {
  switch (format) {
    case "pdf": return "PDF";
    case "image": return "Image";
    case "text": return "Text";
    case "url": return "URL";
  }
}

function statusLabel(status: SourceStatus): string {
  switch (status) {
    case "pending": return "Queued";
    case "extracting": return "Processing…";
    case "ready": return "Ready";
    case "failed": return "Failed";
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function StudyWorkspace() {
  const [sources, setSources] = useState<StudySource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "sources">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadSources() {
    if (!supabase) return;
    try {
      const { data, error: fetchError } = await supabase
        .from("study_sources")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setSources(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sources");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const isMounted = true;
    let cancelled = false;
    async function fetch() {
      if (!supabase || cancelled) return;
      try {
        const { data, error: fetchError } = await supabase
          .from("study_sources")
          .select("*")
          .order("created_at", { ascending: false });
        if (fetchError) throw fetchError;
        if (!cancelled && isMounted) {
          setSources(data ?? []);
        }
      } catch (err) {
        if (!cancelled && isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load sources");
        }
      } finally {
        if (!cancelled && isMounted) {
          setLoading(false);
        }
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, []);

  function detectFormat(file: File | null, url?: string): SourceFormat {
    if (url) return "url";
    if (!file) return "text";
    if (file.type === "application/pdf") return "pdf";
    if (ALLOWED_IMAGE_TYPES.includes(file.type)) return "image";
    if (ALLOWED_TEXT_TYPES.includes(file.type) || file.name.endsWith(".md") || file.name.endsWith(".txt")) return "text";
    return "text";
  }

  function validateFile(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) return `File "${file.name}" exceeds 10 MB limit.`;
    const format = detectFormat(file);
    if (format === "pdf" && file.type !== "application/pdf") return `File "${file.name}" is not a valid PDF.`;
    if (format === "image" && !ALLOWED_IMAGE_TYPES.includes(file.type)) return `Image "${file.name}" must be PNG, JPEG, WebP, or GIF.`;
    return null;
  }

  async function uploadSource(file: File | null, url?: string) {
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    const format = detectFormat(file, url);
    let title = file?.name ?? url ?? "Untitled";
    if (title.length > 120) title = title.slice(0, 117) + "…";

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (url) {
      try { new URL(url); } catch { setError("Please enter a valid URL."); return; }
    } else {
      setError("No file or URL provided.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Authentication required");

      // 1. Create source record
      const storagePath = `${user.id}/${crypto.randomUUID()}-${file?.name ?? "url"}`;
      const { data: source, error: insertError } = await supabase
        .from("study_sources")
        .insert({
          user_id: user.id,
          title,
          format,
          status: "pending",
          progress: 0,
          storage_path: storagePath,
        })
        .select()
        .single();
      if (insertError) throw insertError;

      // 2. Upload file to storage (if not URL)
      if (file) {
        const { error: uploadError } = await supabase.storage
          .from("study-sources")
          .upload(storagePath, file, { upsert: true });
        if (uploadError) throw uploadError;
      }

      // 3. Update status to extracting
      await supabase
        .from("study_sources")
        .update({ status: "extracting", progress: 10 })
        .eq("id", source.id);

      // 4. Trigger extraction (server-side function or edge function)
      // For now, we'll simulate extraction client-side for text/URL, 
      // and note that PDF/image extraction needs a server-side processor
      let extractedData: ExtractedData | null = null;
      let finalStatus: SourceStatus = "ready";
      const finalProgress = 100;
      let errorMessage: string | null = null;

      if (format === "url") {
        // URL extraction would need a server-side scraper
        extractedData = { title: "URL source", overview: "URL content extraction requires server-side processing." };
        errorMessage = "URL extraction not yet implemented server-side.";
        finalStatus = "failed";
      } else if (format === "text" && file) {
        const text = await file.text();
        extractedData = {
          title: file.name,
          overview: text.slice(0, 500) + (text.length > 500 ? "…" : ""),
          wordCount: text.split(/\s+/).filter(Boolean).length,
        };
      } else if (format === "image") {
        // Image OCR would need server-side processing
        extractedData = { title: file?.name ?? "Image", overview: "Image OCR requires server-side processing." };
        errorMessage = "Image OCR not yet implemented server-side.";
        finalStatus = "failed";
      } else if (format === "pdf") {
        // PDF text extraction would need server-side processing
        extractedData = { title: file?.name ?? "PDF", overview: "PDF text extraction requires server-side processing." };
        errorMessage = "PDF extraction not yet implemented server-side.";
        finalStatus = "failed";
      }

      // 5. Update with extraction results
      await supabase
        .from("study_sources")
        .update({
          status: finalStatus,
          progress: finalProgress,
          extracted_data: extractedData,
          error_message: errorMessage,
        })
        .eq("id", source.id);

      await loadSources();
      setActiveTab("sources");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function deleteSource(id: string) {
    if (!supabase) return;
    if (!confirm("Delete this source and its extracted content?")) return;

    try {
      const source = sources.find(s => s.id === id);
      if (source?.storage_path && supabase) {
        await supabase.storage.from("study-sources").remove([source.storage_path]);
      }
      const { error } = await supabase.from("study_sources").delete().eq("id", id);
      if (error) throw error;
      await loadSources();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function retryExtraction(id: string) {
    if (!supabase) return;
    try {
      const source = sources.find(s => s.id === id);
      if (!source) return;

      await supabase
        .from("study_sources")
        .update({ status: "extracting", progress: 10, error_message: null })
        .eq("id", id);

      // Re-trigger extraction logic here (same as upload)
      // For brevity, just reload - in production, call the extraction function
      await loadSources();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry failed");
    }
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) uploadSource(file);
    if (event.target) event.target.value = "";
  }

  function handleUrlSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    if (url?.trim()) uploadSource(null, url.trim());
    event.currentTarget.reset();
  }

  if (loading) {
    return (
      <section className="study-workspace" aria-label="Study workspace">
        <div className="route-loading" role="status">Loading workspace…</div>
      </section>
    );
  }

  return (
    <section className="study-workspace" aria-label="Study workspace">
      <div className="study-workspace-header">
        <div>
          <div className="section-kicker">AI STUDY WORKSPACE</div>
          <h2>Your sources</h2>
        </div>
        <div className="study-workspace-tabs" role="tablist" aria-label="Workspace view">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "upload"}
            className={activeTab === "upload" ? "active" : ""}
            onClick={() => setActiveTab("upload")}
          >
            <UploadIcon width={16} height={16} /> Add source
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sources"}
            className={activeTab === "sources" ? "active" : ""}
            onClick={() => setActiveTab("sources")}
          >
            <FileIcon width={16} height={16} /> My sources ({sources.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="study-error" role="alert">
          <AlertCircleIcon width={18} height={18} />
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      {activeTab === "upload" && (
        <div className="study-upload-panel" role="tabpanel" aria-label="Add source">
          <div className="upload-section">
            <h3>Upload file</h3>
            <p className="upload-hint">PDF, PNG, JPEG, WebP, GIF, TXT, MD — up to 10 MB</p>
            <div className="file-drop-zone" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.md"
                onChange={handleFileSelect}
                style={{ display: "none" }}
                disabled={uploading}
              />
              <UploadIcon width={48} height={48} />
              <p>Click or drag a file here</p>
              <span className="upload-hint">or</span>
            </div>
            {uploading && <p className="upload-progress">Uploading and processing…</p>}
          </div>

          <div className="upload-divider" aria-hidden="true"><span>or</span></div>

          <div className="upload-section">
            <h3>Add URL</h3>
            <p className="upload-hint">Paste a link to an article, paper, or web page</p>
            <form onSubmit={handleUrlSubmit} className="url-form">
              <label htmlFor="url-input" className="visually-hidden">URL</label>
              <input
                id="url-input"
                type="url"
                name="url"
                placeholder="https://example.com/article"
                required
                disabled={uploading}
              />
              <button type="submit" className="button button-primary" disabled={uploading}>
                {uploading ? "Adding…" : "Add URL"}
              </button>
            </form>
            <p className="upload-hint">URL extraction requires server-side processing (not yet implemented).</p>
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="study-sources-panel" role="tabpanel" aria-label="Your sources">
          {sources.length === 0 ? (
            <div className="empty-state">
              <FileIcon width={48} height={48} />
              <strong>No sources yet</strong>
              <p>Upload a PDF, image, text file, or add a URL to get started.</p>
              <button type="button" className="button button-primary" onClick={() => setActiveTab("upload")}>
                <UploadIcon width={16} height={16} /> Add your first source
              </button>
            </div>
          ) : (
            <div className="sources-grid">
              {sources.map((source) => (
                <article key={source.id} className="source-card">
                  <div className="source-header">
                    <div className="source-format-badge">
                      {source.format === "pdf" && <FileIcon width={16} height={16} />}
                      {source.format === "image" && <ImageIcon width={16} height={16} />}
                      {source.format === "text" && <FileIcon width={16} height={16} />}
                      {source.format === "url" && <LinkIcon width={16} height={16} />}
                      <span>{formatLabel(source.format)}</span>
                    </div>
                    <span className={`source-status ${source.status}`}>
                      {source.status === "extracting" && <LoaderIcon width={14} height={14} />}
                      {source.status === "ready" && <CheckIcon width={14} height={14} />}
                      {source.status === "failed" && <AlertCircleIcon width={14} height={14} />}
                      {source.status === "pending" && <LoaderIcon width={14} height={14} />}
                      {statusLabel(source.status)}
                    </span>
                  </div>
                  <h3 className="source-title">{source.title}</h3>
                  <p className="source-date">Added {formatDate(source.created_at)}</p>

                  {source.status === "ready" && source.extracted_data && (
                    <div className="source-preview">
                      {source.extracted_data.overview && (
                        <p className="source-overview">{source.extracted_data.overview}</p>
                      )}
                      <div className="source-meta">
                        {source.extracted_data.pageCount && (
                          <span><FileIcon width={14} height={14} /> {source.extracted_data.pageCount} pages</span>
                        )}
                        {source.extracted_data.wordCount && (
                          <span><FileIcon width={14} height={14} /> {source.extracted_data.wordCount} words</span>
                        )}
                        {source.extracted_data.keyPoints && source.extracted_data.keyPoints.length > 0 && (
                          <span><FileIcon width={14} height={14} /> {source.extracted_data.keyPoints.length} key points</span>
                        )}
                      </div>
                    </div>
                  )}

                  {source.status === "failed" && source.error_message && (
                    <div className="source-error" role="alert">
                      <AlertCircleIcon width={14} height={14} />
                      <span>{source.error_message}</span>
                      <button type="button" className="retry-button" onClick={() => retryExtraction(source.id)}>
                        <RefreshCwIcon width={14} height={14} /> Retry
                      </button>
                    </div>
                  )}

                  <div className="source-actions">
                    {source.status === "ready" && source.extracted_data && (
                      <button type="button" className="button button-secondary" onClick={() => {
                        // TODO: Navigate to generation page with this source
                        alert("Generate study aids from this source — coming soon");
                      }}>
                        Generate study aids
                      </button>
                    )}
                    <button
                      type="button"
                      className="button button-ghost"
                      onClick={() => deleteSource(source.id)}
                      disabled={uploading}
                    >
                      <TrashIcon width={14} height={14} /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}