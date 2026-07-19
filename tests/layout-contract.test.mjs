import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/style.css"), "utf8");
const i18n = fs.readFileSync(path.join(root, "assets/i18n.js"), "utf8");

for (const grid of ["methods-grid", "datasets-grid", "benchmarks-grid"]) {
  assert.ok(app.includes(grid), `app must render ${grid}`);
  assert.ok(css.includes(`.year-content.${grid}`), `CSS must define ${grid}`);
}
assert.ok(app.includes('class="resource-more"'), "secondary metadata must use compact expandable details");
assert.ok(css.includes("grid-template-columns: repeat(3, minmax(0, 1fr))"), "desktop resource grids must use three columns");
assert.ok(css.includes("-webkit-line-clamp: 2"), "long descriptions must be clamped");
assert.ok(i18n.includes('moreDetails: "More details"'));
assert.ok(i18n.includes('moreDetails: "更多信息"'));

const braceBalance = [...css].reduce((balance, char) => balance + (char === "{" ? 1 : char === "}" ? -1 : 0), 0);
assert.equal(braceBalance, 0, "CSS braces must be balanced");
console.log("Compact layout contract tests passed.");
