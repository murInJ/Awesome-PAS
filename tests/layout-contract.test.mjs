import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/style.css"), "utf8");
const i18n = fs.readFileSync(path.join(root, "assets/i18n.js"), "utf8");

for (const list of ["method-list", "dataset-list", "benchmark-list"]) {
  assert.ok(app.includes(list), `app must render ${list}`);
  assert.ok(css.includes(`.${list}`), `CSS must define ${list}`);
}
assert.ok(app.includes('class="resource-row method-row"'), "methods must render as compact rows");
assert.ok(app.includes('class="resource-row dataset-row"'), "datasets must render as compact rows");
assert.ok(app.includes('class="resource-row benchmark-row"'), "benchmarks must render as compact rows");
assert.ok(app.includes('class="list-details"'), "secondary metadata must use compact inline details");
assert.ok(!app.includes('class="resource-card'), "resource cards must not be rendered");
assert.ok(!css.includes(".resource-card"), "resource card CSS must be removed");
assert.ok(css.includes(".resource-list-header"), "desktop lists must provide column headers");
assert.ok(css.includes("border-bottom: 1px solid var(--line)"), "list rows must use separators");
assert.ok(i18n.includes('taxonomy: "Taxonomy"'));
assert.ok(i18n.includes('taxonomy: "分类信息"'));

const braceBalance = [...css].reduce((balance, char) => balance + (char === "{" ? 1 : char === "}" ? -1 : 0), 0);
assert.equal(braceBalance, 0, "CSS braces must be balanced");
console.log("Compact list layout contract tests passed.");
