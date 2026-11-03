# scripts/ingestion/discover.py
"""Academic source discovery script.

* Parses the existing `curriculum_content` migration to extract the official
  source registry entries.
* Crawls the Tier‑1 portals (CDC, NEB, CDC library) for PDF resources.
* Respects `robots.txt` (crawl‑delay) and de‑duplicates URLs.
* Writes a JSON file `discovery_results.json` with two sections:
  `sources` – rows from `public.curriculum_sources`
  `documents` – metadata for each discovered PDF/HTML document.

The JSON can later be ingested into Supabase via RPCs.
"""

import re
import json
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Paths (repo root is two levels up from this file)
# ---------------------------------------------------------------------------
ROOT = Path(__file__).parents[2]
MIGRATION_PATH = ROOT / "supabase" / "migrations" / "202610120009_curriculum_content.sql"
OUTPUT_PATH = Path(__file__).parent / "discovery_results.json"

# Tier‑1 sites to crawl (limited to the home page for this demo)
TIER1_SITES = [
    "https://moecdc.gov.np/",
    "https://neb.gov.np/",
    "https://lib.moecdc.gov.np/",
]

# ---------------------------------------------------------------------------
# Helper to extract rows from the `curriculum_sources` INSERT statement
# ---------------------------------------------------------------------------
INSERT_RE = re.compile(r"insert into public\.curriculum_sources.*?values\s*(\(.*?\));", re.DOTALL)

def parse_sources(sql_text: str):
    sources = []
    m = INSERT_RE.search(sql_text)
    if not m:
        return sources
    values_block = m.group(1)
    # split rows – each row is surrounded by parentheses
    rows = re.findall(r"\(([^)]+)\)", values_block)
    for row in rows:
        # split on ',' that are inside quotes – simple split on "','"
        parts = re.split(r"'\s*,\s*'", "'" + row + "'")
        parts = [p.strip("'\n ") for p in parts]
        if len(parts) >= 13:
            sources.append({
                "id": parts[0],
                "organization": parts[1],
                "title": parts[2],
                "url": parts[3],
                "landing_url": parts[4] or None,
                "doc_year": parts[5] or None,
                "revision": parts[6] or None,
                "retrieved_at": parts[7] or None,
                "language": parts[8] or None,
                "license_note": parts[9] or None,
                "inspection_status": parts[10] or None,
                "notes": parts[11] or None,
                "covers": parts[12] or None,
            })
    return sources

# ---------------------------------------------------------------------------
# Robots.txt handling (very simple – only crawl‑delay)
# ---------------------------------------------------------------------------
def fetch_robots_txt(base_url: str) -> str:
    try:
        r = requests.get(urljoin(base_url, "robots.txt"), timeout=10)
        if r.status_code == 200:
            return r.text
    except Exception:
        pass
    return ""

def get_crawl_delay(txt: str) -> int:
    m = re.search(r"Crawl-delay:\s*(\d+)", txt, re.IGNORECASE)
    return int(m.group(1)) if m else 10

# ---------------------------------------------------------------------------
# Minimal crawler – fetches the start page and extracts absolute PDF links
# ---------------------------------------------------------------------------
def crawl_site(base_url: str, delay: int) -> list:
    docs = []
    try:
        r = requests.get(base_url, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href.lower().endswith('.pdf'):
                full_url = urljoin(base_url, href)
                docs.append({"url": full_url, "title": a.get_text(strip=True) or "(untitled)"})
        time.sleep(delay)
    except Exception as e:
        print(f"Crawl error for {base_url}: {e}")
    return docs

# ---------------------------------------------------------------------------
def main():
    # 1. Load existing source registry from migration
    sources = []
    if MIGRATION_PATH.exists():
        sql_text = MIGRATION_PATH.read_text(encoding="utf-8")
        sources = parse_sources(sql_text)
    else:
        print(f"Migration not found at {MIGRATION_PATH}")

    # 2. Crawl Tier‑1 sites for PDF documents
    seen = set()
    documents = []
    for site in TIER1_SITES:
        robots = fetch_robots_txt(site)
        delay = get_crawl_delay(robots)
        for doc in crawl_site(site, delay):
            if doc["url"] not in seen:
                seen.add(doc["url"])
                documents.append({
                    "id": None,
                    "url": doc["url"],
                    "title": doc["title"],
                    "retrieved_at": datetime.utcnow().isoformat() + "Z",
                    "file_type": "pdf",
                    "sha256": None,
                })
    discovery = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "sources": sources,
        "documents": documents,
    }
    OUTPUT_PATH.write_text(json.dumps(discovery, indent=2), encoding="utf-8")
    print(f"Discovery finished – {len(sources)} sources, {len(documents)} documents written to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
