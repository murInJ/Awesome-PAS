#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAIRS = [
    ("Palm-Presentation-Attack-Detection.md", "Palm-Presentation-Attack-Detection.zh-CN.md"),
    ("Palm-Digital-Injection-Attacks.md", "Palm-Digital-Injection-Attacks.zh-CN.md"),
    ("Palm-Physiological-Liveness.md", "Palm-Physiological-Liveness.zh-CN.md"),
    ("Palm-Attack-Generation.md", "Palm-Attack-Generation.zh-CN.md"),
    ("Datasets/README.md", "Datasets/README.zh-CN.md"),
]

CONTROLLED = {
    "trait": {"Palmprint", "Palm Vein", "Palm Video", "Palm Multimodal"},
    "modality": {"RGB", "NIR", "Depth", "Thermal", "Multispectral", "Hyperspectral", "Video", "PPG", "SpO2", "Pulse"},
    "attack": {"Print", "Display Replay", "Replay", "Cutout", "Hybrid", "3D", "Artificial Palmprint", "Artificial Palm Vein", "Physical Adversarial", "Digital Injection", "Synthetic", "Reconstruction", "Digital Adversarial", "Cross-Modal Injection"},
    "setting": {"Intra-Dataset", "Cross-Subject", "Cross-Device", "Cross-Environment", "Cross-Attack", "Cross-Dataset", "Domain Generalization", "Domain Adaptation", "Test-Time Adaptation", "One-Class", "Anomaly Detection", "Missing Modality", "Unknown Attack"},
    "access": {"Public", "Request", "Restricted", "Announced", "Unavailable", "Unclear"},
}

ALIASES = {
    "title": "title", "论文": "title", "dataset": "dataset", "数据集": "dataset",
    "year": "year", "年份": "year", "trait": "trait", "生物特征": "trait",
    "modality": "modality", "模态": "modality", "attack": "attack", "攻击": "attack", "攻击类型": "attack",
    "setting": "setting", "设置": "setting", "protocol": "setting", "协议": "setting",
    "datasetaccess": "access", "数据可用性": "access", "access": "access", "可用性": "access",
}


def normalize_header(text: str) -> str:
    return re.sub(r"[\s_`*：:]", "", text.lower()).strip()


def split_row(line: str) -> list[str]:
    return [c.strip() for c in line.strip().strip("|").split("|")]


def is_separator(line: str) -> bool:
    cells = split_row(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", c) for c in cells)


def extract_title(cell: str) -> str:
    match = re.search(r"\[([^\]]+)]\([^)]+\)", cell)
    return (match.group(1) if match else cell).strip()


def parse_tables(path: Path) -> list[dict[str, str]]:
    lines = path.read_text(encoding="utf-8").splitlines()
    records = []
    i = 0
    while i + 1 < len(lines):
        if lines[i].lstrip().startswith("|") and is_separator(lines[i + 1]):
            headers = split_row(lines[i])
            i += 2
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                cells = split_row(lines[i])
                if len(cells) != len(headers):
                    raise ValueError(f"{path.relative_to(ROOT)}:{i+1}: expected {len(headers)} cells, got {len(cells)}")
                record = {}
                for header, cell in zip(headers, cells):
                    key = ALIASES.get(normalize_header(header), normalize_header(header))
                    record[key] = cell
                records.append(record)
                i += 1
            continue
        i += 1
    return records


def values(cell: str) -> list[str]:
    return [v.strip() for v in cell.split(";") if v.strip() and v.strip() != "-"]


def validate_records(path: Path, records: list[dict[str, str]]) -> list[str]:
    errors = []
    titles = []
    for idx, record in enumerate(records, start=1):
        if "title" in record:
            title = extract_title(record["title"])
            titles.append(title.lower())
            if not re.fullmatch(r"20\d{2}|19\d{2}", record.get("year", "")):
                errors.append(f"{path}: record {idx}: invalid year {record.get('year')!r}")
        if "dataset" in record and "title" not in record:
            titles.append(extract_title(record["dataset"]).lower())
        for field in ("trait", "modality", "attack", "setting", "access"):
            if field not in record:
                continue
            for value in values(record[field]):
                if field == "setting" and value in {"Vulnerability Evaluation", "Paper-defined", "Must be reported", "Official protocol"}:
                    continue
                if value not in CONTROLLED[field]:
                    errors.append(f"{path}: record {idx}: unknown {field} value {value!r}")
    duplicates = [name for name, count in Counter(titles).items() if count > 1]
    if duplicates and "Attack-Generation" not in path.name:
        errors.append(f"{path}: duplicate rows: {duplicates}")
    return errors


def main() -> int:
    errors = []
    for en_rel, zh_rel in PAIRS:
        en_path, zh_path = ROOT / en_rel, ROOT / zh_rel
        en_records, zh_records = parse_tables(en_path), parse_tables(zh_path)
        errors.extend(validate_records(en_path, en_records))
        errors.extend(validate_records(zh_path, zh_records))
        if len(en_records) != len(zh_records):
            errors.append(f"Bilingual row mismatch: {en_rel}={len(en_records)}, {zh_rel}={len(zh_records)}")
        en_keys = sorted((extract_title(r.get("title") or r.get("dataset", "")), r.get("year", "")) for r in en_records)
        zh_keys = sorted((extract_title(r.get("title") or r.get("dataset", "")), r.get("year", "")) for r in zh_records)
        if en_keys != zh_keys:
            errors.append(f"Bilingual content mismatch: {en_rel} vs {zh_rel}")

    required = ["README.md", "README.zh-CN.md", "index.html", "index.zh.html", "assets/app.js"]
    for item in required:
        if not (ROOT / item).exists():
            errors.append(f"Missing required file: {item}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f" - {error}")
        return 1
    print("Validation passed: bilingual tables, controlled vocabulary and file structure are consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
