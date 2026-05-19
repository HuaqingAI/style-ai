const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const catalogDir = __dirname;
const designSystemDir = path.resolve(catalogDir, "..");
const repoRoot = path.resolve(designSystemDir, "..", "..");
const defaultPort = Number(process.env.PORT || 17863);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function readText(filePath, fallback = "") {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return fallback;
  }
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripMarkdown(value) {
  return String(value)
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();
}

function previousHeading(markdown, index) {
  const before = markdown.slice(0, index).split(/\r?\n/).reverse();
  const heading = before.find((line) => /^#{2,4}\s+/.test(line));
  return heading ? stripMarkdown(heading.replace(/^#+\s+/, "")) : "General";
}

function parseYamlSubset(block, defaultCategory) {
  const tokens = [];
  const stack = [];
  const knownCategories = new Set(["colors", "color", "layout", "effects", "effect", "spacing", "typography"]);

  block.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.replace(/\t/g, "  ");
    if (!line.trim() || line.trim().startsWith("#")) return;

    const match = line.match(/^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) return;

    const indent = Math.floor(match[1].length / 2);
    const key = match[2];
    const rawValue = match[3].trim();
    stack.length = indent;

    if (!rawValue) {
      stack[indent] = key;
      return;
    }

    const value = rawValue.replace(/^["']|["']$/g, "");
    const pathParts = stack.slice(0, indent).concat(key).filter(Boolean);
    const first = pathParts[0] ? pathParts[0].toLowerCase() : "";
    const category = knownCategories.has(first)
      ? first.replace(/^color$/, "colors").replace(/^effect$/, "effects")
      : defaultCategory.toLowerCase();
    const name = knownCategories.has(first) ? pathParts.slice(1).join(".") : pathParts.join(".");

    if (name) {
      tokens.push({
        id: `${category}.${name}`,
        name,
        category,
        value,
        source: "design-tokens.md",
      });
    }
  });

  return tokens;
}

function parseTokens(markdown) {
  const tokens = [];
  const seen = new Set();
  const blockRegex = /```(?:yaml|json)?\s*([\s\S]*?)```/g;
  let match;

  while ((match = blockRegex.exec(markdown))) {
    const heading = previousHeading(markdown, match.index);
    const defaultCategory = heading.toLowerCase().includes("color")
      ? "colors"
      : heading.toLowerCase().includes("layout")
        ? "layout"
        : heading.toLowerCase().includes("effect")
          ? "effects"
          : heading.toLowerCase().includes("spacing")
            ? "spacing"
            : heading.toLowerCase().includes("typography")
              ? "typography"
              : "tokens";

    parseYamlSubset(match[1], defaultCategory).forEach((token) => {
      const dedupeKey = `${token.category}|${token.name}|${token.value}`;
      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey);
        tokens.push(token);
      }
    });
  }

  return tokens;
}

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const startRe = new RegExp(`^(#{2,3})\\s+${escaped}\\s*$`, "m");
  const match = startRe.exec(markdown);
  if (!match) return "";

  const level = match[1].length;
  const contentStart = match.index + match[0].length;
  const rest = markdown.slice(contentStart);
  const endRe = level === 2 ? /^##\s+/m : /^#{2,3}\s+/m;
  const endMatch = endRe.exec(rest);
  const content = endMatch ? rest.slice(0, endMatch.index) : rest;
  return content.trim();
}

function parseListItems(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*-\s+(.*)$/))
    .filter(Boolean)
    .map((match) => {
      const item = stripMarkdown(match[1]);
      const split = item.split(/\s+-\s+/);
      return {
        name: split[0].trim(),
        description: split.slice(1).join(" - ").trim(),
      };
    });
}

function extractAssets(markdown, title) {
  return parseListItems(section(markdown, title))
    .map((item) => item.name)
    .filter((asset) => /\.(svg|png|jpg|jpeg|webp)$/i.test(asset));
}

function normalizeTokenId(token) {
  if (token.category === "tokens") {
    const segments = token.name.split(".");
    if (["colors", "layout", "effects", "spacing", "typography"].includes(segments[0])) {
      return segments.join(".");
    }
  }
  return token.id;
}

