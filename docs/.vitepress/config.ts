import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Henry Site',
  description: 'Henry site, 记录学习、生活、工作的点点滴滴',
  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  markdown: {
    headers: {
      level: [0, 0],
    },
    externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  ],
  themeConfig: {
    nav,
    sidebar,

    outlineTitle: '大纲',

    editLink: {
      pattern: 'https://github.com/haovei/site/edit/main/docs/:path',
      text: '编辑页面',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/haovei/site' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-present Henry',
    },

    algolia: {
      appId: 'IMN8M7G4B1',
      apiKey: 'bb02b33592205ba83503042cb672fdd6',
      indexName: 'blog',
    },
  },
});
