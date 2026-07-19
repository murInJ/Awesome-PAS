(function () {
  "use strict";

  const lang = window.AWESOME_PAS_LANG || "en";
  const t = window.AWESOME_PAS_I18N[lang];
  const rootConfig = window.AWESOME_PAS_CONFIG;
  const config = rootConfig[lang];
  const state = { papers: [], datasets: [], benchmarks: [], filteredPapers: [] };

  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const translateValue = value => lang === "zh" ? (window.AWESOME_PAS_VALUE_ZH[value] || value) : value;
  const cleanValue = value => value && value !== "-" ? value : "";

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function translateStaticText() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh" ? `${t.title} · 中文` : t.title;
    $$('[data-i18n]').forEach(node => {
      const key = node.dataset.i18n;
      if (t[key] !== undefined) node.textContent = t[key];
    });
    setText("site-title", t.title);
    setText("site-subtitle", t.subtitle);
    setText("scope-note", t.scopeNote);
    setText("loading-message", t.loading);
    const search = $("#search");
    if (search) search.placeholder = t.searchPlaceholder;
  }

  async function fetchMarkdown(path) {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.text();
  }

  async function loadPapers() {
    const output = [];
    for (const collection of config.collections) {
      const markdown = await fetchMarkdown(collection.file);
      const rows = window.AwesomePASParser.parseMarkdownTables(markdown, collection.file, "paper");
      rows.forEach(row => {
        row.collectionKey = collection.key;
        row.collectionLabel = collection.shortTitle;
        row.collectionTitle = collection.title;
      });
      output.push(...rows);
    }
    return window.AwesomePASParser.deduplicatePapers(output);
  }

  async function loadFiles(paths, kind) {
    const output = [];
    for (const path of paths) {
      const markdown = await fetchMarkdown(path);
      output.push(...window.AwesomePASParser.parseMarkdownTables(markdown, path, kind));
    }
    return output;
  }

  function values(items, field) {
    return Array.from(new Set(items.flatMap(item => item[`${field}List`] || []).filter(Boolean)))
      .sort((a, b) => translateValue(a).localeCompare(translateValue(b), lang === "zh" ? "zh-CN" : "en"));
  }

  function populateSelect(id, options, label, formatter = translateValue) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = `<option value="">${escapeHtml(t.all)} · ${escapeHtml(label)}</option>`;
    options.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = formatter(value);
      select.append(option);
    });
  }

  function inlineValues(list, className = "") {
    const items = (list || []).filter(Boolean);
    if (!items.length) return "—";
    return `<span class="inline-values ${className}">${items.map(value => `<span>${escapeHtml(translateValue(value))}</span>`).join("")}</span>`;
  }

  function statusLabel(value, kind = "neutral") {
    if (!cleanValue(value)) return "—";
    const slug = String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<span class="status-label status-${kind} status-${slug}">${escapeHtml(translateValue(value))}</span>`;
  }

  function externalLink(url, label, className = "list-link") {
    return url ? `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>` : "";
  }

  function renderDetailValue(value) {
    if (typeof value === "string" && /<(?:span|a)\b/i.test(value)) return value;
    return escapeHtml(value);
  }

  function renderInlineDetails(rows) {
    const filtered = rows.filter(([, value]) => value && value !== "—");
    if (!filtered.length) return "";
    return `<details class="list-details"><summary>${escapeHtml(t.moreDetails)}</summary><dl>${filtered.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${renderDetailValue(value)}</dd></div>`).join("")}</dl></details>`;
  }

  function groupByYear(items) {
    const groups = new Map();
    items.forEach(item => {
      const year = item.year || "Unknown";
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(item);
    });
    return Array.from(groups.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }

  function renderCollectionMap() {
    const container = $("#collection-grid");
    container.innerHTML = config.collections.map(collection => {
      const count = state.papers.filter(item => (item.collectionKeys || []).includes(collection.key)).length;
      return `<button type="button" class="collection-row" data-select-collection="${escapeHtml(collection.key)}">
        <span class="collection-icon">${collection.icon}</span>
        <span class="collection-copy"><strong>${escapeHtml(collection.title)}</strong><small>${escapeHtml(collection.description)}</small></span>
        <span class="collection-count"><strong>${count}</strong><small>${escapeHtml(t.entries)}</small></span>
        <span class="collection-arrow">→</span>
      </button>`;
    }).join("");

    $$('[data-select-collection]').forEach(button => {
      button.addEventListener("click", () => {
        $("#filter-collection").value = button.dataset.selectCollection;
        applyFilters();
        document.getElementById("methods").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function methodRow(item) {
    const collections = (item.collectionLabels || [item.collectionLabel]).filter(Boolean);
    const title = item.paperUrl
      ? `<a href="${escapeHtml(item.paperUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`
      : escapeHtml(item.title);
    const sourceFiles = item.collections || [item.sourceFile];
    const sourceLinks = sourceFiles.map(file => `<a href="${escapeHtml(file)}">${escapeHtml(t.sourceMarkdown)}</a>`).join(" · ");
    const details = [
      [t.cue, inlineValues(item.cueList)],
      [t.datasetsLabel, inlineValues(item.datasetList, "dataset-values")],
      [t.target, inlineValues(item.targetList)],
      [t.attackSurface, inlineValues(item.attackSurfaceList)],
      [t.collection, collections.map(escapeHtml).join(" · ")]
    ];
    return `<article class="resource-row method-row">
      <div class="row-venue"><strong>${escapeHtml(item.venue || "—")}</strong><small>${escapeHtml(collections.join(" · "))}</small></div>
      <div class="row-primary"><h3>${title}</h3>${item.note ? `<p title="${escapeHtml(item.note)}">${escapeHtml(item.note)}</p>` : ""}${renderInlineDetails(details)}</div>
      <div class="row-taxonomy">
        <div><b>${escapeHtml(t.trait)}</b>${inlineValues(item.traitList)}</div>
        <div><b>${escapeHtml(t.modality)}</b>${inlineValues(item.modalityList)}</div>
        <div><b>${escapeHtml(t.attack)}</b>${inlineValues(item.attackList, "attack-values")}</div>
        <div><b>${escapeHtml(t.setting)}</b>${inlineValues(item.settingList, "setting-values")}</div>
      </div>
      <div class="row-links">${externalLink(item.paperUrl, t.paper)}${externalLink(item.codeUrl, t.codeAvailable, "list-link code-link")}<span class="markdown-links">${sourceLinks}</span></div>
    </article>`;
  }

  function listHeader(kind) {
    if (kind === "method") {
      return `<div class="resource-list-header method-list-header"><span>${escapeHtml(t.venue)}</span><span>${escapeHtml(t.paper)}</span><span>${escapeHtml(t.taxonomy)}</span><span>${escapeHtml(t.resources)}</span></div>`;
    }
    if (kind === "dataset") {
      return `<div class="resource-list-header dataset-list-header"><span>${escapeHtml(t.dataset)}</span><span>${escapeHtml(t.trait)} / ${escapeHtml(t.modality)}</span><span>${escapeHtml(t.scale)}</span><span>${escapeHtml(t.attack)}</span><span>${escapeHtml(t.access)}</span></div>`;
    }
    return `<div class="resource-list-header benchmark-list-header"><span>${escapeHtml(t.benchmarks)}</span><span>${escapeHtml(t.dataset)} / ${escapeHtml(t.protocol)}</span><span>${escapeHtml(t.conditions)}</span><span>${escapeHtml(t.metrics)}</span><span>${escapeHtml(t.status)}</span></div>`;
  }

  function renderMethods(items) {
    const timeline = $("#methods-timeline");
    const empty = $("#methods-empty");
    setText("method-result-count", items.length);
    if (!items.length) {
      timeline.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    timeline.innerHTML = groupByYear(items).map(([year, rows]) => `<section class="year-group">
      <div class="year-marker"><span>${escapeHtml(year)}</span><small>${rows.length} ${escapeHtml(t.entries)}</small></div>
      <div class="year-content"><div class="resource-list method-list">${listHeader("method")}${rows.map(methodRow).join("")}</div></div>
    </section>`).join("");
  }

  function datasetRow(item) {
    const name = item.datasetUrl
      ? `<a href="${escapeHtml(item.datasetUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.dataset)}</a>`
      : escapeHtml(item.dataset || "");
    const scale = [cleanValue(item.subjects), cleanValue(item.bonaFide), cleanValue(item.attacks)].filter(Boolean).join(" · ") || "—";
    const details = [
      [t.sampleType, cleanValue(item.sampleType)],
      [t.subjects, cleanValue(item.subjects)],
      [t.bonaFide, cleanValue(item.bonaFide)],
      [t.attackSamples, cleanValue(item.attacks)],
      [t.devices, cleanValue(item.devices)],
      [t.protocol, inlineValues(item.protocolList, "setting-values")],
      [t.note || "Note", cleanValue(item.note)]
    ];
    return `<article class="resource-row dataset-row">
      <div class="dataset-name"><h3>${name}</h3>${renderInlineDetails(details)}</div>
      <div class="dataset-trait"><div>${inlineValues(item.traitList)}</div><div>${inlineValues(item.modalityList)}</div></div>
      <div class="dataset-scale">${escapeHtml(scale)}</div>
      <div class="dataset-attacks">${inlineValues(item.attackList, "attack-values")}</div>
      <div class="dataset-access">${statusLabel(item.datasetAccess, "access")}<span class="row-links">${externalLink(item.datasetUrl, t.dataset)}${externalLink(item.paperUrl, t.paper)}<a class="markdown-links" href="${escapeHtml(item.sourceFile)}">${escapeHtml(t.sourceMarkdown)}</a></span></div>
    </article>`;
  }

  function renderDatasets(items) {
    const container = $("#datasets-timeline");
    if (!items.length) { container.innerHTML = `<div class="empty-state">${escapeHtml(t.noData)}</div>`; return; }
    container.innerHTML = groupByYear(items).map(([year, rows]) => `<section class="year-group">
      <div class="year-marker"><span>${escapeHtml(year)}</span><small>${rows.length} ${escapeHtml(t.entries)}</small></div>
      <div class="year-content"><div class="resource-list dataset-list">${listHeader("dataset")}${rows.map(datasetRow).join("")}</div></div>
    </section>`).join("");
  }

  function benchmarkRow(item) {
    const details = [
      [t.trait, inlineValues(item.traitList)],
      [t.trainCondition, cleanValue(item.trainCondition)],
      [t.testCondition, cleanValue(item.testCondition)],
      [t.thresholdRule, cleanValue(item.thresholdRule)]
    ];
    const conditions = [cleanValue(item.trainCondition), cleanValue(item.testCondition)].filter(Boolean).join(" → ") || "—";
    return `<article class="resource-row benchmark-row">
      <div class="benchmark-name"><h3>${escapeHtml(item.benchmark || "")}</h3>${renderInlineDetails(details)}</div>
      <div class="benchmark-scope"><div>${inlineValues(item.datasetList, "dataset-values")}</div><div>${inlineValues(item.protocolList, "setting-values")}</div></div>
      <div class="benchmark-conditions">${escapeHtml(conditions)}</div>
      <div class="benchmark-metrics">${inlineValues(item.metricsList)}</div>
      <div class="benchmark-status">${statusLabel(item.status, "status")}<span class="row-links">${item.sourceUrl ? externalLink(item.sourceUrl, item.sourceLabel || t.source) : ""}<a class="markdown-links" href="${escapeHtml(item.sourceFile)}">${escapeHtml(t.sourceMarkdown)}</a></span></div>
    </article>`;
  }

  function renderBenchmarks(items) {
    const container = $("#benchmarks-timeline");
    if (!items.length) { container.innerHTML = `<div class="empty-state">${escapeHtml(t.noData)}</div>`; return; }
    container.innerHTML = groupByYear(items).map(([year, rows]) => `<section class="year-group">
      <div class="year-marker"><span>${escapeHtml(year)}</span><small>${rows.length} ${escapeHtml(t.entries)}</small></div>
      <div class="year-content"><div class="resource-list benchmark-list">${listHeader("benchmark")}${rows.map(benchmarkRow).join("")}</div></div>
    </section>`).join("");
  }

  function renderCounters() {
    const latest = state.papers.reduce((max, item) => Math.max(max, item.year || 0), 0);
    const accessible = state.datasets.filter(item => ["Public", "Request"].includes(item.datasetAccess)).length;
    ["hero-paper-count", "count-papers"].forEach(id => setText(id, state.papers.length));
    ["hero-dataset-count", "count-datasets"].forEach(id => setText(id, state.datasets.length));
    setText("hero-benchmark-count", state.benchmarks.length);
    setText("hero-latest-year", latest || "—");
    setText("count-code", state.papers.filter(item => item.codeUrl).length);
    setText("count-public-data", accessible);
  }

  function renderCharts() {
    const C = window.AwesomePASCharts;
    C.renderBars($("#chart-year"), C.countValues(state.papers, "year", false).sort((a, b) => Number(a[0]) - Number(b[0])), translateValue);
    C.renderBars($("#chart-trait"), C.countValues(state.papers, "trait"), translateValue);
    C.renderBars($("#chart-modality"), C.countValues(state.papers, "modality"), translateValue);
    C.renderBars($("#chart-attack"), C.countValues(state.papers, "attack"), translateValue);
    C.renderBars($("#chart-setting"), C.countValues(state.papers, "setting"), translateValue);
    C.renderBars($("#chart-access"), C.countValues(state.datasets, "datasetAccess", false), translateValue);
  }

  function matches(item, field, selected) {
    return !selected || (item[`${field}List`] || []).includes(selected);
  }

  function applyFilters() {
    const query = $("#search").value.trim().toLowerCase();
    const collection = $("#filter-collection").value;
    const trait = $("#filter-trait").value;
    const modality = $("#filter-modality").value;
    const attack = $("#filter-attack").value;
    const setting = $("#filter-setting").value;

    state.filteredPapers = state.papers.filter(item => {
      const haystack = [item.title, item.venue, item.note, item.dataset, item.trait, item.modality, item.attack, item.setting, ...(item.collectionLabels || [])].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (!collection || (item.collectionKeys || []).includes(collection))
        && matches(item, "trait", trait)
        && matches(item, "modality", modality)
        && matches(item, "attack", attack)
        && matches(item, "setting", setting);
    });
    renderMethods(state.filteredPapers);
  }

  function configureFilters() {
    populateSelect("filter-collection", config.collections.map(item => item.key), t.collection, key => config.collections.find(item => item.key === key)?.shortTitle || key);
    populateSelect("filter-trait", values(state.papers, "trait"), t.trait);
    populateSelect("filter-modality", values(state.papers, "modality"), t.modality);
    populateSelect("filter-attack", values(state.papers, "attack"), t.attack);
    populateSelect("filter-setting", values(state.papers, "setting"), t.setting);
    ["search", "filter-collection", "filter-trait", "filter-modality", "filter-attack", "filter-setting"].forEach(id => {
      document.getElementById(id).addEventListener(id === "search" ? "input" : "change", applyFilters);
    });
    $("#reset-button").addEventListener("click", () => {
      $("#search").value = "";
      ["filter-collection", "filter-trait", "filter-modality", "filter-attack", "filter-setting"].forEach(id => { document.getElementById(id).value = ""; });
      applyFilters();
    });
  }

  async function init() {
    translateStaticText();
    try {
      const [papers, datasets, benchmarks] = await Promise.all([
        loadPapers(),
        loadFiles(config.datasetFiles, "dataset"),
        loadFiles(config.benchmarkFiles, "benchmark")
      ]);
      state.papers = papers;
      state.datasets = datasets.sort((a, b) => (b.year || 0) - (a.year || 0));
      state.benchmarks = benchmarks.filter(item => item.benchmark).sort((a, b) => (b.year || 0) - (a.year || 0));
      state.filteredPapers = papers;

      renderCollectionMap();
      configureFilters();
      renderMethods(state.filteredPapers);
      renderDatasets(state.datasets);
      renderBenchmarks(state.benchmarks);
      renderCounters();
      renderCharts();

      $("#loading").hidden = true;
      $("#dashboard").hidden = false;
    } catch (error) {
      console.error(error);
      $("#loading").classList.add("error");
      setText("loading-message", `${t.loadError} ${error.message}`);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
