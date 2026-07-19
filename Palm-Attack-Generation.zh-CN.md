# 手掌攻击生成

[English](./Palm-Attack-Generation.md) · [首页](./README.zh-CN.md)

本页记录用于构造物理攻击介质，或生成可用于安全评估的数字手掌内容的方法。

## 2026 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 攻击表面 | 目标 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [CAAP: Capture-Aware Adversarial Patch Attacks on Palmprint Recognition](https://arxiv.org/abs/2604.06987) | arXiv | 2026 | Palmprint | RGB | Physical Adversarial | Physical | Recognition | [Code](https://github.com/ryliu68/CAAP) | Unclear | 面向真实拍摄过程设计、在重新成像后仍具攻击性的掌纹物理对抗贴片。 |

## 2025 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 攻击表面 | 目标 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [PVTree: Realistic and Controllable Palm Vein Generation for Recognition Tasks](https://arxiv.org/abs/2503.02547) | arXiv | 2025 | Palm Vein | NIR | Synthetic | Digital | Recognition | - | Public | 生成身份一致的掌静脉图像；当前作为生成研究资源收录，并非已验证的攻击方法。 |
| [FGFNet: Fourier Gated Feature-Fusion Network with Fractal Dimension Estimation for Robust Palm-Vein Spoof Detection](https://doi.org/10.3390/fractalfract9080478) | Fractal and Fractional | 2025 | Palm Vein | NIR | Synthetic | Digital | PAD | [Code](https://github.com/SeungguKim98/Palm-Vein-Spoof-Detection) | Restricted | 配套仓库提供该鉴伪研究使用的 CycleGAN 生成图像。 |

## 2022 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 攻击表面 | 目标 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Presentation Attacks in Palmprint Recognition Systems](https://doi.org/10.33851/JMIS.2022.9.2.103) | JMIS | 2022 | Palmprint | RGB | Print; Display Replay; Reconstruction; Digital Adversarial | Physical; Digital | Recognition | - | Unavailable | 将原始、重建和数字对抗掌纹通过纸张或显示器重新采集，构建六组呈现攻击数据。 |
