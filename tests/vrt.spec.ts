/**
 * Visual Regression Testing (VRT)
 *
 * 使い方:
 *   1. ビルドとプレビューサーバーを起動: npm run build && npm run preview
 *   2. 初回実行（ベースライン生成）:     npm run test:vrt
 *   3. 比較実行（差分チェック）:         npm run test:vrt
 *
 * スナップショットは tests/__screenshots__/ に保存されます。
 * 意図した変更時は --update-snapshots フラグで更新してください。
 */

import { test, expect, type Page } from '@playwright/test';

/** アニメーション・リビールを即座に完了させるスタイルを注入 */
async function freezeAnimations(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      .reveal, .reveal-left, .reveal-right {
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
}

/** ページ読み込みが安定するまで待機 */
async function waitForStable(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);
  await freezeAnimations(page);
  // Unsplash 画像が読み込まれるまで追加で少し待機
  await page.waitForTimeout(300);
}

const PAGES = [
  { name: 'homepage', path: '/'        },
  { name: 'menu',     path: '/menu'    },
  { name: 'access',   path: '/access'  },
  { name: 'contact',  path: '/contact' },
  { name: '404',      path: '/404'     },
] as const;

/* ── Desktop（1280 × 800） ── */
test.describe('VRT — Desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const { name, path } of PAGES) {
    test(`${name} — desktop full-page`, async ({ page }) => {
      await page.goto(path);
      await waitForStable(page);

      await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,   // 2% 以内の差異は許容
        animations: 'disabled',
      });
    });
  }
});

/* ── Mobile（390 × 844 = iPhone 14） ── */
test.describe('VRT — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { name, path } of PAGES) {
    test(`${name} — mobile full-page`, async ({ page }) => {
      await page.goto(path);
      await waitForStable(page);

      await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled',
      });
    });
  }
});

/* ── Tablet（768 × 1024 = iPad） ── */
test.describe('VRT — Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  for (const { name, path } of PAGES) {
    test(`${name} — tablet full-page`, async ({ page }) => {
      await page.goto(path);
      await waitForStable(page);

      await expect(page).toHaveScreenshot(`${name}-tablet.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled',
      });
    });
  }
});
