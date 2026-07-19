<div align="center">

# 🖐️ Awesome Palm Authentication Security

### 面向手掌认证的呈现攻击、数字注入攻击、活体检测、数据集与评测基准

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Markdown 校验](https://github.com/murInJ/Awesome-PAS/actions/workflows/validate.yml/badge.svg)](https://github.com/murInJ/Awesome-PAS/actions/workflows/validate.yml)
[![在线网站](https://img.shields.io/badge/GitHub%20Pages-在线-blue)](https://murinj.github.io/Awesome-PAS/)
[![欢迎 PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.zh-CN.md)

[在线网站](https://murinj.github.io/Awesome-PAS/index.zh.html) · [GitHub 仓库](https://github.com/murInJ/Awesome-PAS) · [English](./README.md)

</div>

---

`Awesome-PAS` 是一个人工维护、中英双语的 **Palm Authentication Security（手掌认证安全）**资源库。当前覆盖：

- **Type 1——物理呈现攻击：** 在传感器前呈现的打印、屏幕重放、裁剪、混合、三维/材料和物理对抗攻击；
- **Type 2——数字与注入攻击：** 绕过或操纵正常采集链路的合成、重建、数字对抗和数据注入攻击；
- **防御与资源：** 掌纹鉴伪、掌静脉鉴伪、手掌视频生理活体、攻击生成、数据集、标准和评测协议。

当前版本**暂不收录**系统安全、生物特征模板保护和隐私攻击。

## 浏览资源库

| 分区 | 内容 |
|:---|:---|
| [方法](https://murinj.github.io/Awesome-PAS/index.zh.html#methods) | 按年份从新到旧展示详细方法卡片，包括生物特征、模态、攻击、线索、学习设置、数据集和代码信息 |
| [数据集](https://murinj.github.io/Awesome-PAS/index.zh.html#datasets) | 按发布时间展示掌纹、掌静脉和手掌视频数据集，包括规模、攻击组成、协议和开放状态 |
| [评测基准](https://murinj.github.io/Awesome-PAS/index.zh.html#benchmarks) | 按年份展示评测协议，明确训练/测试条件、指标和阈值规则 |
| [总体统计与趋势](https://murinj.github.io/Awesome-PAS/index.zh.html#statistics) | 自动统计论文增长、模态、攻击类型、学习设置以及代码和数据开放情况 |

## Markdown 专题清单

| 专题 | 内容 |
|:---|:---|
| [物理呈现攻击检测](./Palm-Presentation-Attack-Detection.zh-CN.md) | 面向传感器级攻击的掌纹与掌静脉 PAD 方法 |
| [数字与注入攻击](./Palm-Digital-Injection-Attacks.zh-CN.md) | 合成、重建、数字对抗和注入威胁 |
| [生理活体检测](./Palm-Physiological-Liveness.zh-CN.md) | rPPG、脉搏、SpO2、时序和跨模态生理线索 |
| [攻击生成](./Palm-Attack-Generation.zh-CN.md) | 物理或数字攻击样本的构造与生成 |
| [数据集](./Datasets/README.zh-CN.md) | 直接公开、申请获取、宣布开放或不可用的数据资源 |
| [评测基准](./Benchmarks/README.zh-CN.md) | 协议定义、指标与可比较结果 |
| [综述与标准](./Surveys-and-Standards.zh-CN.md) | 综述、ISO/IEC 30107 和 FIDO 参考资料 |

## 参与贡献

请阅读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。新增条目必须遵循固定表头和规定枚举，以保证网页能够稳定解析。

## 引用

请使用 [CITATION.cff](./CITATION.cff) 中的仓库元数据，并同时引用你实际使用的原始论文和数据集。

## 许可证

仓库结构、网页代码和原创文档采用 [MIT License](./LICENSE)。外部论文、数据集和第三方仓库沿用各自许可证。
