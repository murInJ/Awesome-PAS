# 手掌认证安全数据集

[English](./README.md) · [首页](../README.zh-CN.md) · [网页数据集区](../index.zh.html#datasets)

数据集按发布时间从新到旧排列。`Access` 仅使用 `Public`、`Request`、`Restricted`、`Announced`、`Unavailable` 或 `Unclear`。

## 2026 年

| 数据集 | 年份 | 生物特征 | 模态 | 样本类型 | 受试者 / Palm IDs | 真实样本 | 攻击样本 | 攻击类型 | 设备 / 域 | 协议 | 可用性 | 论文 / 页面 | 说明 |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| GBU-Palm | 2026 | Palm Video; Palm Multimodal | RGB; NIR; Video | Video | 105 subjects; 210 Palm IDs | 11108 | 10218 | Print; Display Replay | 六类光照环境; 消费级采集设备; 同步 RGB-NIR 系统 | Intra-Dataset; Cross-Subject; Cross-Environment | Announced | [Paper](https://arxiv.org/abs/2608.14389) | 共 21,326 段视频，包括 5,584 段打印攻击和 4,634 段回放攻击；15,016 段仅含 RGB，6,310 段为同步 RGB-NIR 样本。保留 16 秒原生观测、时间戳、256×256 掌纹区域及攻击来源链元数据。摘要预告数据将发布，未提供下载链接。 |
| PVASD | 2026 | Palm Vein | NIR | Image | 5515 subjects | 880241 | 307278; 20000 AI-generated extension | Print; 3D; Synthetic | Commercial sensors; 5 resolutions | Intra-Dataset; Unknown Attack; Anomaly Detection | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) | 论文报告包含 1,187,519 张采集图像、16 类物理攻击以及 AI 生成攻击扩展。 |

## 2023 年

| 数据集 | 年份 | 生物特征 | 模态 | 样本类型 | 受试者 / Palm IDs | 真实样本 | 攻击样本 | 攻击类型 | 设备 / 域 | 协议 | 可用性 | 论文 / 页面 | 说明 |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| XJTU-PalmReplay | 2023 | Palmprint | RGB | Image | 400 Palm IDs | 16000 | 80000 | Display Replay | 5 display-capture domain combinations | Intra-Dataset; Cross-Device; Unknown Attack | Request | [Paper](https://doi.org/10.1109/ICIP49359.2023.10223182) | 面向域泛化评测的大规模掌纹屏幕重放数据集。 |
| Short Hand Video rPPG Dataset | 2023 | Palm Video | RGB; Video | Video | 35 subjects | Unclear | Unclear | Print | Multiple smartphone models | Intra-Dataset | Unavailable | [Paper](https://doi.org/10.3390/electronics12173605) | 用于 3 秒、5 秒和 7 秒手掌视频 rPPG 鉴伪实验的研究数据。 |

## 2022 年

| 数据集 | 年份 | 生物特征 | 模态 | 样本类型 | 受试者 / Palm IDs | 真实样本 | 攻击样本 | 攻击类型 | 设备 / 域 | 协议 | 可用性 | 论文 / 页面 | 说明 |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| Six Palmprint PA Sets | 2022 | Palmprint | RGB | Image | Based on source palmprint data | Unclear | 6 derived sets | Print; Display Replay; Reconstruction; Digital Adversarial | Paper and monitor recapture | Vulnerability Evaluation | Unavailable | [Paper](https://doi.org/10.33851/JMIS.2022.9.2.103) | 将三类数字源图像与纸张和显示器两类载体组合为六组攻击数据。 |

## 2015 年

| 数据集 | 年份 | 生物特征 | 模态 | 样本类型 | 受试者 / Palm IDs | 真实样本 | 攻击样本 | 攻击类型 | 设备 / 域 | 协议 | 可用性 | 论文 / 页面 | 说明 |
|:---|---:|:---|:---|:---|:---|---:|---:|:---|:---|:---|:---:|:---|:---|
| [VERA Spoofing PalmVein](https://zenodo.org/records/4580200) | 2015 | Palm Vein | NIR | Image | 50 subjects | 1000 | 1000 | Print | Open palm-vein sensor | Intra-Dataset | Restricted | [Paper](https://doi.org/10.1109/ICB.2015.7139056) | 攻击图像对应 VERA PalmVein 数据集中的受试者。 |
