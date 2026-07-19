# 为 Awesome-PAS 贡献内容

[English](./CONTRIBUTING.md)

## 核心规则

Markdown 是唯一事实来源。不要在 JavaScript 中硬编码论文数量、数据集数量或图表数据。

## 新增条目前

1. 确认工作直接涉及掌纹、掌静脉、手掌视频或多模态手掌认证安全；
2. 判断其属于物理呈现攻击、数字/注入攻击、生理活体、攻击生成、数据集、benchmark 或综述/标准；
3. 优先使用 DOI、出版社页面、官方代码仓库和官方数据页面；
4. 核实年份、venue、代码状态和数据可用性；
5. 同时修改中英文 Markdown。论文标题保持原文，说明字段进行翻译。

## 固定枚举

多值字段必须使用英文分号 `;`，不能用逗号、斜杠或 `+` 分隔。

### Trait

`Palmprint`、`Palm Vein`、`Palm Video`、`Palm Multimodal`

### Modality

`RGB`、`NIR`、`Depth`、`Thermal`、`Multispectral`、`Hyperspectral`、`Video`、`PPG`、`SpO2`、`Pulse`

### Attack

`Print`、`Display Replay`、`Replay`、`Cutout`、`Hybrid`、`3D`、`Artificial Palmprint`、`Artificial Palm Vein`、`Physical Adversarial`、`Digital Injection`、`Synthetic`、`Reconstruction`、`Digital Adversarial`、`Cross-Modal Injection`

### Cue

`Texture`、`Frequency`、`Image Quality`、`Noise`、`Reflectance`、`Geometry`、`Depth`、`Spectral`、`Vascular`、`Temporal`、`rPPG`、`Pulse`、`SpO2`、`Cross-Modal Consistency`、`Active Illumination`、`Foundation Model`

### Setting

`Intra-Dataset`、`Cross-Subject`、`Cross-Device`、`Cross-Environment`、`Cross-Attack`、`Cross-Dataset`、`Domain Generalization`、`Domain Adaptation`、`Test-Time Adaptation`、`One-Class`、`Anomaly Detection`、`Missing Modality`、`Unknown Attack`

### 数据可用性

`Public`、`Request`、`Restricted`、`Announced`、`Unavailable`、`Unclear`

## 论文表必填列

```text
Title | Venue | Year | Trait | Modality | Attack | Cue/Target | Setting | Dataset | Code | Dataset Access | Note
```

攻击生成表可以使用 `Attack Surface` 和 `Target` 替代 `Cue` 与 `Setting`。

## 本地校验

```bash
python scripts/validate_markdown.py
node tests/parser.test.mjs
```

任一命令失败时，不应合并 Pull Request。
