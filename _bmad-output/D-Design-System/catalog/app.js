const state = {
  data: null,
  route: window.location.pathname === "/" ? "/components" : window.location.pathname,
  tokenSort: "name",
  graphHighlight: "",
};

const views = {
  "/tokens": document.getElementById("tokensView"),
  "/components": document.getElementById("componentsView"),
  "/graph": document.getElementById("graphView"),
  "/search": document.getElementById("searchView"),
};

function assetUrl(assetPath) {
  return assetPath ? `/asset/${assetPath.replace(/\\/g, "/")}` : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function previewMarkup(token) {
  const value = token.value || "";
  if (/^#[0-9a-f]{3,8}$/i.test(value)) {
    return `<div class="preview-swatch" style="background:${escapeHtml(value)}"></div>`;
  }
  if (token.category === "layout" || token.category === "spacing") {
    const number = Number(String(value).match(/\d+/)?.[0] || 64);
    const width = Math.max(36, Math.min(number / 8, 160));
    return `<div class="preview-bar" style="width:${width}px"></div>`;
  }
  if (token.category === "typography") {
    return `<span style="font:${escapeHtml(value)}">Style AI</span>`;
  }
  return `<span class="code-text">${escapeHtml(value)}</span>`;
}

function matchesText(item, query, fields) {
  if (!query) return true;
  const text = fields.map((field) => item[field] || "").join(" ").toLowerCase();
  return text.includes(query.toLowerCase());
}

function renderMetrics() {
  const metrics = document.getElementById("metrics");
  const counts = state.data.counts;
  metrics.innerHTML = `
    <div><dt>Tokens</dt><dd>${counts.tokens}</dd></div>
    <div><dt>Components</dt><dd>${counts.components}</dd></div>
    <div><dt>Links</dt><dd>${counts.relationships}</dd></div>
  `;
}

function populateFilters() {
  const tokenCategory = document.getElementById("tokenCategory");
  const componentCategory = document.getElementById("componentCategory");
  const tokenCategories = [...new Set(state.data.tokens.map((token) => token.category))].sort();
  const componentCategories = [...new Set(state.data.components.map((component) => component.category))].sort();

  tokenCategory.innerHTML = `<option value="">All categories</option>${tokenCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  componentCategory.innerHTML = `<option value="">All categories</option>${componentCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
}

function renderTokens() {
  const query = document.getElementById("tokenSearch").value.trim();
  const category = document.getElementById("tokenCategory").value;
  const rows = document.getElementById("tokenRows");
  const tokens = state.data.tokens
    .filter((token) => !category || token.category === category)
    .filter((token) => matchesText(token, query, ["name", "value", "category", "id"]))
    .sort((a, b) => String(a[state.tokenSort]).localeCompare(String(b[state.tokenSort])));

  rows.innerHTML = tokens.length
    ? tokens.map((token) => `
      <tr>
        <td class="token-name">${escapeHtml(token.name)}</td>
        <td><span class="token-category">${escapeHtml(token.category)}</span></td>
        <td class="code-text">${escapeHtml(token.value)}</td>
        <td>${previewMarkup(token)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4"><div class="empty-state">No tokens match the current filters.</div></td></tr>`;
}

function renderComponents() {
  const query = document.getElementById("componentSearch").value.trim();
  const category = document.getElementById("componentCategory").value;
  const grid = document.getElementById("componentGrid");
  const components = state.data.components
    .filter((component) => !category || component.category === category)
    .filter((component) => {
      const joined = [
        component.name,
        component.id,
        component.category,
        component.type,
        component.purpose,
        ...component.variants.map((variant) => `${variant.name} ${variant.description}`),
        ...component.states.map((item) => `${item.name} ${item.description}`),
      ].join(" ");
      return !query || joined.toLowerCase().includes(query.toLowerCase());
    });

  grid.innerHTML = components.length
    ? components.map((component) => {
      const dependencyNames = component.dependencies.map((token) => token.name);
      return `
        <article class="component-card">
          <div class="component-preview">
            ${component.previewAsset ? `<img src="${assetUrl(component.previewAsset)}" alt="${escapeHtml(component.name)} preview">` : `<span class="code-text">${escapeHtml(component.id)}</span>`}
          </div>
          <div>
            <div class="component-meta">
              <span class="pill">${escapeHtml(component.id)}</span>
              <span class="pill">${escapeHtml(component.category)}</span>
              <span class="pill">${escapeHtml(component.type)}</span>
            </div>
            <h3>${escapeHtml(component.name)}</h3>
          </div>
          <p>${escapeHtml(component.purpose)}</p>
          <details>
            <summary>Variants (${component.variants.length})</summary>
            <ul class="details-list">
              ${component.variants.map((variant) => `<li><strong>${escapeHtml(variant.name)}</strong><span>${escapeHtml(variant.description || "Documented variant")}</span></li>`).join("") || "<li>No variants documented.</li>"}
            </ul>
          </details>
          <details>
            <summary>States (${component.states.length})</summary>
            <ul class="details-list">
              ${component.states.map((item) => `<li><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description || "Documented state")}</span></li>`).join("") || "<li>No states documented.</li>"}
            </ul>
          </details>
          <details>
            <summary>Token dependencies (${dependencyNames.length})</summary>
            <div class="pill-row">
              ${dependencyNames.map((name) => `<span class="pill">${escapeHtml(name)}</span>`).join("") || "<span class=\"pill\">None</span>"}
            </div>
          </details>
        </article>
      `;
    }).join("")
    : `<div class="empty-state">No components match the current filters.</div>`;
}

function graphNodes() {
  const componentNodes = state.data.components.map((component, index) => ({
    id: component.id,
    label: component.name,
    kind: "component",
    x: 180,
    y: 110 + index * 120,
    data: component,
  }));
  const tokenNodes = state.data.tokens.map((token, index) => ({
    id: token.id,
    label: token.name,
    kind: "token",
    x: 620,
    y: 70 + index * 72,
    data: token,
  }));
  return componentNodes.concat(tokenNodes);
}

function renderGraph() {
  const svg = document.getElementById("relationshipGraph");
  const details = document.getElementById("graphDetails");
  const nodes = graphNodes();
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const width = 860;
  const height = Math.max(520, 120 + state.data.tokens.length * 72, 180 + state.data.components.length * 120);
  const query = state.graphHighlight.toLowerCase();
  const activeIds = new Set();

  if (query) {
    nodes.forEach((node) => {
      if (`${node.id} ${node.label}`.toLowerCase().includes(query)) activeIds.add(node.id);
    });
    state.data.relationships.forEach((link) => {
      if (activeIds.has(link.componentId) || activeIds.has(link.tokenId)) {
        activeIds.add(link.componentId);
        activeIds.add(link.tokenId);
      }
    });
  }

  const links = state.data.relationships.map((link) => {
    const source = nodeMap.get(link.componentId);
    const target = nodeMap.get(link.tokenId);
    if (!source || !target) return "";
    const highlighted = !query || (activeIds.has(source.id) && activeIds.has(target.id));
    return `<line class="graph-link ${highlighted ? "highlight" : ""}" x1="${source.x + 90}" y1="${source.y}" x2="${target.x - 90}" y2="${target.y}"></line>`;
  }).join("");

  const nodeMarkup = nodes.map((node) => {
    const dim = query && !activeIds.has(node.id) ? "dim" : "";
    const isComponent = node.kind === "component";
    const shape = isComponent
      ? `<rect x="${node.x - 90}" y="${node.y - 28}" width="180" height="56" rx="8" fill="#eef6f4"></rect>`
      : `<circle cx="${node.x}" cy="${node.y}" r="28" fill="${/^#[0-9a-f]{3,8}$/i.test(node.data.value) ? escapeHtml(node.data.value) : "#f7faf9"}"></circle>`;
    return `
      <g class="graph-node ${dim}" data-node-id="${escapeHtml(node.id)}" tabindex="0" role="button" aria-label="${escapeHtml(node.label)}">
        ${shape}
        <text x="${node.x}" y="${node.y + 4}" text-anchor="middle">${escapeHtml(node.kind === "token" ? node.label.slice(0, 18) : node.id)}</text>
      </g>
    `;
  }).join("");

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `${links}${nodeMarkup}`;

  svg.querySelectorAll(".graph-node").forEach((nodeElement) => {
    nodeElement.addEventListener("click", () => {
      const nodeId = nodeElement.getAttribute("data-node-id");
      const node = nodeMap.get(nodeId);
      if (!node) return;
      state.graphHighlight = nodeId;
      document.getElementById("graphSearch").value = nodeId;
      renderGraph();
    });
  });

  const selectedNode = [...nodeMap.values()].find((node) => query && `${node.id} ${node.label}`.toLowerCase().includes(query));
  if (selectedNode) {
    const linked = state.data.relationships.filter((link) => link.componentId === selectedNode.id || link.tokenId === selectedNode.id);
    details.innerHTML = `
      <h3>${escapeHtml(selectedNode.label)}</h3>
      <p>${escapeHtml(selectedNode.kind === "component" ? selectedNode.data.purpose : `${selectedNode.data.category}: ${selectedNode.data.value}`)}</p>
      <div class="pill-row" style="margin-top:12px">
        ${linked.map((link) => `<span class="pill">${escapeHtml(link.componentId === selectedNode.id ? link.tokenName : link.componentId)}</span>`).join("") || "<span class=\"pill\">No direct links</span>"}
      </div>
    `;
  } else {
    details.innerHTML = `<h3>Relationship map</h3><p>Search or click a node to highlight dependencies between components and tokens.</p>`;
  }
}

function scoreIntent(text, query) {
  if (!query) return 1;
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = text.toLowerCase();
  return words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
}

function renderIntentSearch() {
  const query = document.getElementById("intentSearch").value.trim();
  const target = document.getElementById("intentResults");
  const tokenResults = state.data.tokens.map((token) => ({
    kind: "Token",
    title: token.name,
    subtitle: `${token.category} -> ${token.value}`,
    preview: previewMarkup(token),
    code: token.id,
    score: scoreIntent(`${token.name} ${token.category} ${token.value}`, query),
  }));
  const componentResults = state.data.components.map((component) => ({
    kind: "Component",
    title: component.name,
    subtitle: component.purpose,
    preview: component.previewAsset ? `<img src="${assetUrl(component.previewAsset)}" alt="">` : `<span>${escapeHtml(component.id)}</span>`,
    code: component.id,
    score: scoreIntent(`${component.name} ${component.category} ${component.purpose} ${component.variants.map((item) => item.name).join(" ")}`, query),
  }));

  const results = tokenResults.concat(componentResults)
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  target.innerHTML = results.length
    ? results.map((item) => `
      <article class="result-item">
        <div class="result-preview">${item.preview}</div>
        <div>
          <div class="pill-row"><span class="pill">${escapeHtml(item.kind)}</span></div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.subtitle)}</p>
        </div>
        <span class="code-text">${escapeHtml(item.code)}</span>
      </article>
    `).join("")
    : `<div class="empty-state">No intent matches yet. Try background, icon, splash, watermark, mark, color, or spark.</div>`;
}

function renderRoute() {
  Object.entries(views).forEach(([route, element]) => {
    element.classList.toggle("active", route === state.route);
  });
  document.querySelectorAll(".view-tabs a").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === state.route);
  });

  if (state.route === "/tokens") renderTokens();
  if (state.route === "/components") renderComponents();
  if (state.route === "/graph") renderGraph();
  if (state.route === "/search") renderIntentSearch();
}

