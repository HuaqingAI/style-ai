const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const outputRoot = path.resolve(__dirname, '..', '..', '..', '..');
const prototypePath = 'P-Prototypes/04-xiaoyu-seed-feedback-Prototype';
const pageFile = '04.1-result-quick-feedback-panel.html';
const host = '127.0.0.1';
const port = Number(process.env.PORT || 18084);
const baseUrl = `http://${host}:${port}/${prototypePath}`;
const outDir = path.resolve(__dirname);
const screenshotsDir = path.join(outDir, 'screenshots');

fs.mkdirSync(screenshotsDir, { recursive: true });

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const requiredObjectIds = [
  'obj-feedback-header',
  'obj-result-context',
  'obj-feedback-entry',
  'obj-feedback-panel',
  'obj-likeness-choice-group',
  'obj-judgment-choice-group',
  'obj-issue-tags',
  'obj-issue-category-group',
  'obj-feedback-note',
  'obj-submit-feedback-action',
  'obj-feedback-validation',
  'obj-feedback-success',
  'obj-feedback-next-actions',
  'obj-feedback-state-controls'
];

const states = ['default', 'open', 'validation-error', 'submitting', 'submitted', 'tryon-context'];
const viewports = [
  { width: 375, height: 667 },
  { width: 393, height: 852 },
  { width: 428, height: 926 }
];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${host}:${port}`);
    let pathname = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    if (!pathname) pathname = `${prototypePath}/${pageFile}`;

    const file = path.resolve(outputRoot, pathname);
    if (!file.startsWith(outputRoot)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': mimeTypes[path.extname(file).toLowerCase()] || 'application/octet-stream'
      });
      fs.createReadStream(file).pipe(res);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve(server));
  });
}

function push(results, category, id, status, details = {}) {
  results.push({ category, id, status, ...details });
}

async function checkNoHorizontalOverflow(page) {
  return page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    overflowing: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > window.innerWidth + 1
  }));
}

async function getConsoleErrors(page, action) {
  const errors = [];
  const listener = (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  };
  page.on('console', listener);
  try {
    await action();
  } finally {
    page.off('console', listener);
  }
  return errors;
}

async function applyState(page, stateName) {
  await page.evaluate((value) => window.StyleAIFeedbackPrototype.applyPrototypeState(value), stateName);
  await page.waitForTimeout(80);
}

async function checkLink(page, results, id, selector, expectedSuffix) {
  const href = await page.locator(selector).getAttribute('href');
  const absoluteUrl = new URL(href, page.url()).toString();
  const response = await page.request.get(absoluteUrl);
  push(results, 'route', id, response.ok() && absoluteUrl.endsWith(expectedSuffix) ? 'pass' : 'fail', {
    href,
    absoluteUrl,
    expectedSuffix,
    statusCode: response.status()
  });
}

async function run() {
  const server = await createServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: viewports[1], deviceScaleFactor: 1, isMobile: true });
  const page = await context.newPage();
  const results = [];
  const url = `${baseUrl}/${pageFile}`;

  try {
    const errors = await getConsoleErrors(page, async () => {
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      push(results, 'page-load', pageFile, response && response.ok() ? 'pass' : 'fail', {
        statusCode: response && response.status()
      });
    });
    push(results, 'console', 'initial-load', errors.length ? 'fail' : 'pass', { errors });

    for (const objectId of requiredObjectIds) {
      const count = await page.locator(`[data-object-id="${objectId}"]`).count();
      push(results, 'required-object', objectId, count > 0 ? 'pass' : 'fail', { count });
    }

    for (const state of states) {
      await applyState(page, state);
      const currentState = await page.locator('#app').getAttribute('data-state');
      push(results, 'state', state, currentState === state ? 'pass' : 'fail', { currentState });
    }

    await applyState(page, 'default');
    await page.locator('#feedback-open-button').click();
    const openedByEntry = await page.locator('#app').getAttribute('data-state');
    const expanded = await page.locator('#feedback-open-button').getAttribute('aria-expanded');
    push(results, 'interaction', 'entry-opens-panel', openedByEntry === 'open' && expanded === 'true' ? 'pass' : 'fail', {
      openedByEntry,
      expanded
    });

    await applyState(page, 'open');
    await page.locator('.choice-button[data-field="likeness"][data-value="partly"]').click();
    await page.locator('.choice-button[data-field="judgmentUsefulness"][data-value="unsure"]').click();
    await page.locator('.tag-button[data-tag="makeup_not_me"]').click();
    await page.locator('#feedback-submit-button').click();
    await page.waitForFunction(() => document.querySelector('#app')?.dataset.state === 'submitted');
    push(results, 'interaction', 'valid-submit', 'pass', {
      currentState: await page.locator('#app').getAttribute('data-state')
    });

    await applyState(page, 'open');
    await page.locator('#feedback-submit-button').click();
    await page.waitForTimeout(100);
    const validationVisible = await page.locator('#feedback-validation').evaluate((el) => !el.classList.contains('hidden'));
    const validationState = await page.locator('#app').getAttribute('data-state');
    push(results, 'interaction', 'empty-submit-validation', validationVisible && validationState === 'validation-error' ? 'pass' : 'fail', {
      validationVisible,
      validationState
    });

    await applyState(page, 'submitted');
    await checkLink(page, results, 'personal-back', '#feedback-back-link', '/01-xiaoyu-first-preview-Prototype/01.7-image-result.html');
    await checkLink(page, results, 'personal-primary-continue', '#feedback-primary-action', '/02-xiaoyu-second-style-exploration-Prototype/02.1-second-style-exploration.html');
    await checkLink(page, results, 'personal-retry', '#feedback-retry-action', '/01-xiaoyu-first-preview-Prototype/01.5-generation-setup.html');

    await applyState(page, 'tryon-context');
    await checkLink(page, results, 'tryon-back', '#feedback-back-link', '/03-linman-tryon-decision-Prototype/03.5-tryon-result.html');
    await checkLink(page, results, 'tryon-primary-continue', '#feedback-primary-action', '/03-linman-tryon-decision-Prototype/03.6-history-collection.html');
    await checkLink(page, results, 'tryon-retry', '#feedback-retry-action', '/03-linman-tryon-decision-Prototype/03.3-tryon-setup.html');

    await applyState(page, 'default');
    const personalTags = await page.locator('#issue-tag-list').innerText();
    push(results, 'dynamic-tags', 'personal-tags', personalTags.includes('脸不像本人') && personalTags.includes('发型不自然') ? 'pass' : 'fail', {
      personalTags
    });

    await applyState(page, 'tryon-context');
    const tryonTags = await page.locator('#issue-tag-list').innerText();
    const resultType = await page.locator('#app').getAttribute('data-result-type');
    push(results, 'dynamic-tags', 'tryon-tags', resultType === 'tryon' && tryonTags.includes('不像参考图') && tryonTags.includes('比例不对') ? 'pass' : 'fail', {
      resultType,
      tryonTags
    });

    const images = await page.evaluate(() => Array.from(document.images).map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      visible: !!(img.offsetWidth || img.offsetHeight)
    })));
    const brokenImages = images.filter((img) => img.visible && (img.naturalWidth === 0 || img.naturalHeight === 0));
    const visibleImagesMissingAlt = images.filter((img) => {
      const src = img.src || '';
      const decorativeBrandAsset = src.includes('brand-logo/style-ai-reversible-s-app-icon.svg');
      return img.visible && !img.alt && !decorativeBrandAsset;
    });
    push(results, 'images', 'visible-images', brokenImages.length === 0 ? 'pass' : 'fail', { brokenImages });
    push(results, 'image-alt', 'visible-images', visibleImagesMissingAlt.length === 0 ? 'pass' : 'fail', { visibleImagesMissingAlt });

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(url, { waitUntil: 'networkidle' });
      const overflow = await checkNoHorizontalOverflow(page);
      push(results, 'mobile-overflow', String(viewport.width), overflow.overflowing ? 'fail' : 'pass', overflow);
    }

    await page.setViewportSize(viewports[1]);
    await page.goto(url, { waitUntil: 'networkidle' });
    await applyState(page, 'open');
    const touchIssues = await page.evaluate(() => Array.from(document.querySelectorAll('button, a, textarea, input, select, [role="button"]'))
      .filter((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      })
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const text = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('data-object-id') || el.id || el.tagName).trim();
        return { text, width: Math.round(rect.width), height: Math.round(rect.height), tag: el.tagName.toLowerCase() };
      })
      .filter((item) => item.width < 44 || item.height < 44));
    push(results, 'touch-target', pageFile, touchIssues.length === 0 ? 'pass' : 'fail', { touchIssues });

    await applyState(page, 'open');
    await page.screenshot({ path: path.join(screenshotsDir, '04.1-result-quick-feedback-panel-393.png'), fullPage: true });
    await page.screenshot({ path: path.resolve(__dirname, '..', '..', '04.1-result-quick-feedback-panel-393.png'), fullPage: true });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    page: pageFile,
    counts: {
      total: results.length,
      passed: results.filter((result) => result.status === 'pass').length,
      failed: results.filter((result) => result.status === 'fail').length
    },
    results
  };
  fs.writeFileSync(path.join(outDir, 'scenario-04-acceptance-results.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary.counts, null, 2));
  if (summary.counts.failed) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
