# 评测基准

[English](./README.md) · [首页](../README.zh-CN.md) · [网页评测区](../index.zh.html#benchmarks)

评测协议按其定义来源的发表年份从新到旧排列。只有训练/验证/测试划分、阈值规则、指标、额外数据与结果来源均明确时，才加入数值结果。

## 2026 年

| Benchmark | 年份 | 生物特征 | 数据集 | 协议 | 训练条件 | 测试条件 | 主要指标 | 阈值规则 | 状态 | 来源 |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| PVASD Benchmark | 2026 | Palm Vein | PVASD | Unknown Attack; Anomaly Detection | Official split | 物理攻击和 AI 生成攻击 | APCER; BPCER; ACER; AUC | Official protocol | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) |

## 2025 年

| Benchmark | 年份 | 生物特征 | 数据集 | 协议 | 训练条件 | 测试条件 | 主要指标 | 阈值规则 | 状态 | 来源 |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Closed Set | 2025 | Palmprint | XJTU-PalmReplay | Intra-Dataset | 已知身份/设备划分 | 已知域中的留出样本 | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Open Set | 2025 | Palmprint | XJTU-PalmReplay | Unknown Attack | 已知攻击域 | 留出的攻击域或配置 | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |

## 2023 年

| Benchmark | 年份 | 生物特征 | 数据集 | 协议 | 训练条件 | 测试条件 | 主要指标 | 阈值规则 | 状态 | 来源 |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Cross Domain | 2023 | Palmprint | XJTU-PalmReplay | Cross-Device; Domain Generalization | 多个显示—采集设备域 | 未见显示—采集设备域 | HTER; AUC; ACER | Must be reported | Defined | [ICIP 2023](https://doi.org/10.1109/ICIP49359.2023.10223182) |

## 2015 年

| Benchmark | 年份 | 生物特征 | 数据集 | 协议 | 训练条件 | 测试条件 | 主要指标 | 阈值规则 | 状态 | 来源 |
|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| VERA PalmVein PAD | 2015 | Palm Vein | VERA Spoofing PalmVein | Intra-Dataset | 建议身份不重叠划分 | 留出的真实和打印攻击样本 | APCER; BPCER; ACER; AUC | Must be reported | Needs harmonization | [Dataset](https://zenodo.org/records/4580200) |

## 统一结果表

后续 benchmark 文件使用以下字段：

| Method | Venue | Train Domains | Validation Domain | Test Domain | Extra Data | APCER | BPCER | ACER | HTER | AUC | Threshold Rule | Result Source | Code |
|:---|:---|:---|:---|:---|:---|---:|---:|---:|---:|---:|:---|:---|:---:|

## 指标规则

- PAD 优先报告 ISO 风格的 `APCER`、`BPCER` 和 `ACER`；
- 条件允许时报告每种 PAI species 的 APCER，不能只用均值掩盖薄弱攻击类型；
- 计算 `HTER` 时，应在验证集上依据明确规则选择阈值，冻结后再评测测试集；
- AUC 本身与阈值无关，不能表述为“根据 AUC 直接得到阈值”；
- 原论文结果和第三方复现结果必须分开标注。
