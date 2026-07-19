# Palm Authentication Security Datasets

[中文](./README.zh-CN.md) · [Home](../README.md)

`Access` uses one controlled value: `Public`, `Request`, `Restricted`, `Announced`, `Unavailable` or `Unclear`.

| Dataset | Year | Trait | Modality | Sample Type | Subjects / Palm IDs | Bona Fide | Attacks | Attack Types | Devices / Domains | Protocol | Access | Paper / Page | Note |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| [VERA Spoofing PalmVein](https://zenodo.org/records/4580200) | 2015 | Palm Vein | NIR | Image | 50 subjects | 1000 | 1000 | Print | Open palm-vein sensor | Intra-Dataset | Restricted | [Paper](https://doi.org/10.1109/ICB.2015.7139056) | Attack images correspond to clients from the VERA PalmVein dataset. |
| XJTU-PalmReplay | 2023 | Palmprint | RGB | Image | 400 Palm IDs | 16000 | 80000 | Display Replay | 5 display-capture domain combinations | Intra-Dataset; Cross-Device; Unknown Attack | Request | [Paper](https://doi.org/10.1109/ICIP49359.2023.10223182) | Large palmprint replay dataset introduced with domain-generalization evaluation. |
| Short Hand Video rPPG Dataset | 2023 | Palm Video | RGB; Video | Video | 35 subjects | Unclear | Unclear | Print | Multiple smartphone models | Intra-Dataset | Unavailable | [Paper](https://doi.org/10.3390/electronics12173605) | Research dataset collected for 3 s, 5 s and 7 s rPPG-based experiments. |
| PVASD | 2026 | Palm Vein | NIR | Image | 5515 subjects | 880241 | 307278; 20000 AI-generated extension | Print; 3D; Synthetic | Commercial sensors; 5 resolutions | Intra-Dataset; Unknown Attack; Anomaly Detection | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) | Reported total: 1,187,519 captured images, with 16 physical attack types and an AI-generated extension. |
| Six Palmprint PA Sets | 2022 | Palmprint | RGB | Image | Based on source palmprint data | Unclear | 6 derived sets | Print; Display Replay; Reconstruction; Digital Adversarial | Paper and monitor recapture | Vulnerability Evaluation | Unavailable | [Paper](https://doi.org/10.33851/JMIS.2022.9.2.103) | Six sets combine three digital sources with two physical carriers. |
