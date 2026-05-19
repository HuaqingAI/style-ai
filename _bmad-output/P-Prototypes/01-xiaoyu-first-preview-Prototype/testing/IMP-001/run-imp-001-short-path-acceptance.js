const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = process.env.PROTOTYPE_BASE_URL || 'http://127.0.0.1:17872/01-xiaoyu-first-preview-Prototype';
const outDir = __dirname;

const viewports = [
  { width: 375, height: 667 },
  { width: 393, height: 852 },
  { width: 428, height: 926 }
];

const results = [];

function push(area, name, status, detail = {}) {
  results.push({ area, name, status, detail });
}

async function exists(page, selector) {
  return await page.locator(selector).count() > 0;
}

async function checkNoHorizontalOverflow(page) {
  return await page.evaluate(() => {
    const bodyWidth = document.body.scrollWidth;
    const docWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    return {
      bodyWidth,
      docWidth,
      viewportWidth,
      overflowing: Math.max(bodyWidth, docWidth) > viewportWidth + 1
    };
  });
}

async function collectConsole(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: viewports[1] });
  const consoleErrors = await collectConsole(page);

  try {
    await page.goto(`${baseUrl}/01.3-photo-upload.html`, { waitUntil: 'networkidle' });

    for (const selector of [
      '#photo-upload-quality-status',
      '#photo-upload-continue-button',
      '[data-upload-state="selected"]',
      '[data-upload-state="selected-warning"]',
      '[data-upload-state="selected-fail"]'
    ]) {
      push('01.3 objects', selector, await exists(page, selector) ? 'pass' : 'fail');
    }

    await page.click('[data-upload-state="selected"]');
    const passHref = await page.getAttribute('#photo-upload-continue-button', 'href');
    const passCta = await page.textContent('#photo-upload-continue-button');
    push('01.3 pass route', 'selected routes to 01.6', passHref && passHref.includes('01.6-generation-waiting') ? 'pass' : 'fail', { passHref, passCta });

    await page.click('[data-upload-state="selected-warning"]');
    const warningVisible = !(await page.locator('#photo-upload-quality-status').evaluate((el) => el.classList.contains('hidden')));
    const warningHref = await page.getAttribute('#photo-upload-continue-button', 'href');
    push('01.3 warning', 'inline warning can continue', warningVisible && warningHref.includes('01.6-generation-waiting') ? 'pass' : 'fail', { warningHref });

    await page.click('[data-upload-state="selected-fail"]');
    const failDisabled = await page.getAttribute('#photo-upload-continue-button', 'aria-disabled');
    const failText = await page.textContent('#photo-upload-quality-title');
    push('01.3 fail', 'fail blocks generation', failDisabled === 'true' && failText.includes('重新上传') ? 'pass' : 'fail', { failDisabled, failText });

    await page.click('[data-upload-state="selected"]');
    await Promise.all([
      page.waitForURL(/01\.6-generation-waiting/, { timeout: 5000 }),
      page.click('#photo-upload-continue-button')
    ]);
    push('happy path', '01.3 -> 01.6', page.url().includes('01.6-generation-waiting') ? 'pass' : 'fail', { url: page.url() });

    for (const selector of ['#generation-waiting-default-direction-note', '#generation-waiting-status']) {
      push('01.6 objects', selector, await exists(page, selector) ? 'pass' : 'fail');
    }
    const waitingText = await page.textContent('#generation-waiting-default-direction-note');
    push('01.6 copy', 'default direction note', waitingText.includes('本轮不用先选风格') ? 'pass' : 'fail', { waitingText });

    await page.click('[data-waiting-state="success"]');
    await Promise.all([
      page.waitForURL(/01\.7-image-result/, { timeout: 5000 }),
      page.click('text=查看生成结果')
    ]);
    push('happy path', '01.6 -> 01.7', page.url().includes('01.7-image-result') ? 'pass' : 'fail', { url: page.url() });

    for (const selector of [
      '#image-result-viewer',
      '#image-result-judgment-sentence',
      '#image-result-next-actions',
      '#image-result-explore-another-style-button',
      '#image-result-save-result-button'
    ]) {
      push('01.7 first screen objects', selector, await exists(page, selector) ? 'pass' : 'fail');
    }

    const actionsText = await page.textContent('#image-result-next-actions');
    push('01.7 actions', 'only primary actions visible', actionsText.includes('换个方向') && actionsText.includes('保存') ? 'pass' : 'fail', { actionsText });

    const profileInitiallyHidden = await page.locator('#image-result-common-profile-prompt').evaluate((el) => el.classList.contains('hidden'));
    const feedbackInitiallyHidden = await page.locator('#image-result-seed-feedback-panel').evaluate((el) => el.classList.contains('hidden'));
    push('01.7 progressive disclosure', 'profile hidden initially', profileInitiallyHidden ? 'pass' : 'fail');
    push('01.7 progressive disclosure', 'feedback reasons hidden initially', feedbackInitiallyHidden ? 'pass' : 'fail');

    await page.click('#image-result-save-result-button');
    const profileAfterSaveHidden = await page.locator('#image-result-common-profile-prompt').evaluate((el) => el.classList.contains('hidden'));
    push('01.7 save', 'save reveals profile prompt', !profileAfterSaveHidden ? 'pass' : 'fail');

    await page.click('[data-field="looks_like_me"][data-value="no"]');
    const feedbackAfterNegativeHidden = await page.locator('#image-result-seed-feedback-panel').evaluate((el) => el.classList.contains('hidden'));
    push('01.7 feedback', 'negative reveals reason panel', !feedbackAfterNegativeHidden ? 'pass' : 'fail');

    for (const viewport of viewports) {
      for (const pageName of ['01.3-photo-upload.html', '01.6-generation-waiting.html', '01.7-image-result.html']) {
        await page.setViewportSize(viewport);
        await page.goto(`${baseUrl}/${pageName}`, { waitUntil: 'networkidle' });
        const overflow = await checkNoHorizontalOverflow(page);
        push('mobile overflow', `${pageName}:${viewport.width}`, overflow.overflowing ? 'fail' : 'pass', overflow);
      }
    }

    push('console', 'no console errors', consoleErrors.length === 0 ? 'pass' : 'fail', { consoleErrors });
  } finally {
    await browser.close();
  }

  const failed = results.filter((result) => result.status !== 'pass');
  const summary = {
    baseUrl,
    total: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
    results
  };

  fs.writeFileSync(path.join(outDir, 'imp-001-short-path-acceptance-results.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
