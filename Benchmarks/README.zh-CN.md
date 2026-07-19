# 评测基准

[English](./README.md) · [首页](../README.zh-CN.md)

首个版本先定义可比较的结果结构和协议，不混合统计口径不一致的数值。只有明确训练/验证/测试划分、阈值规则、指标、额外数据和结果来源后，才加入数值结果。

## 协议清单

| Benchmark | 生物特征 | 数据集 | 协议 | 训练条件 | 测试条件 | 主要指标 | 阈值规则 | 状态 | 来源 |
|:---|:---|:---|:---|:---|:---|:---|:---|:---:|:---|
| XJTU-PalmReplay Closed Set | Palmprint | XJTU-PalmReplay | Intra-Dataset | 已知身份/设备划分 | 已知域中的留出样本 | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Open Set | Palmprint | XJTU-PalmReplay | Unknown Attack | 已知攻击域 | 留出的攻击域或配置 | APCER; BPCER; ACER; AUC | Paper-defined | Defined | [HFSRA](https://doi.org/10.1049/ipr2.70029) |
| XJTU-PalmReplay Cross Domain | Palmprint | XJTU-PalmReplay | Cross-Device; Domain Generalization | 多个显示—采集设备域 | 未见显示—采集设备域 | HTER; AUC; ACER | Must be reported | Defined | [ICIP 2023](https://doi.org/10.1109/ICIP49359.2023.10223182) |
| VERA PalmVein PAD | Palm Vein | VERA Spoofing PalmVein | Intra-Dataset | 建议身份不重叠划分 | 留出的真实和打印攻击样本 | APCER; BPCER; ACER; AUC | Must be reported | Needs harmonization | [Dataset](https://zenodo.org/records/4580200) |
| PVASD Benchmark | Palm Vein | PVASD | Known and Unknown Attack | 官方划分 | 物理攻击和 AI 生成攻击 | APCER; BPCER; ACER; AUC | Official protocol | Announced | [Paper](https://doi.org/10.1109/TIFS.2025.3650391) |

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
