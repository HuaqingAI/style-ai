const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = 'http://127.0.0.1:18083/P-Prototypes/03-linman-tryon-decision-Prototype';
const outDir = path.resolve(__dirname);
const screenshotsDir = path.join(outDir, 'screenshots');
fs.mkdirSync(screenshotsDir, { recursive: true });

const pages = [
  {
    id: '03.1',
    file: '03.1-tryon-entry.html',
    required: ['obj-header', 'obj-entry-hero', 'obj-reference-options', 'obj-primary-action', 'obj-credit-notice'],
    nextSelector: '[data-object-id="obj-primary-action"]',
    expectedNext: '03.2-import-reference.html',
    states: []
  },
  {
    id: '03.2',
    file: '03.2-import-reference.html',
    required: ['obj-import-header', 'obj-import-source-options', 'obj-reference-preview', 'obj-reference-details', 'obj-confirm-reference-action'],
    nextSelector: '[data-object-id="obj-confirm-reference-action"]',
    expectedNext: '03.3-tryon-setup.html',
    states: ['empty', 'importing', 'imported', 'error']
  },
  {
    id: '03.3',
    file: '03.3-tryon-setup.html',
    required: ['obj-setup-header', 'obj-setup-reference-summary', 'obj-setup-profile-card', 'obj-setup-credit-confirmation', 'obj-start-generation-action'],
    nextSelector: '[data-object-id="obj-start-generation-action"]',
    expectedNext: '03.4-tryon-waiting.html',
    states: ['default', 'missing-profile', 'low-credit', 'submitting', 'submit-error']
  },
  {
    id: '03.4',
    file: '03.4-tryon-waiting.html',
    required: ['obj-waiting-header', 'obj-waiting-status', 'obj-waiting-context-summary', 'obj-waiting-credit-policy', 'obj-waiting-recovery-actions'],
    nextSelector: null,
    expectedNext: '03.5-tryon-result.html',
    states: ['queued', 'generating', 'finalizing', 'success', 'timeout', 'failed']
  },
  {
    id: '03.5',
    file: '03.5-tryon-result.html',
    required: ['obj-result-header', 'obj-result-viewer', 'obj-result-reference-summary', 'obj-result-fit-summary', 'obj-result-judgment-feedback', 'obj-result-next-actions'],
    nextSelector: null,
    expectedNext: '03.6-history-collection.html',
    states: ['default', 'saved', 'compared', 'detail', 'load-error']
  },
  {
    id: '03.6',
    file: '03.6-history-collection.html',
    required: ['obj-history-header', 'obj-current-saved-result', 'obj-history-collection-actions', 'obj-compare-list', 'obj-history-decision-actions'],
    nextSelector: null,
    expectedNext: '03.7-credit-purchase.html',
    states: ['default', 'compare', 'favorite', 'empty', 'save-error']
  },
  {
    id: '03.7',
    file: '03.7-credit-purchase.html',
    required: ['obj-credit-header', 'obj-credit-value-recap', 'obj-credit-balance-card', 'obj-credit-plan-list', 'obj-credit-policy-note', 'obj-credit-purchase-actions'],
    nextSelector: null,
    expectedNext: null,
    states: ['default', 'selected', 'purchasing', 'success', 'purchase-error', 'declined']
  }
];

const viewports = [
  { width: 375, height: 812 },
  { width: 393, height: 852 },
  { width: 428, height: 926 }
];

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

