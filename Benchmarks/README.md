# Benchmarks

[中文](./README.zh-CN.md) · [Home](../README.md) · [Web benchmark section](../index.html#benchmarks)

Benchmark protocols are ordered by the publication year of their defining source. Numerical results should be added only when the train/validation/test split, threshold rule, metrics, extra data and result source are all known.

## Year 2026

| Benchmark | Year | Trait | Dataset | Protocol | Train Condition | Test Condition | Primary Metrics | Threshold Rule | Status | Source |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| PVASD Benchmark | 2026 | Palm Vein | PVASD | Unknown Attack; Anomaly Detection | Official split | Physical and AI-generated attacks | APCER; BPCER; ACER; AUC | Official protocol | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) |

## Year 2025

| Benchmark | Year | Trait | Dataset | Protocol | Train Condition | Test Condition | Primary Metrics | Threshold Rule | Status | Source |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Closed Set | 2025 | Palmprint | XJTU-PalmReplay | Intra-Dataset | Known identities/devices split | Held-out samples from known domains | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Open Set | 2025 | Palmprint | XJTU-PalmReplay | Unknown Attack | Known attack domains | Held-out attack domain or configuration | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |

## Year 2023

| Benchmark | Year | Trait | Dataset | Protocol | Train Condition | Test Condition | Primary Metrics | Threshold Rule | Status | Source |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Cross Domain | 2023 | Palmprint | XJTU-PalmReplay | Cross-Device; Domain Generalization | Multiple display-capture domains | Unseen display-capture domain | HTER; AUC; ACER | Must be reported | Defined | [ICIP 2023](https://doi.org/10.1109/ICIP49359.2023.10223182) |

## Year 2015

| Benchmark | Year | Trait | Dataset | Protocol | Train Condition | Test Condition | Primary Metrics | Threshold Rule | Status | Source |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| VERA PalmVein PAD | 2015 | Palm Vein | VERA Spoofing PalmVein | Intra-Dataset | Subject-disjoint split preferred | Held-out bona-fide and print samples | APCER; BPCER; ACER; AUC | Must be reported | Needs harmonization | [Dataset](https://zenodo.org/records/4580200) |

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
