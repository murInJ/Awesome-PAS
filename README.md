<div align="center">

# 🖐️ Awesome Palm Authentication Security

### Presentation attacks, digital injection attacks, liveness detection, datasets and benchmarks for palm authentication

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Validate Markdown](https://github.com/OWNER/Awesome-PAS/actions/workflows/validate.yml/badge.svg)](https://github.com/OWNER/Awesome-PAS/actions/workflows/validate.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-dashboard-blue)](./index.html)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[English](./README.md) · [简体中文](./README.zh-CN.md) · [Insights Dashboard](./index.html) · [中文数据看板](./index.zh.html)

</div>

---

`Awesome-PAS` is a manually curated, reproducibility-oriented collection for **Palm Authentication Security**. It currently covers:

- **Type 1 — Physical Presentation Attacks:** print, display/replay, cutout, hybrid, 3D/material and physical adversarial attacks presented to a sensor.
- **Type 2 — Digital and Injection Attacks:** synthetic, reconstructed, adversarial or injected palm data that bypasses or manipulates the normal capture path.
- **Defenses and resources:** palmprint PAD, palm-vein PAD, palm-video physiological liveness, attack generation, datasets, standards and benchmarks.

System security, biometric-template protection and privacy attacks are intentionally **out of scope for the current version**.

## Browse

| Collection | Scope |
|:---|:---|
| [Physical Presentation Attack Detection](./Palm-Presentation-Attack-Detection.md) | Palmprint and palm-vein PAD methods for sensor-level attacks |
| [Digital and Injection Attacks](./Palm-Digital-Injection-Attacks.md) | Synthetic, reconstruction, adversarial and injection threats |
| [Physiological Liveness](./Palm-Physiological-Liveness.md) | rPPG, pulse, SpO2, temporal and cross-modal physiological cues |
| [Attack Generation](./Palm-Attack-Generation.md) | Construction and generation of physical or digital attack samples |
| [Datasets](./Datasets/README.md) | Public, request-based, announced and unavailable datasets |
| [Benchmarks](./Benchmarks/README.md) | Protocol definitions, metrics and comparable results |
| [Surveys and Standards](./Surveys-and-Standards.md) | Surveys, ISO/IEC 30107 and FIDO references |

## Data model

Markdown is the **single source of truth**. Each structured table follows a fixed schema. The website loads the Markdown files directly with JavaScript, parses the tables, deduplicates repeated papers and automatically builds:

- paper and dataset counters;
- year, trait, modality, attack and learning-setting distributions;
- code and dataset availability statistics;
- full-text search and multi-condition filters.

No paper list or chart count is duplicated in JavaScript.

## Repository setup

After creating `OWNER/Awesome-PAS` on GitHub, replace the badge and citation placeholders with:

```bash
python scripts/configure_repo.py OWNER
```

## Local preview

Browser security blocks `fetch()` for local `file://` pages. Start a small static server from the repository root:

```bash
python -m http.server 8000
```

Then open:

- English: `http://localhost:8000/index.html`
- 中文: `http://localhost:8000/index.zh.html`

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). New rows must use the controlled vocabulary and the exact table columns so the dashboard remains machine-readable.

## License

The repository structure, code and original documentation are released under the [MIT License](./LICENSE). Linked papers, datasets and third-party repositories retain their own licenses.
