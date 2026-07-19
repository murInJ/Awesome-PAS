import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const source = fs.readFileSync(new URL("../assets/markdown-parser.js", import.meta.url), "utf8");
const context = { globalThis: {}, console };
context.global = context.globalThis;
vm.createContext(context);
vm.runInContext(source, context);
const parser = context.globalThis.AwesomePASParser;
assert.ok(parser, "parser must be exported");

const markdown = `
## Year 2026
| Title | Venue | Year | Trait | Modality | Attack | Setting | Dataset | Code | Dataset Access | Note |
|:---|:---|---:|:---|:---|:---|:---|:---|:---|:---|:---|
| [Paper A](https://example.com/a) | TEST | 2026 | Palmprint | RGB; NIR | Print; Hybrid | Domain Generalization | Demo | [Code](https://example.com/code) | Public | Demo row |
`;
const rows = parser.parseMarkdownTables(markdown, "demo.md", "paper");
assert.equal(rows.length, 1);
assert.equal(rows[0].title, "Paper A");
assert.deepEqual(Array.from(rows[0].modalityList), ["RGB", "NIR"]);
assert.equal(rows[0].codeUrl, "https://example.com/code");

const merged = parser.deduplicatePapers([...rows, { ...rows[0], attackList: ["Synthetic"], attack: "Synthetic", sourceFile: "other.md" }]);
assert.equal(merged.length, 1);
assert.ok(Array.from(merged[0].attackList).includes("Print"));
assert.ok(Array.from(merged[0].attackList).includes("Synthetic"));
console.log("Parser tests passed.");
