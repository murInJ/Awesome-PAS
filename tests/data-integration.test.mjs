import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const parserSource = fs.readFileSync(path.join(root, "assets/markdown-parser.js"), "utf8");
const context = { globalThis: {}, console };
context.global = context.globalThis;
vm.createContext(context);
vm.runInContext(parserSource, context);
const parser = context.globalThis.AwesomePASParser;

const paperFiles = [
  "Palm-Presentation-Attack-Detection.md",
  "Palm-Digital-Injection-Attacks.md",
  "Palm-Physiological-Liveness.md",
  "Palm-Attack-Generation.md"
];
const rawPapers = paperFiles.flatMap(file => parser.parseMarkdownTables(fs.readFileSync(path.join(root, file), "utf8"), file, "paper"));
const papers = parser.deduplicatePapers(rawPapers);
const datasets = parser.parseMarkdownTables(fs.readFileSync(path.join(root, "Datasets/README.md"), "utf8"), "Datasets/README.md", "dataset");
const benchmarks = parser.parseMarkdownTables(fs.readFileSync(path.join(root, "Benchmarks/README.md"), "utf8"), "Benchmarks/README.md", "benchmark").filter(item => item.benchmark);

assert.equal(papers.length, 12, "expected 12 unique papers");
assert.equal(datasets.length, 6, "expected 6 datasets");
assert.equal(benchmarks.length, 7, "expected 7 benchmark protocols");
assert.deepEqual(Array.from(new Set(datasets.map(item => item.year))).sort((a,b)=>b-a), [2026, 2023, 2022, 2015]);
assert.ok(benchmarks.every(item => Number.isInteger(item.year)), "every benchmark must have a year");
assert.equal(Math.max(...benchmarks.map(item => item.year)), 2026);
// Verify the new resource is usable through the website parser in both languages.
for (const suffix of ["", ".zh-CN"]) {
  const paperRows = parser.parseMarkdownTables(fs.readFileSync(path.join(root, `Palm-Presentation-Attack-Detection${suffix}.md`), "utf8"), "paper", "paper");
  const paper = paperRows.find(item => item.paperUrl === "https://arxiv.org/abs/2608.14389");
  assert.ok(paper, `GBU-Palm paper missing in ${suffix || "English"}`);
  assert.deepEqual(Array.from(paper.modalityList), ["RGB", "NIR", "Video"]);
  assert.equal(paper.datasetAccess, "Announced");
  assert.equal(paper.codeUrl, "");

  const datasetRows = parser.parseMarkdownTables(fs.readFileSync(path.join(root, `Datasets/README${suffix}.md`), "utf8"), "dataset", "dataset");
  const dataset = datasetRows.find(item => item.dataset === "GBU-Palm");
  assert.ok(dataset);
  assert.equal(Number(dataset.bonaFide) + Number(dataset.attacks), 21326);
  assert.equal(dataset.datasetAccess, "Announced");

  const protocolRows = parser.parseMarkdownTables(fs.readFileSync(path.join(root, `Benchmarks/README${suffix}.md`), "utf8"), "benchmark", "benchmark");
  const gbuProtocols = protocolRows.filter(item => item.dataset === "GBU-Palm");
  assert.equal(gbuProtocols.length, 2);
  assert.deepEqual(Array.from(gbuProtocols.map(item => item.benchmark)), ["GBU-Palm P1 (In-Env)", "GBU-Palm P2 (Cross-Env)"]);
  assert.ok(gbuProtocols.every(item => item.status === "Defined" && item.sourceUrl === paper.paperUrl));
  assert.ok(gbuProtocols.find(item => item.benchmark.includes("P2")).protocolList.includes("Cross-Environment"));
}
console.log("Data integration tests passed.");