function parseComponent(filePath) {
  const markdown = readText(filePath);
  const titleLine = markdown.split(/\r?\n/).find((line) => line.startsWith("# ")) || "# Untitled";
  const title = stripMarkdown(titleLine.replace(/^#\s+/, ""));
  const idMatch = title.match(/\[([A-Za-z]+-\d+)\]/);
  const id = idMatch ? idMatch[1] : slugify(path.basename(filePath, ".md"));
  const name = title.replace(/\s*\[[^\]]+\]\s*$/, "");
  const typeMatch = markdown.match(/\*\*Type:\*\*\s*(.+)/);
  const categoryMatch = markdown.match(/\*\*Category:\*\*\s*(.+)/);
  const purposeMatch = markdown.match(/\*\*Purpose:\*\*\s*(.+)/);
  const overview = section(markdown, "Overview").split(/\r?\n\r?\n/)[0] || "";
  const tokenBlockMatch = section(markdown, "Styling").match(/### Design Tokens[\s\S]*?```yaml\s*([\s\S]*?)```/);
  const dependencies = tokenBlockMatch
    ? parseYamlSubset(tokenBlockMatch[1], "tokens").map((token) => ({
      ...token,
      id: normalizeTokenId(token),
    }))
    : [];
  const sourceAssets = extractAssets(markdown, "Source Assets");
  const productionAssets = extractAssets(markdown, "Production Assets");
  const previewAsset = sourceAssets.find((asset) => asset.endsWith("style-ai-reversible-s-app-icon.svg"))
    || sourceAssets.find((asset) => /\.svg$/i.test(asset))
    || productionAssets.find((asset) => /\.(png|svg)$/i.test(asset));

  return {
    id,
    name,
    type: typeMatch ? stripMarkdown(typeMatch[1]) : "Component",
    category: categoryMatch ? stripMarkdown(categoryMatch[1]) : "Uncategorized",
    purpose: purposeMatch ? stripMarkdown(purposeMatch[1]) : stripMarkdown(overview),
    variants: parseListItems(section(markdown, "Variants")),
    states: parseListItems(section(markdown, "States")),
    sourceAssets,
    productionAssets,
    previewAsset,
    dependencies,
    file: path.relative(repoRoot, filePath).replace(/\\/g, "/"),
    updated: (markdown.match(/\*\*Last Updated:\*\*\s*(.+)/) || [null, "Unknown"])[1],
  };
}

function collectDesignSystem() {
  const tokensMarkdown = readText(path.join(designSystemDir, "design-tokens.md"));
  const configMarkdown = readText(path.join(designSystemDir, "component-library-config.md"));
  const componentsDir = path.join(designSystemDir, "components");
  const componentFiles = fs.existsSync(componentsDir)
    ? fs.readdirSync(componentsDir)
      .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md")
      .map((file) => path.join(componentsDir, file))
    : [];
  const components = componentFiles.map(parseComponent);
  const tokens = parseTokens(tokensMarkdown);

  const relationships = [];
  components.forEach((component) => {
    component.dependencies.forEach((token) => {
      relationships.push({
        componentId: component.id,
        tokenId: token.id,
        tokenName: token.name,
        category: token.category,
      });
    });
  });

  return {
    project: {
      name: "style-ai",
      mode: "custom Expo / React Native",
      updated: "2026-05-13",
      root: repoRoot,
    },
    counts: {
      tokens: tokens.length,
      components: components.length,
      relationships: relationships.length,
    },
    tokens,
    components,
    relationships,
    configMarkdown,
  };
}

function send(response, status, body, type = "text/plain; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function serveFile(response, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(response, 404, "Not found");
      return;
    }
    send(response, 200, data, contentTypes[ext] || "application/octet-stream");
  });
}

function safeResolve(base, relativePath) {
  const cleanPath = decodeURIComponent(relativePath).replace(/^[/\\]+/, "");
  const resolved = path.resolve(base, cleanPath);
  return resolved.startsWith(base) ? resolved : null;
}

function createServer() {
  return http.createServer((request, response) => {
    const parsed = url.parse(request.url);
    const pathname = parsed.pathname || "/";

    if (pathname === "/api/design-system") {
      send(response, 200, JSON.stringify(collectDesignSystem(), null, 2), "application/json; charset=utf-8");
      return;
    }

    if (pathname.startsWith("/asset/")) {
      const assetPath = safeResolve(repoRoot, pathname.replace(/^\/asset\//, ""));
      if (!assetPath) {
        send(response, 403, "Forbidden");
        return;
      }
      serveFile(response, assetPath);
      return;
    }

    const staticPath = pathname === "/" || ["/tokens", "/components", "/graph", "/search"].includes(pathname)
      ? path.join(catalogDir, "index.html")
      : safeResolve(catalogDir, pathname);

    if (!staticPath) {
      send(response, 403, "Forbidden");
      return;
    }

    serveFile(response, staticPath);
  });
}

function listen(port) {
  const server = createServer();
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }
    throw error;
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Design System Browser running at http://localhost:${port}`);
    console.log("Views:");
    console.log(`- http://localhost:${port}/tokens`);
    console.log(`- http://localhost:${port}/components`);
    console.log(`- http://localhost:${port}/graph`);
    console.log(`- http://localhost:${port}/search`);
  });
}

listen(defaultPort);
