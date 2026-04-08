import { defineSeoConfig } from '@seo-guardian/core';

export default defineSeoConfig({
  baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',

  rules: {
    'title-length':       { min: 30, max: 60, severity: 'error' },
    'description-length': { min: 70, max: 160, severity: 'error' },
    'h1-single':          'error',
    'canonical':          'error',
    'noindex':            'error',
    'lang':               'error',
    'og-required':        'error',
    'img-alt':            'error',
    'structured-data':    'warning',
  },

  pages: [
    // SPAはブラウザ描画後に検証（Full Mode）
    {
      path: '/',
      mode: 'full',
      waitFor: { type: 'selector', selector: 'meta[name="description"][content]' },
      rules: {
        'structured-data': { required: ['WebSite', 'Organization'] },
      },
    },
    // プレビューページは noindex を意図的に許可
    {
      path: '/preview/**',
      rules: { 'noindex': 'off' },
    },
  ],
});