/** メニューアイテムの型定義 */
export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  priceDisplay: string;
  desc: string;
  category: 'cut' | 'shave' | 'set' | 'other';
  /** 価格が変動する場合（カラー・パーマ等） */
  variablePrice?: boolean;
}

/** 全メニューアイテム（税込） */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cut',
    name: 'カット',
    nameEn: 'Cut',
    price: 4000,
    priceDisplay: '¥4,000',
    desc: 'カウンセリングで骨格・髪質を把握し、最適なスタイルをご提案します。',
    category: 'cut',
  },
  {
    id: 'cut-shampoo',
    name: 'カット + シャンプー',
    nameEn: 'Cut + Shampoo',
    price: 4800,
    priceDisplay: '¥4,800',
    desc: 'カットにヘッドスパシャンプーを追加。頭皮から整えるリフレッシュコース。',
    category: 'cut',
  },
  {
    id: 'shave',
    name: 'シェービング',
    nameEn: 'Shave',
    price: 2500,
    priceDisplay: '¥2,500',
    desc: '伝統的な直刃技法でクリーンな仕上がりをお届けします。',
    category: 'shave',
  },
  {
    id: 'facial-shave',
    name: 'フェイシャルシェービング',
    nameEn: 'Facial Shave',
    price: 3000,
    priceDisplay: '¥3,000',
    desc: '顔全体の産毛を丁寧に処理。肌トーンアップ効果も期待できます。',
    category: 'shave',
  },
  {
    id: 'set-basic',
    name: 'カット + シェービング',
    nameEn: 'Cut & Shave Set',
    price: 6000,
    priceDisplay: '¥6,000',
    desc: 'カットとシェービングのセット。洗練されたトータルスタイルに。',
    category: 'set',
  },
  {
    id: 'set-full',
    name: 'カット + シャンプー + シェービング',
    nameEn: 'Full Course',
    price: 6800,
    priceDisplay: '¥6,800',
    desc: '人気のフルコース。カット・シャンプー・シェービングで至福のひとときを。',
    category: 'set',
  },
  {
    id: 'shampoo',
    name: 'シャンプー',
    nameEn: 'Shampoo',
    price: 1200,
    priceDisplay: '¥1,200',
    desc: '頭皮マッサージ付きのリフレッシュシャンプー。',
    category: 'other',
  },
  {
    id: 'color',
    name: 'カラー',
    nameEn: 'Color',
    price: 5000,
    priceDisplay: '¥5,000〜',
    desc: 'ご要望に合わせたカラーリング。',
    category: 'other',
    variablePrice: true,
  },
  {
    id: 'perm',
    name: 'パーマ',
    nameEn: 'Perm',
    price: 6000,
    priceDisplay: '¥6,000〜',
    desc: 'スタイリングしやすいパーマスタイル。',
    category: 'other',
    variablePrice: true,
  },
];

/** カテゴリーでフィルタリング */
export function getItemsByCategory(category: MenuItem['category']): MenuItem[] {
  return MENU_ITEMS.filter(item => item.category === category);
}

/** 選択アイテムの合計金額を計算 */
export function calculateTotal(ids: string[]): number {
  return ids.reduce((sum, id) => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return sum + (item?.price ?? 0);
  }, 0);
}

/** 金額を日本円フォーマットで表示 */
export function formatPrice(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

/**
 * セットメニュー割引額を計算する。
 * 個別購入よりセット購入の方が安い場合、差額を返す。
 */
export function getDiscount(ids: string[]): number {
  const hasShampoo = ids.includes('shampoo');
  const hasCut = ids.includes('cut');
  const hasShave = ids.includes('shave');

  if (hasCut && hasShave && hasShampoo) {
    const individualTotal = calculateTotal(['cut', 'shave', 'shampoo']);
    const setItem = MENU_ITEMS.find(m => m.id === 'set-full')!;
    return Math.max(0, individualTotal - setItem.price);
  }

  if (hasCut && hasShave) {
    const individualTotal = calculateTotal(['cut', 'shave']);
    const setItem = MENU_ITEMS.find(m => m.id === 'set-basic')!;
    return Math.max(0, individualTotal - setItem.price);
  }

  return 0;
}
