# 手掌认证安全数据集

[English](./README.md) · [首页](../README.zh-CN.md)

`Access` 只允许以下固定值：`Public`、`Request`、`Restricted`、`Announced`、`Unavailable` 或 `Unclear`。

| 数据集 | 年份 | 生物特征 | 模态 | 样本类型 | 受试者 / Palm ID | 真实样本 | 攻击样本 | 攻击类型 | 设备 / 域 | 协议 | 可用性 | 论文 / 页面 | 说明 |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| [VERA Spoofing PalmVein](https://zenodo.org/records/4580200) | 2015 | Palm Vein | NIR | Image | 50 subjects | 1000 | 1000 | Print | Open palm-vein sensor | Intra-Dataset | Restricted | [Paper](https://doi.org/10.1109/ICB.2015.7139056) | 攻击图像对应 VERA PalmVein 中的受试者。 |
| XJTU-PalmReplay | 2023 | Palmprint | RGB | Image | 400 Palm IDs | 16000 | 80000 | Display Replay | 5 display-capture domain combinations | Intra-Dataset; Cross-Device; Unknown Attack | Request | [Paper](https://doi.org/10.1109/ICIP49359.2023.10223182) | 面向域泛化评测构建的大规模掌纹屏幕重放数据集。 |
| Short Hand Video rPPG Dataset | 2023 | Palm Video | RGB; Video | Video | 35 subjects | Unclear | Unclear | Print | Multiple smartphone models | Intra-Dataset | Unavailable | [Paper](https://doi.org/10.3390/electronics12173605) | 用于 3 秒、5 秒和 7 秒 rPPG 鉴伪实验的研究数据。 |
| PVASD | 2026 | Palm Vein | NIR | Image | 5515 subjects | 880241 | 307278; 20000 AI-generated extension | Print; 3D; Synthetic | Commercial sensors; 5 resolutions | Intra-Dataset; Unknown Attack; Anomaly Detection | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) | 论文报告 1,187,519 张采集图像、16 类物理攻击和 AI 生成扩展。 |
| Six Palmprint PA Sets | 2022 | Palmprint | RGB | Image | Based on source palmprint data | Unclear | 6 derived sets | Print; Display Replay; Reconstruction; Digital Adversarial | Paper and monitor recapture | Vulnerability Evaluation | Unavailable | [Paper](https://doi.org/10.33851/JMIS.2022.9.2.103) | 将三种数字来源与两种物理介质组合得到六组数据。 |
