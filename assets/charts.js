(function (global) {
  "use strict";

  function countValues(items, field, multi = true) {
    const counts = new Map();
    items.forEach(item => {
      const values = multi ? (item[`${field}List`] || []) : [item[field]];
      values.filter(Boolean).forEach(value => counts.set(value, (counts.get(value) || 0) + 1));
    });
    return Array.from(counts.entries()).sort((a, b) => (b[1] - a[1]) || String(a[0]).localeCompare(String(b[0])));
  }

  function renderBars(container, entries, translateValue) {
    container.innerHTML = "";
    if (!entries.length) return;
    const max = Math.max(...entries.map(([, value]) => value), 1);
    entries.slice(0, 12).forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      const name = document.createElement("div");
      name.className = "bar-label";
      name.textContent = translateValue(label);
      const track = document.createElement("div");
      track.className = "bar-track";
      const fill = document.createElement("div");
      fill.className = "bar-fill";
      fill.style.width = `${Math.max(4, (value / max) * 100)}%`;
      const count = document.createElement("span");
      count.className = "bar-count";
      count.textContent = value;
      track.append(fill, count);
      row.append(name, track);
      container.append(row);
    });
  }

  global.AwesomePASCharts = { countValues, renderBars };
})(window);
