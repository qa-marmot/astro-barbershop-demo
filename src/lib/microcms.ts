import { createClient } from "microcms-js-sdk";

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey        = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  console.warn("[microcms] 環境変数 MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定です。");
}

export const client =
  serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

// ────────────────────────────
// 型定義
// ────────────────────────────

export type BlogCategory = {
  id: string;
  name: string;
};

/**
 * microCMS の `blog` エンドポイントに対応する型。
 * 管理画面でのフィールド設定:
 *   title    : テキストフィールド
 *   content  : リッチエディタ
 *   category : コンテンツ参照（別エンドポイント "categories"）または
 *              セレクトフィールド（文字列）のどちらでも可
 *   eyecatch : 画像フィールド（任意）
 */
export type Blog = {
  id: string;
  title: string;
  content: string;
  category?: BlogCategory | string; // 参照型 or セレクト型どちらにも対応
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
};

export type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

// ────────────────────────────
// API ヘルパー
// ────────────────────────────

/** ブログ一覧取得 */
export async function getBlogList(
  limit = 10,
  offset = 0
): Promise<BlogListResponse> {
  if (!client) return { contents: [], totalCount: 0, offset: 0, limit };

  try {
    return await client.get<BlogListResponse>({
      endpoint: "blog",
      queries: { limit, offset, orders: "-publishedAt" },
    });
  } catch (err) {
    console.error("[microcms] getBlogList failed:", err);
    return { contents: [], totalCount: 0, offset: 0, limit };
  }
}

/** ブログ詳細取得 */
export async function getBlogDetail(id: string): Promise<Blog | null> {
  if (!client) return null;

  try {
    return await client.get<Blog>({ endpoint: "blog", contentId: id });
  } catch (err) {
    console.error("[microcms] getBlogDetail failed:", err);
    return null;
  }
}

/** 静的パス生成用：全 ID を返す */
export async function getAllBlogIds(): Promise<string[]> {
  if (!client) return [];

  try {
    const data = await client.get<BlogListResponse>({
      endpoint: "blog",
      queries: { limit: 100, fields: "id" },
    });
    return data.contents.map((b) => b.id);
  } catch (err) {
    console.error("[microcms] getAllBlogIds failed:", err);
    return [];
  }
}

/** カテゴリ名を安全に文字列として取得するユーティリティ */
export function getCategoryName(
  category: Blog["category"]
): string | undefined {
  if (!category) return undefined;
  if (typeof category === "string") return category;
  return category.name;
}