async function clickState(page, state) {
  const selector = `.state-control[data-state="${state}"], [data-result-state="${state}"]`;
  const control = page.locator(selector).first();
  if (await control.count()) {
    await control.click();
    await page.waitForTimeout(80);
    return true;
  }
  return false;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: viewports[1], deviceScaleFactor: 1, isMobile: true });
  const page = await context.newPage();
  const results = [];

  for (const spec of pages) {
    const url = `${baseUrl}/${spec.file}`;
    const errors = await getConsoleErrors(page, async () => {
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      push(results, 'page-load', spec.id, response && response.ok() ? 'pass' : 'fail', {
        file: spec.file,
        statusCode: response && response.status()
      });
    });
    push(results, 'console', spec.id, errors.length ? 'fail' : 'pass', { errors });

    for (const objectId of spec.required) {
      const count = await page.locator(`[data-object-id="${objectId}"]`).count();
      push(results, 'required-object', `${spec.id}:${objectId}`, count > 0 ? 'pass' : 'fail', { count });
    }

    for (const state of spec.states) {
      const clicked = await clickState(page, state);
      const currentState = await page.locator('[data-state]').first().getAttribute('data-state').catch(() => null);
      push(results, 'state', `${spec.id}:${state}`, clicked && currentState === state ? 'pass' : 'fail', { clicked, currentState });
    }

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
    push(results, 'images', spec.id, brokenImages.length === 0 ? 'pass' : 'fail', { brokenImages });
    push(results, 'image-alt', spec.id, visibleImagesMissingAlt.length === 0 ? 'pass' : 'fail', { visibleImagesMissingAlt });

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(url, { waitUntil: 'networkidle' });
      const overflow = await checkNoHorizontalOverflow(page);
      push(results, 'mobile-overflow', `${spec.id}:${viewport.width}`, overflow.overflowing ? 'fail' : 'pass', overflow);
    }

    await page.setViewportSize(viewports[1]);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, `${spec.file.replace('.html', '')}-393.png`), fullPage: true });
  }

  const routeChecks = [
    { from: '03.1-tryon-entry.html', click: '[data-object-id="obj-primary-action"]', expect: '03.2-import-reference.html' },
    { from: '03.2-import-reference.html', setup: async () => clickState(page, 'imported'), click: '[data-object-id="obj-confirm-reference-action"]', expect: '03.3-tryon-setup.html' },
    { from: '03.3-tryon-setup.html', click: '[data-object-id="obj-start-generation-action"]', expect: '03.4-tryon-waiting.html' },
    { from: '03.4-tryon-waiting.html', setup: async () => clickState(page, 'success'), click: 'a[href="03.5-tryon-result.html"]', expect: '03.5-tryon-result.html' },
    { from: '03.5-tryon-result.html', setup: async () => clickState(page, 'saved'), click: '#result-save-button', expect: '03.6-history-collection.html' },
    { from: '03.6-history-collection.html', click: '#history-credit-button', expect: '03.7-credit-purchase.html' }
  ];

  for (const route of routeChecks) {
    await page.setViewportSize(viewports[1]);
    await page.goto(`${baseUrl}/${route.from}`, { waitUntil: 'networkidle' });
    if (route.setup) await route.setup();
    await page.locator(route.click).first().click();
    await page.waitForTimeout(1200);
    const current = page.url();
    push(results, 'happy-path-route', `${route.from}->${route.expect}`, current.includes(route.expect) ? 'pass' : 'fail', { current });
  }

  const interactionChecks = [
    {
      pageFile: '03.5-tryon-result.html',
      id: '03.5-feedback-buttons',
      run: async () => {
        await page.goto(`${baseUrl}/03.5-tryon-result.html`, { waitUntil: 'networkidle' });
        await page.locator('.judgment-choice[data-field="likeness"]').first().click();
        await page.locator('.judgment-choice[data-field="useful"]').first().click();
        return page.locator('#result-feedback-chip').innerText();
      },
      expect: (value) => value.includes('已记录')
    },
    {
      pageFile: '03.6-history-collection.html',
      id: '03.6-compare-mode-query',
      run: async () => {
        await page.goto(`${baseUrl}/03.6-history-collection.html?mode=compare`, { waitUntil: 'networkidle' });
        return page.locator('[data-state]').first().getAttribute('data-state');
      },
      expect: (value) => value === 'compare'
    },
    {
      pageFile: '03.7-credit-purchase.html',
      id: '03.7-plan-selection',
      run: async () => {
        await page.goto(`${baseUrl}/03.7-credit-purchase.html`, { waitUntil: 'networkidle' });
        await page.locator('.plan-option').nth(1).click();
        return page.locator('[data-state]').first().getAttribute('data-state');
      },
      expect: (value) => value === 'selected'
    }
  ];

  for (const check of interactionChecks) {
    try {
      const value = await check.run();
      push(results, 'interaction', check.id, check.expect(value) ? 'pass' : 'fail', { value });
    } catch (error) {
      push(results, 'interaction', check.id, 'fail', { error: error.message });
    }
  }

  for (const spec of pages) {
    await page.setViewportSize(viewports[1]);
    await page.goto(`${baseUrl}/${spec.file}`, { waitUntil: 'networkidle' });
    const touchIssues = await page.evaluate(() => Array.from(document.querySelectorAll('button, a, input, textarea, select, [role="button"]'))
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
    push(results, 'touch-target', spec.id, touchIssues.length === 0 ? 'pass' : 'fail', { touchIssues });
  }

  await browser.close();

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    pages: pages.map((p) => p.file),
    counts: {
      total: results.length,
      passed: results.filter((r) => r.status === 'pass').length,
      failed: results.filter((r) => r.status === 'fail').length
    },
    results
  };
  fs.writeFileSync(path.join(outDir, 'scenario-03-acceptance-results.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary.counts, null, 2));
  if (summary.counts.failed) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
