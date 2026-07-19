(function (global) {
  "use strict";

  const HEADER_ALIASES = {
    title: "title", paper: "title", "论文": "title", "标题": "title",
    venue: "venue", "发表venue": "venue", "机构/venue": "venue",
    year: "year", "年份": "year",
    trait: "trait", "生物特征": "trait",
    modality: "modality", "模态": "modality",
    attack: "attack", "攻击": "attack",
    cue: "cue", "线索": "cue",
    setting: "setting", "设置": "setting",
    dataset: "dataset", "数据集": "dataset",
    code: "code", "代码": "code",
    "datasetaccess": "datasetAccess", access: "datasetAccess", "数据可用性": "datasetAccess", "可用性": "datasetAccess",
    note: "note", "说明": "note",
    target: "target", "目标": "target",
    "attacksurface": "attackSurface", "攻击表面": "attackSurface",
    "sampletype": "sampleType", "样本类型": "sampleType",
    "subjects/palmids": "subjects", "受试者/palmid": "subjects", "受试者/palmids": "subjects",
    "bonafide": "bonaFide", "真实样本": "bonaFide",
    attacks: "attacks", "攻击样本": "attacks",
    "attacktypes": "attack", "攻击类型": "attack",
    "devices/domains": "devices", "设备/域": "devices",
    protocol: "protocol", "协议": "protocol",
    "paper/page": "paper", "论文/页面": "paper",
    benchmark: "benchmark",
    "traincondition": "trainCondition", "训练条件": "trainCondition",
    "testcondition": "testCondition", "测试条件": "testCondition",
    "primarymetrics": "metrics", "主要指标": "metrics",
    "thresholdrule": "thresholdRule", "阈值规则": "thresholdRule",
    status: "status", "状态": "status",
    source: "source", "来源": "source"
  };

  function normalizeHeader(value) {
    return value
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[\s_`*]/g, "")
      .replace(/[：:]/g, "")
      .trim();
  }

  function splitRow(line) {
    const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    const cells = [];
    let current = "";
    let escaped = false;
    let parenDepth = 0;
    for (const char of trimmed) {
      if (escaped) {
        current += char;
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        current += char;
        continue;
      }
      if (char === "(") parenDepth += 1;
      if (char === ")" && parenDepth > 0) parenDepth -= 1;
      if (char === "|" && parenDepth === 0) {
        cells.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    cells.push(current.trim());
    return cells;
  }

  function isSeparator(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  }

  function extractLink(value) {
    const match = value.match(/\[([^\]]+)]\(([^)]+)\)/);
    return match ? { text: match[1].trim(), url: match[2].trim() } : { text: value.replace(/[`*_]/g, "").trim(), url: "" };
  }

  function splitMulti(value) {
    if (!value || value === "-") return [];
    return value.split(";").map(v => v.trim()).filter(Boolean);
  }

  function canonicalizeRow(headers, cells, meta) {
    const item = { sourceFile: meta.sourceFile, section: meta.section, kind: meta.kind };
    headers.forEach((rawHeader, index) => {
      const normalized = normalizeHeader(rawHeader);
      const key = HEADER_ALIASES[normalized] || normalized;
      item[key] = (cells[index] || "").trim();
    });

    if (item.title) {
      const link = extractLink(item.title);
      item.title = link.text;
      item.paperUrl = link.url;
    }
    if (item.dataset && meta.kind === "dataset") {
      const link = extractLink(item.dataset);
      item.dataset = link.text;
      item.datasetUrl = link.url;
    }
    if (item.code) {
      const link = extractLink(item.code);
      item.codeUrl = link.url;
      item.code = link.text === "-" ? "" : link.text;
    }
    if (item.paper) {
      const link = extractLink(item.paper);
      item.paperLabel = link.text;
      item.paperUrl = item.paperUrl || link.url;
    }
    if (item.source) {
      const link = extractLink(item.source);
      item.sourceLabel = link.text;
      item.sourceUrl = link.url;
    }
    if (item.year) {
      const parsed = Number.parseInt(item.year, 10);
      item.year = Number.isFinite(parsed) ? parsed : null;
    }

    ["trait", "modality", "attack", "cue", "setting", "dataset", "target", "attackSurface", "protocol", "metrics"].forEach(key => {
      if (item[key] !== undefined) item[`${key}List`] = splitMulti(item[key]);
    });
    return item;
  }

  function parseMarkdownTables(markdown, sourceFile, kind) {
    const lines = markdown.replace(/```[\s\S]*?```/g, "").split(/\r?\n/);
    const rows = [];
    let section = "";
    for (let i = 0; i < lines.length; i += 1) {
      const heading = lines[i].match(/^#{1,4}\s+(.+)$/);
      if (heading) section = heading[1].trim();
      if (!lines[i].trim().startsWith("|") || i + 1 >= lines.length || !isSeparator(lines[i + 1])) continue;

      const headers = splitRow(lines[i]);
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = splitRow(lines[i]);
        if (cells.some(cell => cell.trim() !== "")) {
          rows.push(canonicalizeRow(headers, cells, { sourceFile, section, kind }));
        }
        i += 1;
      }
      i -= 1;
    }
    return rows;
  }

  function mergeArrays(a = [], b = []) {
    return Array.from(new Set([...a, ...b]));
  }

  function deduplicatePapers(items) {
    const map = new Map();
    items.filter(item => item.title && item.year).forEach(item => {
      const key = `${item.title.toLowerCase()}::${item.year}`;
      if (!map.has(key)) {
        map.set(key, { ...item, collections: [item.sourceFile] });
        return;
      }
      const current = map.get(key);
      ["trait", "modality", "attack", "cue", "setting", "dataset", "target", "attackSurface"].forEach(field => {
        current[`${field}List`] = mergeArrays(current[`${field}List`], item[`${field}List`]);
        current[field] = current[`${field}List`].join("; ");
      });
      current.collections = mergeArrays(current.collections, [item.sourceFile]);
      current.codeUrl = current.codeUrl || item.codeUrl;
      current.paperUrl = current.paperUrl || item.paperUrl;
      current.note = current.note || item.note;
    });
    return Array.from(map.values()).sort((a, b) => (b.year - a.year) || a.title.localeCompare(b.title));
  }

  const api = { parseMarkdownTables, deduplicatePapers, splitMulti, extractLink, normalizeHeader };
  global.AwesomePASParser = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
