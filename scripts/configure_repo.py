#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [ROOT / "README.md", ROOT / "README.zh-CN.md", ROOT / "CITATION.cff"]


def main() -> int:
    parser = argparse.ArgumentParser(description="Replace the OWNER placeholder with a GitHub account or organization.")
    parser.add_argument("owner", help="GitHub account or organization name")
    args = parser.parse_args()
    owner = args.owner.strip()
    if not owner or "/" in owner or " " in owner:
        parser.error("owner must be a GitHub account or organization name")
    changed = 0
    for path in TARGETS:
        text = path.read_text(encoding="utf-8")
        updated = text.replace("OWNER/Awesome-PAS", f"{owner}/Awesome-PAS")
        if updated != text:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed += 1
    print(f"Configured {changed} files for github.com/{owner}/Awesome-PAS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
