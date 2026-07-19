<div align="center">

# 🖐️ Awesome Palm Authentication Security

### 面向手掌认证的呈现攻击、数字注入攻击、活体检测、数据集与评测基准

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Validate Markdown](https://github.com/OWNER/Awesome-PAS/actions/workflows/validate.yml/badge.svg)](https://github.com/OWNER/Awesome-PAS/actions/workflows/validate.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-数据看板-blue)](./index.zh.html)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.zh-CN.md)

[English](./README.md) · [简体中文](./README.zh-CN.md) · [English Dashboard](./index.html) · [中文数据看板](./index.zh.html)

</div>

---

`Awesome-PAS` 是一个人工维护、强调可复现性的 **Palm Authentication Security（手掌认证安全）**资源库。当前覆盖：

- **Type 1——物理呈现攻击：** 在传感器前呈现的打印、屏幕重放、裁剪、混合、三维/材料和物理对抗攻击；
- **Type 2——数字与注入攻击：** 绕过或操纵正常采集链路的合成、重建、数字对抗和数据注入攻击；
- **防御与资源：** 掌纹鉴伪、掌静脉鉴伪、手掌视频生理活体、攻击生成、数据集、标准和 benchmark。

当前版本**暂不收录**系统安全、生物特征模板保护和隐私攻击。

## 内容导航

| 专题 | 内容 |
|:---|:---|
| [物理呈现攻击检测](./Palm-Presentation-Attack-Detection.zh-CN.md) | 面向传感器级攻击的掌纹与掌静脉 PAD 方法 |
| [数字与注入攻击](./Palm-Digital-Injection-Attacks.zh-CN.md) | 合成、重建、数字对抗和注入威胁 |
| [生理活体检测](./Palm-Physiological-Liveness.zh-CN.md) | rPPG、脉搏、SpO2、时序和跨模态生理线索 |
| [攻击生成](./Palm-Attack-Generation.zh-CN.md) | 物理或数字攻击样本的构造与生成 |
| [数据集](./Datasets/README.zh-CN.md) | 直接公开、申请获取、宣布开放或不可用的数据资源 |
| [评测基准](./Benchmarks/README.zh-CN.md) | 协议定义、指标与可比较结果 |
| [综述与标准](./Surveys-and-Standards.zh-CN.md) | 综述、ISO/IEC 30107 和 FIDO 参考资料 |

## 数据维护方式

Markdown 是项目的**唯一事实来源**。结构化表格使用固定字段，网页通过 JavaScript 直接读取 Markdown、解析表格、去重并自动生成：

- 论文和数据集数量；
- 年份、生物特征、模态、攻击类型和学习设置分布；
- 代码与数据开放情况；
- 全文搜索与组合筛选。

JavaScript 中不重复保存论文列表或统计数字。

## 仓库初始化

在 GitHub 创建 `OWNER/Awesome-PAS` 后，用下面的命令替换徽章和引用文件中的占位符：

```bash
python scripts/configure_repo.py OWNER
```

## 本地预览

浏览器通常禁止 `file://` 页面直接执行 `fetch()`。请在仓库根目录运行：

```bash
python -m http.server 8000
```

然后访问：

- English：`http://localhost:8000/index.html`
- 中文：`http://localhost:8000/index.zh.html`

## 参与贡献

请阅读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。新增条目必须使用规定枚举和固定表头，否则网页无法稳定解析。

## 许可证

仓库结构、代码和原创文档采用 [MIT License](./LICENSE)。外部论文、数据集和第三方仓库沿用各自许可证。
