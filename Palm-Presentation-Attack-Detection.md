# Palm Presentation Attack Detection

[中文](./Palm-Presentation-Attack-Detection.zh-CN.md) · [Home](./README.md)

This collection covers sensor-level physical attacks against palm authentication. Multi-value fields use an English semicolon (`;`). `Code` is limited to official or clearly identified implementations.

## Year 2026

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [GBU-Palm: A Multimodal Video Dataset and Benchmark for Palm Presentation Attack Detection](https://arxiv.org/abs/2608.14389) | arXiv | 2026 | Palm Video; Palm Multimodal | RGB; NIR; Video | Print; Display Replay | Temporal; Spectral | Intra-Dataset; Cross-Subject; Cross-Environment | GBU-Palm | - | Announced | Introduces native-video RGB-NIR palm PAD with identity- and attack-lineage-disjoint P1/P2 protocols; benchmarks four video architectures and analyzes spectral and temporal evidence. Data release is announced; no code or download URL is provided. |
| [A Comprehensive Framework for Palm Vein Anti-Spoofing With Preprocessing Pipeline, Dataset, and Benchmark](https://doi.org/10.1109/TIFS.2025.3650391) | T-IFS | 2026 | Palm Vein | NIR | Print; 3D | Texture; Frequency | Intra-Dataset; Unknown Attack; Anomaly Detection | PVASD | [Code](https://github.com/valhongli/PVASD) | Announced | Large-scale framework with preprocessing, a dataset and representative benchmarks; repository availability should be rechecked periodically. |

## Year 2025

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Learning Discriminative Palmprint Anti-Spoofing Features via High-Frequency Spoofing Regions Adaptation](https://doi.org/10.1049/ipr2.70029) | IET Image Processing | 2025 | Palmprint | RGB | Display Replay | Frequency; Texture | Intra-Dataset; Unknown Attack; Cross-Device | XJTU-PalmReplay | - | Request | HFSRA; introduces closed-set, open-set and cross-domain protocols. |
| [Learning Domain-Adaptive Palmprint Anti-Spoofing Feature from Multi-Source Domains](https://doi.org/10.1016/j.displa.2024.102871) | Displays | 2025 | Palmprint | RGB | Display Replay | Texture | Domain Adaptation; Cross-Device | XJTU-PalmReplay | - | Request | DAPANet aligns global domains and bona-fide/spoof subdomains. |
| [FGFNet: Fourier Gated Feature-Fusion Network with Fractal Dimension Estimation for Robust Palm-Vein Spoof Detection](https://doi.org/10.3390/fractalfract9080478) | Fractal and Fractional | 2025 | Palm Vein | NIR | Synthetic; Print | Frequency; Texture | Intra-Dataset | VERA Spoofing PalmVein; PLUSVein-Contactless | [Code](https://github.com/SeungguKim98/Palm-Vein-Spoof-Detection) | Restricted | Fourier and fractal-dimension cues; repository provides weights and generated images. |

## Year 2023

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Palmprint Anti-Spoofing Based on Domain-Adversarial Training and Online Triplet Mining](https://doi.org/10.1109/ICIP49359.2023.10223182) | ICIP | 2023 | Palmprint | RGB | Display Replay | Texture | Domain Generalization; Cross-Device | XJTU-PalmReplay | - | Request | Domain-adversarial training and online triplet mining for unseen device domains. |

## Year 2022

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Presentation Attacks in Palmprint Recognition Systems](https://doi.org/10.33851/JMIS.2022.9.2.103) | JMIS | 2022 | Palmprint | RGB | Print; Display Replay; Physical Adversarial | Texture; Image Quality | Intra-Dataset | Six Palmprint PA Sets | - | Unavailable | Evaluates original, reconstructed and adversarial images after paper or monitor recapture. |

## Year 2018

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Securing Palm-Vein Sensors Against Presentation Attacks Using Image Noise Residuals](https://doi.org/10.1117/1.JEI.27.5.053028) | Journal of Electronic Imaging | 2018 | Palm Vein | NIR | Print | Noise; Texture | Intra-Dataset | VERA Spoofing PalmVein | - | Restricted | Median-filter noise residuals with local texture features and an SVM classifier. |

## Year 2015

| Title | Venue | Year | Trait | Modality | Attack | Cue | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [On the Vulnerability of Palm Vein Recognition to Spoofing Attacks](https://doi.org/10.1109/ICB.2015.7139056) | ICB | 2015 | Palm Vein | NIR | Print | Texture; Image Quality | Intra-Dataset | VERA Spoofing PalmVein | - | Restricted | Early vulnerability study and public palm-vein spoofing resource. |
