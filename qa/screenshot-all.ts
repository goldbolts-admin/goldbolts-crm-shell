import { chromium, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE = 'https://app.goldbolts.org';
const EMAIL = 'romeo@goldbolts.org';
const PASS = 'GoldboltsAdmin@2026';
const OUT = path.join(__dirname, 'screenshots');

fs.mkdirSync(OUT, { recursive: true });

async function shot(page: Page, name: string) {
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  console.log(`  ✓ ${name}.png`);
}

async function shotElement(page: Page, selector: string, name: string) {
  try {
    const el = page.locator(selector).first();
    await el.waitFor({ timeout: 3000 });
    await el.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log(`  ✓ element: ${name}.png`);
  } catch {
    console.log(`  ✗ element not found: ${selector} (${name})`);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120 Safari/537.36'
  });
  const page = await ctx.newPage();

  // ── LOGIN PAGE ──────────────────────────────────────────────
  console.log('\n[1] Login page');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await shot(page, '01-login-full');
  await shotElement(page, 'form', '01-login-form');

  // ── DO LOGIN ────────────────────────────────────────────────
  console.log('\n[2] Performing login');
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASS);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/`, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await shot(page, '02-after-login');

  // ── DASHBOARD ───────────────────────────────────────────────
  console.log('\n[3] Dashboard');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await shot(page, '03-dashboard-full');
  await shotElement(page, 'aside', '03-sidebar');
  await shotElement(page, '[class*="grid"]', '03-stat-cards');

  // ── CONTACTS ────────────────────────────────────────────────
  console.log('\n[4] Contacts');
  await page.goto(`${BASE}/contacts`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '04-contacts-full');

  // ── PIPELINE ────────────────────────────────────────────────
  console.log('\n[5] Pipeline');
  await page.goto(`${BASE}/pipeline`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '05-pipeline-full');

  // ── CAMPAIGNS ───────────────────────────────────────────────
  console.log('\n[6] Campaigns');
  await page.goto(`${BASE}/campaigns`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '06-campaigns-full');

  // ── CHAT ────────────────────────────────────────────────────
  console.log('\n[7] Chat');
  await page.goto(`${BASE}/chat`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '07-chat-full');

  // ── CALLS ───────────────────────────────────────────────────
  console.log('\n[8] Calls');
  await page.goto(`${BASE}/calls`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await shot(page, '08-calls-full');
  await shotElement(page, 'button', '08-calls-start-button');

  // ── CONTRACTS ───────────────────────────────────────────────
  console.log('\n[9] Contracts');
  await page.goto(`${BASE}/contracts`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '09-contracts-full');

  // ── BILLING ─────────────────────────────────────────────────
  console.log('\n[10] Billing');
  await page.goto(`${BASE}/billing`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '10-billing-full');

  // ── DOCS ────────────────────────────────────────────────────
  console.log('\n[11] Docs');
  await page.goto(`${BASE}/docs`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, '11-docs-full');

  // ── SETTINGS ────────────────────────────────────────────────
  console.log('\n[12] Settings');
  await page.goto(`${BASE}/settings`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await shot(page, '12-settings-full');
  await shotElement(page, 'section', '12-settings-account');

  // ── AI ASSISTANT ─────────────────────────────────────────────
  console.log('\n[13] AI Assistant drawer');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  // Click the AI floating button
  const aiBtn = page.locator('button[title="Goldbolts AI"]').first();
  await aiBtn.click().catch(() => {});
  await page.waitForTimeout(1500);
  await shot(page, '13-ai-assistant-open');

  // ── COMMAND PALETTE ───────────────────────────────────────────
  console.log('\n[14] Command palette');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.keyboard.press('Meta+k');
  await page.waitForTimeout(1000);
  await shot(page, '14-command-palette');

  // ── MOBILE viewport ───────────────────────────────────────────
  console.log('\n[15] Mobile viewports');
  await ctx.close();
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(OUT, '15-mobile-login.png'), fullPage: true });
  console.log('  ✓ 15-mobile-login.png');

  await mobilePage.fill('input[type="email"]', EMAIL);
  await mobilePage.fill('input[type="password"]', PASS);
  await mobilePage.click('button[type="submit"]');
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: path.join(OUT, '15-mobile-dashboard.png'), fullPage: true });
  console.log('  ✓ 15-mobile-dashboard.png');

  await mobilePage.goto(`${BASE}/calls`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(OUT, '15-mobile-calls.png'), fullPage: true });
  console.log('  ✓ 15-mobile-calls.png');

  await mobileCtx.close();
  await browser.close();

  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\n✅ Done — ${files.length} screenshots saved to qa/screenshots/`);
})();
