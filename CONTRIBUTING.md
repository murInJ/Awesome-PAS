# Contributing to Awesome-PAS

[中文](./CONTRIBUTING.zh-CN.md)

## Core rule

Markdown is the only source of truth. Do not hard-code paper counts, dataset counts or chart data in JavaScript.

## Before adding an item

1. Confirm that the work directly concerns palmprint, palm vein, palm video or multimodal palm authentication security.
2. Classify it as physical presentation, digital/injection, physiological liveness, attack generation, dataset, benchmark or survey/standard.
3. Prefer primary sources: DOI pages, publisher pages, official repositories and official dataset pages.
4. Verify the year, venue, code status and dataset access status.
5. Add the item to both English and Chinese Markdown files. Titles remain in their published language; notes are translated.

## Controlled vocabulary

Multi-value cells must use an English semicolon (`;`). Do not use commas, slashes or `+` as separators.

### Trait

`Palmprint`, `Palm Vein`, `Palm Video`, `Palm Multimodal`

### Modality

`RGB`, `NIR`, `Depth`, `Thermal`, `Multispectral`, `Hyperspectral`, `Video`, `PPG`, `SpO2`, `Pulse`

### Attack

`Print`, `Display Replay`, `Replay`, `Cutout`, `Hybrid`, `3D`, `Artificial Palmprint`, `Artificial Palm Vein`, `Physical Adversarial`, `Digital Injection`, `Synthetic`, `Reconstruction`, `Digital Adversarial`, `Cross-Modal Injection`

### Cue

`Texture`, `Frequency`, `Image Quality`, `Noise`, `Reflectance`, `Geometry`, `Depth`, `Spectral`, `Vascular`, `Temporal`, `rPPG`, `Pulse`, `SpO2`, `Cross-Modal Consistency`, `Active Illumination`, `Foundation Model`

### Setting

`Intra-Dataset`, `Cross-Subject`, `Cross-Device`, `Cross-Environment`, `Cross-Attack`, `Cross-Dataset`, `Domain Generalization`, `Domain Adaptation`, `Test-Time Adaptation`, `One-Class`, `Anomaly Detection`, `Missing Modality`, `Unknown Attack`

### Dataset access

`Public`, `Request`, `Restricted`, `Announced`, `Unavailable`, `Unclear`

## Required paper columns

```text
Title | Venue | Year | Trait | Modality | Attack | Cue/Target | Setting | Dataset | Code | Dataset Access | Note
```

Attack-generation tables use `Attack Surface` and `Target` instead of `Cue` and `Setting` where appropriate.

## Validation

Run:

```bash
python scripts/validate_markdown.py
node tests/parser.test.mjs
```

A pull request should not be merged while either command fails.
