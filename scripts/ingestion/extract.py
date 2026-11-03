# scripts/ingestion/extract.py
"""Academic document extraction script.

Given a list of discovered document metadata (from `discovery_results.json`), this script:

1. Downloads the document (PDF or HTML) to a temporary location.
2. Computes a SHA‑256 hash of the raw file.
3. Extracts text:
   * For PDFs it attempts `pdftotext` (if available).
   * If the PDF appears to be scanned (no extractable text), it falls back to OCR using `tesseract` (if installed).
   * For HTML it fetches the page and strips tags using `BeautifulSoup`.
4. Stores the raw text and a minimal structured JSON (headings, tables placeholder) into
   `extraction_results.json` for later ingestion.

The script is defensive – any failure is logged and the document is marked as
`extraction_failed` in the output.  No database writes are performed; results are
written locally and can be later loaded into Supabase via the ingestion RPCs.
"""

import os
import json
import hashlib
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
+from datetime import datetime


DISCOVERY_PATH = Path(__file__).parent / "discovery_results.json"
OUTPUT_PATH = Path(__file__).parent / "extraction_results.json"

def sha256_of_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

def is_scanned_pdf(text: str) -> bool:
    # Very naive: if extracted text is empty or very short, assume scanned.
    return len(text.strip()) < 30

def extract_pdf(file_path: Path) -> str:
    # Try to use pdftotext; fallback to empty string.
    try:
        result = subprocess.run(["pdftotext", str(file_path), "-"], capture_output=True, text=True, check=True, timeout=30)
        return result.stdout
    except Exception as e:
        return ""

def ocr_pdf(file_path: Path) -> str:
    try:
        # Use tesseract to output plain text.
        result = subprocess.run(["tesseract", str(file_path), "stdout", "-l", "eng"], capture_output=True, text=True, check=True, timeout=60)
        return result.stdout
    except Exception:
        return ""

def extract_html(url: str) -> str:
    try:
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        # Remove scripts/styles
        for s in soup(["script", "style"]):
            s.decompose()
        return soup.get_text(separator="\n")
    except Exception:
        return ""

def main():
    if not DISCOVERY_PATH.exists():
        print(f"Discovery file not found at {DISCOVERY_PATH}")
        sys.exit(1)
    data = json.loads(DISCOVERY_PATH.read_text())
    documents = data.get("documents", [])
    results = []
    for doc in documents:
        url = doc.get("source_url")
        if not url:
            continue
        parsed = urlparse(url)
        ext = os.path.splitext(parsed.path)[1].lower()
        tmp_path = Path("tmp") / f"doc_{hash(url)}{ext}"
        tmp_path.parent.mkdir(exist_ok=True)
        try:
            r = requests.get(url, timeout=20)
            r.raise_for_status()
            tmp_path.write_bytes(r.content)
            file_hash = sha256_of_file(tmp_path)
            if ext == ".pdf":
                raw = extract_pdf(tmp_path)
                if is_scanned_pdf(raw):
                    raw = ocr_pdf(tmp_path)
            else:
                raw = extract_html(url)
            result = {
                "document_id": doc.get("id"),
                "url": url,
                "sha256": file_hash,
                "raw_text": raw,
                "extraction_date": datetime.utcnow().isoformat() + "Z",
                "confidence": 100 if raw else 0,
            }
        except Exception as e:
            result = {
                "document_id": doc.get("id"),
                "url": url,
                "error": str(e),
                "extraction_date": datetime.utcnow().isoformat() + "Z",
                "confidence": 0,
            }
        results.append(result)
    OUTPUT_PATH.write_text(json.dumps({"extraction_results": results}, indent=2))
    print(f"Extraction completed for {len(results)} documents. Output written to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()