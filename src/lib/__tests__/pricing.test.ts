import { describe, it, expect } from 'vitest';
import {
  MENU_ITEMS,
  getItemsByCategory,
  calculateTotal,
  formatPrice,
  getDiscount,
} from '../pricing';

describe('MENU_ITEMS', () => {
  it('全アイテムが必須フィールドを持つ', () => {
    expect(MENU_ITEMS.length).toBeGreaterThan(0);
    MENU_ITEMS.forEach(item => {
      expect(item.id,          `${item.name}: id missing`).toBeTruthy();
      expect(item.name,        `${item.id}: name missing`).toBeTruthy();
      expect(item.priceDisplay,`${item.id}: priceDisplay missing`).toMatch(/^¥/);
      expect(item.price,       `${item.id}: price must be > 0`).toBeGreaterThan(0);
      expect(['cut', 'shave', 'set', 'other']).toContain(item.category);
    });
  });

  it('priceDisplay が price と整合している', () => {
    MENU_ITEMS.filter(item => !item.variablePrice).forEach(item => {
      const expected = `¥${item.price.toLocaleString('ja-JP')}`;
      expect(item.priceDisplay).toBe(expected);
    });
  });

  it('カットカテゴリーのアイテムが存在する', () => {
    const cuts = MENU_ITEMS.filter(m => m.category === 'cut');
    expect(cuts.length).toBeGreaterThanOrEqual(1);
  });

  it('セットメニューの価格が個別合計より安い', () => {
    const cutPrice   = MENU_ITEMS.find(m => m.id === 'cut')!.price;
    const shavePrice = MENU_ITEMS.find(m => m.id === 'shave')!.price;
    const setPrice   = MENU_ITEMS.find(m => m.id === 'set-basic')!.price;
    expect(setPrice).toBeLessThan(cutPrice + shavePrice);
  });
});

describe('getItemsByCategory', () => {
  it('cut カテゴリーのみを返す', () => {
    const items = getItemsByCategory('cut');
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => expect(item.category).toBe('cut'));
  });

  it('shave カテゴリーのみを返す', () => {
    const items = getItemsByCategory('shave');
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => expect(item.category).toBe('shave'));
  });

  it('set カテゴリーのみを返す', () => {
    const items = getItemsByCategory('set');
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => expect(item.category).toBe('set'));
  });

  it('other カテゴリーのみを返す', () => {
    const items = getItemsByCategory('other');
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => expect(item.category).toBe('other'));
  });

  it('全カテゴリーのアイテム数が MENU_ITEMS の合計と一致する', () => {
    const total =
      getItemsByCategory('cut').length +
      getItemsByCategory('shave').length +
      getItemsByCategory('set').length +
      getItemsByCategory('other').length;
    expect(total).toBe(MENU_ITEMS.length);
  });
});

describe('calculateTotal', () => {
  it('単一アイテムの合計を正しく計算する', () => {
    expect(calculateTotal(['cut'])).toBe(4000);
  });

  it('複数アイテムの合計を正しく計算する', () => {
    expect(calculateTotal(['cut', 'shave'])).toBe(6500);
  });

  it('空の配列は0を返す', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('存在しない ID は無視される', () => {
    expect(calculateTotal(['unknown-id'])).toBe(0);
  });

  it('混在した ID でも正しく計算する', () => {
    expect(calculateTotal(['cut', 'unknown', 'shampoo'])).toBe(4000 + 1200);
  });

  it('同じ ID を複数回指定した場合は合算される', () => {
    expect(calculateTotal(['cut', 'cut'])).toBe(8000);
  });
});

describe('formatPrice', () => {
  it('円記号付きのフォーマットで返す', () => {
    expect(formatPrice(4000)).toBe('¥4,000');
  });

  it('3桁区切りを正しく適用する', () => {
    expect(formatPrice(10000)).toBe('¥10,000');
  });

  it('0を正しくフォーマットする', () => {
    expect(formatPrice(0)).toBe('¥0');
  });

  it('大きな金額も正しくフォーマットする', () => {
    expect(formatPrice(1000000)).toBe('¥1,000,000');
  });
});

describe('getDiscount', () => {
  it('割引なしの場合は 0 を返す', () => {
    expect(getDiscount(['cut'])).toBe(0);
    expect(getDiscount(['shave'])).toBe(0);
    expect(getDiscount(['shampoo'])).toBe(0);
  });

  it('cut + shave のセット割引を計算する', () => {
    // cut(4000) + shave(2500) = 6500、set-basic = 6000 → 割引500
    const discount = getDiscount(['cut', 'shave']);
    expect(discount).toBe(500);
  });

  it('フルコースのセット割引を計算する', () => {
    // cut(4000) + shave(2500) + shampoo(1200) = 7700、set-full = 6800 → 割引900
    const discount = getDiscount(['cut', 'shave', 'shampoo']);
    expect(discount).toBe(900);
  });

  it('割引が負にならない', () => {
    const discount = getDiscount(['cut', 'shave', 'shampoo', 'color']);
    expect(discount).toBeGreaterThanOrEqual(0);
  });

  it('切断なしの組み合わせは割引なし', () => {
    expect(getDiscount(['facial-shave', 'shampoo'])).toBe(0);
  });
});
