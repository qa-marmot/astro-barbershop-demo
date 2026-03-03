# Trim Studio — Astro + Tailwind CSS

バーバーショップ「Trim Studio」の公式ホームページ。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Astro 4 (Static SSG) |
| スタイリング | Tailwind CSS v3 |
| 言語 | TypeScript |
| フォント | Cormorant Garamond / DM Sans |
| ホスティング | Cloudflare Pages / Vercel / Netlify |

## セットアップ

```bash
npm install
cp .env.example .env.local   # 環境変数を設定
npm run dev                   # 開発サーバー起動
npm run build                 # 本番ビルド → dist/
npm run preview               # ビルド結果確認
```

## ページ構成

| URL | 内容 |
|-----|------|
| `/` | トップ（About セクション含む） |
| `/menu` | メニュー・料金 |
| `/access` | アクセス・店舗情報 |
| `/contact` | お問い合わせ |

## Cloudflare Pages デプロイ

1. Cloudflare Dashboard → Pages → 「Create application」
2. GitHub/GitLab リポジトリを接続
3. ビルド設定：
   - Build command: `npm run build`
   - Output directory: `dist`
4. 環境変数を追加
5. `public/_headers` はそのままセキュリティヘッダーとして機能

## 店舗情報の変更

`src/lib/config.ts` の `SITE` 定数を編集してください。

## Google フォームの設定

`src/pages/contact.astro` のコメントアウト部分（`<iframe>`）を参照してください。

## Google マップの設定

`src/pages/access.astro` — `SITE.address` から URL を自動生成しています。
