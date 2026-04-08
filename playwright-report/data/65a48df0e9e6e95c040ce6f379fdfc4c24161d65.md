# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo.spec.ts >> トップページ SEO検証
- Location: tests\seo.spec.ts:6:1

# Error details

```
Error: <title> is too short: 29 chars (min: 30). Current value: "Trim Studio | 東京都渋谷区のバーバーショップ"
```

```
Error: <meta name="description"> is too short: 67 chars (min: 70). Content: "東京都渋谷区のバーバーショップ「Trim Studio」。カット・シェービングを中心に、精確な技術で一人ひとりのスタイルを仕上げます。"
```

```
Error: Missing or empty required OGP tags: <meta property="og:image">
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "TRIM STUDIO" [ref=e5] [cursor=pointer]:
        - /url: /
      - navigation "メインナビゲーション" [ref=e6]:
        - link "Top" [ref=e7] [cursor=pointer]:
          - /url: /
        - link "Menu" [ref=e8] [cursor=pointer]:
          - /url: /menu
        - link "Blog" [ref=e9] [cursor=pointer]:
          - /url: /blog
        - link "Access" [ref=e10] [cursor=pointer]:
          - /url: /access
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: /contact
      - link "Book Now" [ref=e12] [cursor=pointer]:
        - /url: /contact
  - main [ref=e13]:
    - generic [ref=e14]:
      - generic: BARBER
      - generic [ref=e18]: Est. 2018
      - generic [ref=e21]:
        - generic [ref=e22]:
          - paragraph [ref=e23]: Precision Barbering · Est. 2018
          - heading "Trim Studio" [level=1] [ref=e24]:
            - text: Trim
            - emphasis [ref=e25]: Studio
          - paragraph [ref=e28]: Tokyo · Shibuya · Since 2018
          - paragraph [ref=e29]:
            - text: ひとりひとりの個性に向き合い、
            - text: 細部まで丁寧に仕上げるバーバーショップ。
          - generic [ref=e30]:
            - link "View Menu" [ref=e31] [cursor=pointer]:
              - /url: /menu
            - link "Book Now" [ref=e32] [cursor=pointer]:
              - /url: /contact
        - generic [ref=e34]:
          - img "バーバーの職人技" [ref=e36]
          - generic [ref=e38]:
            - paragraph [ref=e39]: 7+
            - paragraph [ref=e40]: Years
      - generic:
        - generic: Scroll
    - generic [ref=e43]:
      - generic [ref=e44]:
        - img [ref=e46]
        - generic [ref=e49]:
          - paragraph [ref=e50]: Access
          - paragraph [ref=e51]: 渋谷駅より徒歩5分
      - generic [ref=e52]:
        - img [ref=e54]
        - generic [ref=e57]:
          - paragraph [ref=e58]: Hours
          - paragraph [ref=e59]: 火〜金 10:00–20:00 / 土日 10:00–19:00
      - generic [ref=e60]:
        - img [ref=e62]
        - generic [ref=e65]:
          - paragraph [ref=e66]: Closed
          - paragraph [ref=e67]: 月曜日 / 第1火曜日
    - generic [ref=e68]:
      - generic: CRAFT
      - generic [ref=e70]:
        - generic [ref=e72]:
          - img "クラシックバーバー" [ref=e74]
          - img "バーバーツール" [ref=e76]
          - img "シェービング" [ref=e78]
        - generic [ref=e80]:
          - generic [ref=e82]: About
          - generic [ref=e84]: About Us
          - heading "理容の本質を、 ひとつひとつに。" [level=2] [ref=e85]:
            - text: 理容の本質を、
            - text: ひとつひとつに。
          - generic [ref=e87]:
            - paragraph [ref=e88]: Trim Studioは、「整える」という行為を通じてお客様の日常をより豊かにすることを目指すバーバーショップです。
            - paragraph [ref=e89]: ハサミ一本、カミソリ一刀に精確さと誠実さを込めて、あなたらしいスタイルを丁寧に仕上げます。骨格・髪質・生活スタイルを考慮した提案を心がけています。
            - paragraph [ref=e90]: 清潔で落ち着いた空間で、リラックスしながらお任せください。
          - link "Our Services" [ref=e92] [cursor=pointer]:
            - /url: /menu
    - generic [ref=e93]:
      - generic: TRIM
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e97]: Our Philosophy
          - generic [ref=e98]: “
          - blockquote [ref=e99]:
            - text: A good haircut is not just
            - text: about appearance—
            - text: it's about how you feel.
          - generic [ref=e102]: Trim Studio
        - generic [ref=e104]:
          - generic [ref=e105]:
            - generic [ref=e106]: "01"
            - generic [ref=e107]:
              - heading "精確な技術" [level=3] [ref=e108]
              - paragraph [ref=e109]: 長年の経験と継続的な学習から生まれた、確かなカット技術。
          - generic [ref=e110]:
            - generic [ref=e111]: "02"
            - generic [ref=e112]:
              - heading "丁寧な接客" [level=3] [ref=e113]
              - paragraph [ref=e114]: カウンセリングを大切にし、お客様の理想を丁寧に引き出します。
          - generic [ref=e115]:
            - generic [ref=e116]: "03"
            - generic [ref=e117]:
              - heading "清潔な環境" [level=3] [ref=e118]
              - paragraph [ref=e119]: 器具の消毒・衛生管理を徹底した、安心できる空間を提供します。
    - generic [ref=e121]:
      - generic [ref=e122]:
        - generic [ref=e123]:
          - generic [ref=e124]: Services
          - heading "主なメニュー" [level=2] [ref=e125]
        - link "Full Menu" [ref=e126] [cursor=pointer]:
          - /url: /menu
          - text: Full Menu
          - img [ref=e127]
      - generic [ref=e129]:
        - generic [ref=e130]:
          - img "カット" [ref=e131]
          - generic [ref=e132]:
            - generic [ref=e133]: Featured
            - paragraph [ref=e134]: カット
            - paragraph [ref=e135]: ¥4,000
            - paragraph [ref=e136]: 骨格・髪質に合わせた丁寧なカット。カウンセリングで最適なスタイルをご提案します。
            - link "詳しく見る" [ref=e137] [cursor=pointer]:
              - /url: /menu#cut
        - generic [ref=e138]:
          - generic [ref=e139]:
            - img "シェービング" [ref=e141]
            - generic [ref=e142]:
              - paragraph [ref=e143]: シェービング
              - paragraph [ref=e144]: ¥2,500
              - paragraph [ref=e145]: 伝統技法によるクリーンな仕上がり。
          - generic [ref=e146]:
            - generic [ref=e147]:
              - paragraph [ref=e148]: カット + シェービング
              - paragraph [ref=e149]: ¥6,000
              - paragraph [ref=e150]: トータルケアで洗練されたスタイルに。
            - link "予約する" [ref=e151] [cursor=pointer]:
              - /url: /contact
    - generic [ref=e153]:
      - generic [ref=e154]:
        - generic [ref=e155]:
          - generic [ref=e156]: From the Blog
          - heading "最新の記事" [level=2] [ref=e157]
        - link "All Posts" [ref=e158] [cursor=pointer]:
          - /url: /blog
          - text: All Posts
          - img [ref=e159]
      - link "2026/03/03 似合う髪型の見つけ方——顔の形から考える Read More" [ref=e162] [cursor=pointer]:
        - /url: /blog/fza44q97r
        - img [ref=e164]
        - generic [ref=e168]:
          - time [ref=e170]: 2026/03/03
          - heading "似合う髪型の見つけ方——顔の形から考える" [level=3] [ref=e171]
          - generic [ref=e172]:
            - text: Read More
            - img [ref=e173]
    - generic [ref=e175]:
      - generic: BOOK
      - generic [ref=e178]:
        - generic [ref=e179]: Reservation
        - heading "ご予約・ お問い合わせ" [level=2] [ref=e180]
        - paragraph [ref=e182]: お電話またはフォームよりお気軽にどうぞ
        - generic [ref=e183]:
          - link "03-0000-0000" [ref=e184] [cursor=pointer]:
            - /url: tel:0300000000
            - img [ref=e185]
            - text: 03-0000-0000
          - link "Contact Form" [ref=e187] [cursor=pointer]:
            - /url: /contact
  - contentinfo [ref=e188]:
    - generic [ref=e190]:
      - generic [ref=e191]:
        - generic [ref=e192]:
          - paragraph [ref=e193]: TRIM STUDIO
          - paragraph [ref=e194]: Precision Barbering · Est. 2018
          - generic [ref=e196]:
            - paragraph [ref=e197]: 〒150-0001
            - paragraph [ref=e198]: 東京都渋谷区神宮前1丁目1-1
            - paragraph [ref=e199]:
              - link "TEL 03-0000-0000" [ref=e200] [cursor=pointer]:
                - /url: tel:0300000000
            - paragraph [ref=e201]: 火 〜 金 10:00 – 20:00
            - paragraph [ref=e202]: 土 ・ 日 10:00 – 19:00
            - paragraph [ref=e203]: 定休日：月曜日 / 第1火曜日
        - generic [ref=e204]:
          - paragraph [ref=e205]: Navigation
          - list [ref=e206]:
            - listitem [ref=e207]:
              - link "Top" [ref=e208] [cursor=pointer]:
                - /url: /
                - text: Top
            - listitem [ref=e210]:
              - link "Menu" [ref=e211] [cursor=pointer]:
                - /url: /menu
                - text: Menu
            - listitem [ref=e213]:
              - link "Blog" [ref=e214] [cursor=pointer]:
                - /url: /blog
                - text: Blog
            - listitem [ref=e216]:
              - link "Access" [ref=e217] [cursor=pointer]:
                - /url: /access
                - text: Access
            - listitem [ref=e219]:
              - link "Contact" [ref=e220] [cursor=pointer]:
                - /url: /contact
                - text: Contact
        - generic [ref=e222]:
          - paragraph [ref=e223]: Follow Us
          - link "Instagram" [ref=e224] [cursor=pointer]:
            - /url: https://www.instagram.com/
            - img [ref=e226]
            - text: "@trimstudio"
          - link "Book Now" [ref=e229] [cursor=pointer]:
            - /url: /contact
      - generic [ref=e230]:
        - paragraph [ref=e231]: © 2026 Trim Studio. All rights reserved.
        - paragraph [ref=e232]: Precision Barbering · Tokyo
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { extendExpect } from '@seo-guardian/core';
  3  | 
  4  | extendExpect(expect);
  5  | 
  6  | test('トップページ SEO検証', async ({ page }) => {
  7  |   await page.goto('/');
  8  | 
  9  |   await expect.soft(page).toHaveSeoTitle({ minLength: 30, maxLength: 60 });
  10 |   await expect.soft(page).toHaveSeoDescription({ minLength: 70, maxLength: 160 });
  11 |   await expect.soft(page).toHaveSingleH1();
  12 |   await expect.soft(page).toHaveCanonical();
  13 |   await expect.soft(page).toHaveNoNoindex();
  14 |   await expect.soft(page).toHaveLangAttribute();
> 15 |   await expect.soft(page).toHaveRequiredOgTags();
     |                           ^ Error: Missing or empty required OGP tags: <meta property="og:image">
  16 |   await expect.soft(page).toHaveValidImgAlts();
  17 | });
```