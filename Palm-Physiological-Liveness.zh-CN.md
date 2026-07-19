# 手掌生理活体检测

[English](./Palm-Physiological-Liveness.md) · [首页](./README.zh-CN.md)

本页收录基于手掌视频、血管信号或同步多模态中的生理与时序证据进行活体检测的工作。

## 2023 年

| 论文 | 发表 venue | 年份 | 生物特征 | 模态 | 攻击 | 线索 | 设置 | 数据集 | 代码 | 数据可用性 | 说明 |
|:---|:---:|---:|:---|:---|:---|:---|:---|:---|:---:|:---:|:---|
| [Fake Biometric Detection Based on Photoplethysmography Extracted from Short Hand Videos](https://doi.org/10.3390/electronics12173605) | Electronics | 2023 | Palm Video | RGB; Video | Print | rPPG; Temporal | Intra-Dataset | Short Hand Video rPPG Dataset | - | Unavailable | 从 3 秒、5 秒和 7 秒 RGB 手掌视频中提取频域 rPPG 特征，并使用 SVM 分类。 |

## 建议继续扩展的子方向

- RGB 与 NIR 生理一致性；
- 脉搏和 SpO2 监督；
- 主动光照响应；
- 带模拟周期信号的视频重放；
- 灵活模态和模态缺失条件下的生理活体检测。
