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

  function chips(list, className = "") {
    return (list || []).filter(Boolean).map(value => `<span class="chip ${className}">${escapeHtml(translateValue(value))}</span>`).join("");
  }

  function badge(value, kind = "neutral") {
    if (!cleanValue(value)) return "";
    const slug = String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<span class="badge badge-${kind} badge-${slug}">${escapeHtml(translateValue(value))}</span>`;
  }

  function externalLink(url, label, className = "text-link") {
    return url ? `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>` : "";
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
      return `<article class="collection-card" data-collection-card="${escapeHtml(collection.key)}">
        <div class="collection-icon">${collection.icon}</div>
        <div class="collection-content">
          <h3>${escapeHtml(collection.title)}</h3>
          <p>${escapeHtml(collection.description)}</p>
          <div class="collection-footer"><span><strong>${count}</strong> ${escapeHtml(t.entries)}</span><button type="button" data-select-collection="${escapeHtml(collection.key)}">${escapeHtml(t.viewCollection)} →</button></div>
        </div>
      </article>`;
    }).join("");

    $$('[data-select-collection]').forEach(button => {
      button.addEventListener("click", () => {
        $("#filter-collection").value = button.dataset.selectCollection;
        applyFilters();
        document.getElementById("methods").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function methodCard(item) {
    const collections = (item.collectionLabels || [item.collectionLabel]).filter(Boolean);
    const title = item.paperUrl
      ? `<a href="${escapeHtml(item.paperUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`
      : escapeHtml(item.title);
    const detailRows = [];
    if (item.traitList?.length) detailRows.push([t.trait, chips(item.traitList)]);
    if (item.modalityList?.length) detailRows.push([t.modality, chips(item.modalityList)]);
    if (item.attackList?.length) detailRows.push([t.attack, chips(item.attackList, "attack-chip")]);
    if (item.cueList?.length) detailRows.push([t.cue, chips(item.cueList)]);
    if (item.settingList?.length) detailRows.push([t.setting, chips(item.settingList, "setting-chip")]);
    if (item.datasetList?.length) detailRows.push([t.datasetsLabel, chips(item.datasetList, "dataset-chip")]);
    if (item.targetList?.length) detailRows.push([t.target, chips(item.targetList)]);
    if (item.attackSurfaceList?.length) detailRows.push([t.attackSurface, chips(item.attackSurfaceList)]);

    const sourceFiles = item.collections || [item.sourceFile];
    const sourceLinks = sourceFiles.map(file => `<a href="${escapeHtml(file)}">${escapeHtml(t.sourceMarkdown)}</a>`).join(" · ");
    return `<article class="resource-card method-card">
      <div class="resource-topline">
        <div class="collection-badges">${collections.map(value => `<span>${escapeHtml(value)}</span>`).join("")}</div>
        <div class="publication-meta"><strong>${escapeHtml(item.venue || "—")}</strong><span>${escapeHtml(item.year || "")}</span></div>
      </div>
      <h3 class="resource-title">${title}</h3>
      ${item.note ? `<p class="resource-note">${escapeHtml(item.note)}</p>` : ""}
      <dl class="detail-list">${detailRows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`).join("")}</dl>
      <div class="resource-actions">
        ${externalLink(item.paperUrl, t.paper, "action-link")}
        ${externalLink(item.codeUrl, t.codeAvailable, "action-link code-action")}
        <span class="source-links">${sourceLinks}</span>
      </div>
    </article>`;
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
      <div class="year-content">${rows.map(methodCard).join("")}</div>
    </section>`).join("");
  }

  function datasetCard(item) {
    const name = item.datasetUrl
      ? `<a href="${escapeHtml(item.datasetUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.dataset)}</a>`
      : escapeHtml(item.dataset || "");
    const details = [
      [t.trait, chips(item.traitList)],
      [t.modality, chips(item.modalityList)],
      [t.sampleType, cleanValue(item.sampleType)],
      [t.subjects, cleanValue(item.subjects)],
      [t.bonaFide, cleanValue(item.bonaFide)],
      [t.attackSamples, cleanValue(item.attacks)],
      [t.attack, chips(item.attackList, "attack-chip")],
      [t.devices, cleanValue(item.devices)],
      [t.protocol, chips(item.protocolList, "setting-chip")]
    ].filter(([, value]) => value);
    return `<article class="resource-card dataset-card">
      <div class="resource-topline"><div>${badge(item.datasetAccess, "access")}</div><div class="publication-meta"><span>${escapeHtml(item.year || "")}</span></div></div>
      <h3 class="resource-title">${name}</h3>
      ${item.note ? `<p class="resource-note">${escapeHtml(item.note)}</p>` : ""}
      <dl class="detail-list dataset-details">${details.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${typeof value === "string" && value.includes("<span") ? value : escapeHtml(value)}</dd></div>`).join("")}</dl>
      <div class="resource-actions">
        ${externalLink(item.datasetUrl, t.dataset, "action-link")}
        ${externalLink(item.paperUrl, t.paper, "action-link")}
        <a class="source-links" href="${escapeHtml(item.sourceFile)}">${escapeHtml(t.sourceMarkdown)}</a>
      </div>
    </article>`;
  }

  function renderDatasets(items) {
    const container = $("#datasets-timeline");
    if (!items.length) { container.innerHTML = `<div class="empty-state">${escapeHtml(t.noData)}</div>`; return; }
    container.innerHTML = groupByYear(items).map(([year, rows]) => `<section class="year-group">
      <div class="year-marker"><span>${escapeHtml(year)}</span><small>${rows.length} ${escapeHtml(t.entries)}</small></div>
      <div class="year-content two-column">${rows.map(datasetCard).join("")}</div>
    </section>`).join("");
  }

  function benchmarkCard(item) {
    const source = item.sourceUrl ? externalLink(item.sourceUrl, item.sourceLabel || t.source, "action-link") : "";
    const details = [
      [t.trait, chips(item.traitList)],
      [t.dataset, chips(item.datasetList, "dataset-chip")],
      [t.protocol, chips(item.protocolList, "setting-chip")],
      [t.trainCondition, cleanValue(item.trainCondition)],
      [t.testCondition, cleanValue(item.testCondition)],
      [t.metrics, chips(item.metricsList)],
      [t.thresholdRule, cleanValue(item.thresholdRule)]
    ].filter(([, value]) => value);
    return `<article class="resource-card benchmark-card">
      <div class="resource-topline"><div>${badge(item.status, "status")}</div><div class="publication-meta"><span>${escapeHtml(item.year || "")}</span></div></div>
      <h3 class="resource-title">${escapeHtml(item.benchmark || "")}</h3>
      <dl class="detail-list benchmark-details">${details.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${typeof value === "string" && value.includes("<span") ? value : escapeHtml(value)}</dd></div>`).join("")}</dl>
      <div class="resource-actions">${source}<a class="source-links" href="${escapeHtml(item.sourceFile)}">${escapeHtml(t.sourceMarkdown)}</a></div>
    </article>`;
  }

  function renderBenchmarks(items) {
    const container = $("#benchmarks-timeline");
    if (!items.length) { container.innerHTML = `<div class="empty-state">${escapeHtml(t.noData)}</div>`; return; }
    container.innerHTML = groupByYear(items).map(([year, rows]) => `<section class="year-group">
      <div class="year-marker"><span>${escapeHtml(year)}</span><small>${rows.length} ${escapeHtml(t.entries)}</small></div>
      <div class="year-content two-column">${rows.map(benchmarkCard).join("")}</div>
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
