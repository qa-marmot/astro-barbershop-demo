/**
 * Internal Link Crawler
 *
 * 全内部リンクをクロールし、404 / 5xx エラーがないか確認します。
 *
 * 使い方:
 *   npm run build && npm run test:links
 */

import { test, expect } from '@playwright/test';

/** クロール対象から除外するパスパターン */
const EXCLUDE_PATTERNS = [
  /^#/,              // アンカーリンク
  /^tel:/,           // 電話リンク
  /^mailto:/,        // メールリンク
  /^\/\//, /^https?:/, // 外部リンク
];

function shouldExclude(href: string): boolean {
  return EXCLUDE_PATTERNS.some(p => p.test(href));
}

test.describe('内部リンクの健全性チェック', () => {
  test('全ページの内部リンクが 404 / 5xx を返さない', async ({ page }) => {
    const toVisit: string[] = ['/'];
    const visited = new Set<string>();
    const broken: Array<{ url: string; status: number; foundOn: string }> = [];
    const foundOn: Record<string, string> = {};

    while (toVisit.length > 0) {
      const path = toVisit.pop()!;

      // クエリパラメータを除いたパスで重複チェック
      const normalizedPath = path.split('?')[0];
      if (visited.has(normalizedPath)) continue;
      visited.add(normalizedPath);

      let response;
      try {
        response = await page.goto(path, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
      } catch {
        broken.push({ url: path, status: 0, foundOn: foundOn[path] ?? '(start)' });
        continue;
      }

      const status = response?.status() ?? 0;
      if (status === 404 || status >= 500) {
        broken.push({ url: path, status, foundOn: foundOn[path] ?? '(start)' });
        continue;
      }

      // このページ上の内部リンクを収集
      const hrefs: string[] = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map(a => a.getAttribute('href'))
          .filter((h): h is string => typeof h === 'string')
      );

      for (const href of hrefs) {
        if (shouldExclude(href)) continue;
        const normalized = href.split('?')[0];
        if (!visited.has(normalized)) {
          toVisit.push(href);
          if (!foundOn[href]) foundOn[href] = path;
        }
      }
    }

    if (broken.length > 0) {
      console.error('\n❌ 壊れたリンクが見つかりました:');
      broken.forEach(b => {
        console.error(`  [${b.status || 'ERR'}] ${b.url}  (found on: ${b.foundOn})`);
      });
    }

    expect(broken, `壊れたリンク: ${JSON.stringify(broken, null, 2)}`).toHaveLength(0);
  });

  test('404 ページが正しくレンダリングされる', async ({ page }) => {
    const response = await page.goto('/this-page-absolutely-does-not-exist-xyz');
    // Astro static は 404.html を返す（ステータスは環境によって変わる）
    const heading = page.getByText('ページが見つかりません');
    const homeLink = page.getByRole('link', { name: 'トップページへ戻る' });

    await expect(heading).toBeVisible({ timeout: 5000 });
    await expect(homeLink).toBeVisible({ timeout: 5000 });
    await expect(homeLink).toHaveAttribute('href', '/');
  });

  test('ヘッダーの全ナビリンクが存在するページを指している', async ({ page }) => {
    await page.goto('/');

    const navLinks = await page.$$eval(
      'header a[href]',
      (anchors) => anchors.map(a => ({
        text: a.textContent?.trim() ?? '',
        href: a.getAttribute('href') ?? '',
      }))
    );

    for (const { text, href } of navLinks) {
      if (!href.startsWith('/') || shouldExclude(href)) continue;

      const resp = await page.goto(href, { waitUntil: 'domcontentloaded' });
      const status = resp?.status() ?? 0;
      expect(
        status,
        `ナビリンク "${text}" → "${href}" が ${status} を返しました`
      ).not.toBe(404);
    }
  });

  test('フッターの全ナビリンクが存在するページを指している', async ({ page }) => {
    await page.goto('/');

    const footerLinks = await page.$$eval(
      'footer a[href]',
      (anchors) => anchors.map(a => ({
        text: a.textContent?.trim() ?? '',
        href: a.getAttribute('href') ?? '',
      }))
    );

    for (const { text, href } of footerLinks) {
      if (!href.startsWith('/') || shouldExclude(href)) continue;

      const resp = await page.goto(href, { waitUntil: 'domcontentloaded' });
      const status = resp?.status() ?? 0;
      expect(
        status,
        `フッターリンク "${text}" → "${href}" が ${status} を返しました`
      ).not.toBe(404);
    }
  });
});
