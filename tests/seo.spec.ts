import { test, expect } from '@playwright/test';
import { extendExpect } from '@seo-guardian/core';

extendExpect(expect);

test('トップページ SEO検証', async ({ page }) => {
  await page.goto('/');

  await expect.soft(page).toHaveSeoTitle({ minLength: 30, maxLength: 60 });
  await expect.soft(page).toHaveSeoDescription({ minLength: 70, maxLength: 160 });
  await expect.soft(page).toHaveSingleH1();
  await expect.soft(page).toHaveCanonical();
  await expect.soft(page).toHaveNoNoindex();
  await expect.soft(page).toHaveLangAttribute();
  await expect.soft(page).toHaveRequiredOgTags();
  await expect.soft(page).toHaveValidImgAlts();
});