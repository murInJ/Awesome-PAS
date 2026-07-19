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

assert.equal(papers.length, 11, "expected 11 unique papers");
assert.equal(datasets.length, 5, "expected 5 datasets");
assert.equal(benchmarks.length, 5, "expected 5 benchmark protocols");
assert.deepEqual(Array.from(new Set(datasets.map(item => item.year))).sort((a,b)=>b-a), [2026, 2023, 2022, 2015]);
assert.ok(benchmarks.every(item => Number.isInteger(item.year)), "every benchmark must have a year");
assert.equal(Math.max(...benchmarks.map(item => item.year)), 2026);
console.log("Data integration tests passed.");
