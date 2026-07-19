<div align="center">

# 🖐️ Awesome Palm Authentication Security

### Presentation attacks, digital injection attacks, liveness detection, datasets and benchmarks for palm authentication

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Validate Markdown](https://github.com/murInJ/Awesome-PAS/actions/workflows/validate.yml/badge.svg)](https://github.com/murInJ/Awesome-PAS/actions/workflows/validate.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-live-blue)](https://murinj.github.io/Awesome-PAS/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[Website](https://murinj.github.io/Awesome-PAS/) · [Repository](https://github.com/murInJ/Awesome-PAS) · [简体中文](./README.zh-CN.md)

</div>

---

`Awesome-PAS` is a bilingual, manually curated collection for **Palm Authentication Security**. The current scope includes:

- **Type 1 — Physical Presentation Attacks:** print, display/replay, cutout, hybrid, 3D/material and physical adversarial attacks presented to a sensor.
- **Type 2 — Digital and Injection Attacks:** synthetic, reconstructed, adversarial or injected palm data that bypasses or manipulates the normal capture path.
- **Defenses and resources:** palmprint PAD, palm-vein PAD, palm-video physiological liveness, attack generation, datasets, standards and benchmark protocols.

System security, biometric-template protection and privacy attacks are intentionally **out of scope for the current version**.

## Explore the collection

| Section | What it contains |
|:---|:---|
| [Methods](https://murinj.github.io/Awesome-PAS/#methods) | Detailed method cards ordered from newest to oldest, with trait, modality, attack, cue, setting, dataset and code information |
| [Datasets](https://murinj.github.io/Awesome-PAS/#datasets) | Palmprint, palm-vein and palm-video datasets ordered by release year, including scale, attacks, protocols and access status |
| [Benchmarks](https://murinj.github.io/Awesome-PAS/#benchmarks) | Benchmark protocols ordered by year, with train/test conditions, metrics and threshold rules |
| [Statistics & Trends](https://murinj.github.io/Awesome-PAS/#statistics) | Automatically calculated coverage, yearly growth, modality, attack, learning-setting and availability distributions |

## Markdown collections

| Collection | Scope |
|:---|:---|
| [Physical Presentation Attack Detection](./Palm-Presentation-Attack-Detection.md) | Palmprint and palm-vein PAD for sensor-level attacks |
| [Digital and Injection Attacks](./Palm-Digital-Injection-Attacks.md) | Synthetic, reconstruction, adversarial and injection threats |
| [Physiological Liveness](./Palm-Physiological-Liveness.md) | rPPG, pulse, SpO2, temporal and cross-modal physiological cues |
| [Attack Generation](./Palm-Attack-Generation.md) | Construction and generation of physical or digital attack samples |
| [Datasets](./Datasets/README.md) | Public, request-based, announced and unavailable datasets |
| [Benchmarks](./Benchmarks/README.md) | Protocol definitions, metrics and comparable results |
| [Surveys and Standards](./Surveys-and-Standards.md) | Surveys, ISO/IEC 30107 and FIDO references |

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). New entries must follow the fixed table schemas and controlled vocabulary so the website can parse them reliably.

## Citation

Use the repository metadata in [CITATION.cff](./CITATION.cff), and cite the original papers and datasets used in your work.

## License

The repository structure, website code and original documentation are released under the [MIT License](./LICENSE). Linked papers, datasets and third-party repositories retain their own licenses.
