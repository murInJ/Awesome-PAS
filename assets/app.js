(function () {
  "use strict";

  const lang = window.AWESOME_PAS_LANG || "en";
  const t = window.AWESOME_PAS_I18N[lang];
  const config = window.AWESOME_PAS_CONFIG[lang];
  const state = { papers: [], datasets: [], filtered: [] };

  const $ = selector => document.querySelector(selector);
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const translateValue = value => lang === "zh" ? (window.AWESOME_PAS_VALUE_ZH[value] || value) : value;

  function setText(id, value) { const node = document.getElementById(id); if (node) node.textContent = value; }

  async function loadFiles(paths, kind) {
    const output = [];
    for (const path of paths) {
      const response = await fetch(path, { cache: "no-cache" });
      if (!response.ok) throw new Error(`${path}: ${response.status}`);
      const markdown = await response.text();
      output.push(...window.AwesomePASParser.parseMarkdownTables(markdown, path, kind));
    }
    return output;
  }

  function translateStaticText() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = t.title;
    Object.entries({
      "site-title": t.title, "site-subtitle": t.subtitle, "loading-message": t.loading,
      "label-papers": t.papers, "label-datasets": t.datasets, "label-code": t.code, "label-latest": t.latest,
      "filters-title": t.filters, "search-label": t.search, "trait-label": t.trait, "modality-label": t.modality,
      "attack-label": t.attack, "setting-label": t.setting, "availability-label": t.availability,
      "reset-button": t.reset, "year-chart-title": t.yearChart, "trait-chart-title": t.traitChart,
      "attack-chart-title": t.attackChart, "modality-chart-title": t.modalityChart,
      "setting-chart-title": t.settingChart, "access-chart-title": t.accessChart,
      "results-title": t.results, "markdown-note": t.markdownUpdated
    }).forEach(([id, value]) => setText(id, value));
    $("#search").placeholder = t.search;
  }

  function uniqueValues(items, field) {
    return Array.from(new Set(items.flatMap(item => item[`${field}List`] || []).filter(Boolean))).sort();
  }

  function populateSelect(id, values, label) {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="">${escapeHtml(t.all)} ${escapeHtml(label)}</option>`;
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = translateValue(value);
      select.append(option);
    });
  }

  function datasetsForPapers(papers) {
    const names = new Set(papers.flatMap(item => item.datasetList || []));
    return state.datasets.filter(item => item.dataset && names.has(item.dataset));
  }

  function renderSummary(papers) {
    setText("count-papers", papers.length);
    setText("count-datasets", datasetsForPapers(papers).length);
    setText("count-code", papers.filter(item => item.codeUrl).length);
    const latest = papers.reduce((max, item) => Math.max(max, item.year || 0), 0);
    setText("count-latest", latest || "—");
  }

  function renderCharts(papers) {
    const C = window.AwesomePASCharts;
    C.renderBars($("#chart-year"), C.countValues(papers, "year", false).sort((a,b) => Number(a[0]) - Number(b[0])), translateValue);
    C.renderBars($("#chart-trait"), C.countValues(papers, "trait"), translateValue);
    C.renderBars($("#chart-attack"), C.countValues(papers, "attack"), translateValue);
    C.renderBars($("#chart-modality"), C.countValues(papers, "modality"), translateValue);
    C.renderBars($("#chart-setting"), C.countValues(papers, "setting"), translateValue);
    C.renderBars($("#chart-access"), C.countValues(datasetsForPapers(papers), "datasetAccess", false), translateValue);
  }

  function chips(values) {
    return (values || []).map(value => `<span class="chip">${escapeHtml(translateValue(value))}</span>`).join("");
  }

  function renderTable(papers) {
    const body = $("#results-body");
    setText("results-count", papers.length);
    if (!papers.length) {
      body.innerHTML = `<tr><td colspan="9" class="empty">${escapeHtml(t.noResults)}</td></tr>`;
      return;
    }
    body.innerHTML = papers.map(item => {
      const title = item.paperUrl ? `<a href="${escapeHtml(item.paperUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>` : escapeHtml(item.title);
      const code = item.codeUrl ? `<a class="code-link" href="${escapeHtml(item.codeUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t.open)}</a>` : "—";
      return `<tr>
        <td class="paper-title">${title}<small>${escapeHtml(item.note || "")}</small></td>
        <td>${escapeHtml(item.year)}</td>
        <td>${escapeHtml(item.venue || "—")}</td>
        <td>${chips(item.traitList)}</td>
        <td>${chips(item.modalityList)}</td>
        <td>${chips(item.attackList)}</td>
        <td>${chips(item.settingList)}</td>
        <td>${chips(item.datasetList)}</td>
        <td>${code}</td>
      </tr>`;
    }).join("");
  }

  function matchesMulti(item, field, selected) {
    return !selected || (item[`${field}List`] || []).includes(selected);
  }

  function applyFilters() {
    const query = $("#search").value.trim().toLowerCase();
    const trait = $("#filter-trait").value;
    const modality = $("#filter-modality").value;
    const attack = $("#filter-attack").value;
    const setting = $("#filter-setting").value;
    const availability = $("#filter-availability").value;

    state.filtered = state.papers.filter(item => {
      const haystack = [item.title, item.venue, item.dataset, item.note, item.attack, item.setting].join(" ").toLowerCase();
      if (query && !haystack.includes(query)) return false;
      if (!matchesMulti(item, "trait", trait) || !matchesMulti(item, "modality", modality) || !matchesMulti(item, "attack", attack) || !matchesMulti(item, "setting", setting)) return false;
      if (availability === "code" && !item.codeUrl) return false;
      if (availability === "data") {
        const statuses = item.datasetAccess ? item.datasetAccess.split(";").map(v => v.trim()) : [];
        if (!statuses.some(value => value === "Public" || value === "Request")) return false;
      }
      return true;
    });
    renderSummary(state.filtered);
    renderCharts(state.filtered);
    renderTable(state.filtered);
  }

  function bindEvents() {
    ["search", "filter-trait", "filter-modality", "filter-attack", "filter-setting", "filter-availability"].forEach(id => {
      document.getElementById(id).addEventListener(id === "search" ? "input" : "change", applyFilters);
    });
    $("#reset-button").addEventListener("click", () => {
      $("#search").value = "";
      ["filter-trait", "filter-modality", "filter-attack", "filter-setting", "filter-availability"].forEach(id => { document.getElementById(id).value = ""; });
      applyFilters();
    });
  }

  async function init() {
    translateStaticText();
    try {
      const [paperRows, datasetRows] = await Promise.all([
        loadFiles(config.paperFiles, "paper"),
        loadFiles(config.datasetFiles, "dataset")
      ]);
      state.papers = window.AwesomePASParser.deduplicatePapers(paperRows);
      state.datasets = datasetRows;
      state.filtered = state.papers;
      populateSelect("filter-trait", uniqueValues(state.papers, "trait"), t.trait);
      populateSelect("filter-modality", uniqueValues(state.papers, "modality"), t.modality);
      populateSelect("filter-attack", uniqueValues(state.papers, "attack"), t.attack);
      populateSelect("filter-setting", uniqueValues(state.papers, "setting"), t.setting);
      $("#filter-availability").innerHTML = `<option value="">${escapeHtml(t.all)} ${escapeHtml(t.availability)}</option><option value="code">${escapeHtml(t.codeAvailable)}</option><option value="data">${escapeHtml(t.publicOrRequest)}</option>`;
      bindEvents();
      renderSummary(state.filtered);
      renderCharts(state.filtered);
      renderTable(state.filtered);
      $("#loading").hidden = true;
      $("#dashboard").hidden = false;
    } catch (error) {
      console.error(error);
      $("#loading-message").textContent = t.loadError;
      $("#loading").classList.add("error");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