async function loadData() {
  const response = await fetch("/api/design-system", { cache: "no-store" });
  state.data = await response.json();
  renderMetrics();
  populateFilters();
  renderTokens();
  renderComponents();
  renderGraph();
  renderIntentSearch();
  renderRoute();
}

document.querySelectorAll(".view-tabs a, .brand").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.getAttribute("href") === "/" ? "/components" : link.getAttribute("href");
    state.route = route;
    history.pushState({}, "", route);
    renderRoute();
  });
});

window.addEventListener("popstate", () => {
  state.route = window.location.pathname === "/" ? "/components" : window.location.pathname;
  renderRoute();
});

document.getElementById("refreshButton").addEventListener("click", loadData);
document.getElementById("tokenSearch").addEventListener("input", renderTokens);
document.getElementById("tokenCategory").addEventListener("change", renderTokens);
document.getElementById("componentSearch").addEventListener("input", renderComponents);
document.getElementById("componentCategory").addEventListener("change", renderComponents);
document.getElementById("graphSearch").addEventListener("input", (event) => {
  state.graphHighlight = event.target.value.trim();
  renderGraph();
});
document.getElementById("intentSearch").addEventListener("input", renderIntentSearch);
document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    state.tokenSort = button.dataset.sort;
    renderTokens();
  });
});

loadData().catch((error) => {
  document.body.innerHTML = `<main><div class="empty-state">Failed to load design system data: ${escapeHtml(error.message)}</div></main>`;
});
