# 手掌物理呈现攻击检测

[English](./Palm-Presentation-Attack-Detection.md) · [首页](./README.zh-CN.md)

本页收录发生在生物特征采集传感器前端的物理攻击及其检测方法。多值字段统一使用英文分号 `;`；`Code` 仅填写官方或已明确标注来源的实现。

## 2026 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [A Comprehensive Framework for Palm Vein Anti-Spoofing With Preprocessing Pipeline, Dataset, and Benchmark](https://doi.org/10.1109/TIFS.2025.3650391) | T-IFS | 2026 | Palm Vein | NIR | Print; 3D | Texture; Frequency | Intra-Dataset; Unknown Attack; Anomaly Detection | PVASD | [Code](https://github.com/valhongli/PVASD) | Announced | 大规模掌静脉鉴伪框架，包含预处理、数据集和代表性 benchmark；需要定期复核仓库是否已开放。 |

## 2025 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Learning Discriminative Palmprint Anti-Spoofing Features via High-Frequency Spoofing Regions Adaptation](https://doi.org/10.1049/ipr2.70029) | IET Image Processing | 2025 | Palmprint | RGB | Display Replay | Frequency; Texture | Intra-Dataset; Unknown Attack; Cross-Device | XJTU-PalmReplay | - | Request | HFSRA，提出闭集、开集和跨域三类评测协议。 |
| [Learning Domain-Adaptive Palmprint Anti-Spoofing Feature from Multi-Source Domains](https://doi.org/10.1016/j.displa.2024.102871) | Displays | 2025 | Palmprint | RGB | Display Replay | Texture | Domain Adaptation; Cross-Device | XJTU-PalmReplay | - | Request | DAPANet 同时对齐全局域以及真实/攻击子域。 |
| [FGFNet: Fourier Gated Feature-Fusion Network with Fractal Dimension Estimation for Robust Palm-Vein Spoof Detection](https://doi.org/10.3390/fractalfract9080478) | Fractal and Fractional | 2025 | Palm Vein | NIR | Synthetic; Print | Frequency; Texture | Intra-Dataset | VERA Spoofing PalmVein; PLUSVein-Contactless | [Code](https://github.com/SeungguKim98/Palm-Vein-Spoof-Detection) | Restricted | 使用傅里叶和分形维数线索；仓库提供权重和生成图像。 |

## 2023 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Palmprint Anti-Spoofing Based on Domain-Adversarial Training and Online Triplet Mining](https://doi.org/10.1109/ICIP49359.2023.10223182) | ICIP | 2023 | Palmprint | RGB | Display Replay | Texture | Domain Generalization; Cross-Device | XJTU-PalmReplay | - | Request | 使用域对抗训练和在线三元组挖掘应对未见设备域。 |

## 2022 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Presentation Attacks in Palmprint Recognition Systems](https://doi.org/10.33851/JMIS.2022.9.2.103) | JMIS | 2022 | Palmprint | RGB | Print; Display Replay; Physical Adversarial | Texture; Image Quality | Intra-Dataset | Six Palmprint PA Sets | - | Unavailable | 将原始、重建和数字对抗图像通过纸张或显示器重新采集并评估攻击威胁。 |

## 2018 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Securing Palm-Vein Sensors Against Presentation Attacks Using Image Noise Residuals](https://doi.org/10.1117/1.JEI.27.5.053028) | Journal of Electronic Imaging | 2018 | Palm Vein | NIR | Print | Noise; Texture | Intra-Dataset | VERA Spoofing PalmVein | - | Restricted | 使用中值滤波噪声残差、局部纹理和 SVM 完成掌静脉攻击检测。 |

## 2015 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [On the Vulnerability of Palm Vein Recognition to Spoofing Attacks](https://doi.org/10.1109/ICB.2015.7139056) | ICB | 2015 | Palm Vein | NIR | Print | Texture; Image Quality | Intra-Dataset | VERA Spoofing PalmVein | - | Restricted | 早期掌静脉系统脆弱性研究，并关联公开的掌静脉攻击数据资源。 |
