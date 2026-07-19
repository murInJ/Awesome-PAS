# Benchmarks

[中文](./README.zh-CN.md) · [Home](../README.md)

The first release defines a comparison schema and records protocols without mixing incompatible numbers. Add numerical results only when all of the following are known: train/validation/test split, threshold rule, metrics, extra data and source.

## Protocol inventory

| Benchmark | Trait | Dataset | Protocol | Train Condition | Test Condition | Primary Metrics | Threshold Rule | Status | Source |
|:---|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Closed Set | Palmprint | XJTU-PalmReplay | Intra-Dataset | Known identities/devices split | Held-out samples from known domains | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Open Set | Palmprint | XJTU-PalmReplay | Unknown Attack | Known attack domains | Held-out attack domain or configuration | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Cross Domain | Palmprint | XJTU-PalmReplay | Cross-Device; Domain Generalization | Multiple display-capture domains | Unseen display-capture domain | HTER; AUC; ACER | Must be reported | Defined | [ICIP 2023](https://doi.org/10.1109/ICIP49359.2023.10223182) |
| VERA PalmVein PAD | Palm Vein | VERA Spoofing PalmVein | Intra-Dataset | Subject-disjoint split preferred | Held-out bona-fide and print samples | APCER; BPCER; ACER; AUC | Must be reported | Needs harmonization | [Dataset](https://zenodo.org/records/4580200) |
| PVASD Benchmark | Palm Vein | PVASD | Known and Unknown Attack | Official split | Physical and AI-generated attacks | APCER; BPCER; ACER; AUC | Official protocol | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) |

## Required result table

Use this schema in future benchmark files:

| Method | Venue | Train Domains | Validation Domain | Test Domain | Extra Data | APCER | BPCER | ACER | HTER | AUC | Threshold Rule | Result Source | Code |
|:---|:---|:---|:---|:---|:---|---:|---:|---:|---:|---:|:---|:---|:---:|

## Metric policy

- Prefer ISO-style `APCER`, `BPCER` and `ACER` for PAD reporting.
- Report per-PAI-species APCER when available; do not hide weak attacks behind a single mean.
- For `HTER`, select the threshold on validation data using an explicitly stated rule, freeze it, then evaluate the test set.
- Do not infer a threshold from AUC alone; AUC is threshold-independent.
- Keep original-paper results separate from independent reproductions.
