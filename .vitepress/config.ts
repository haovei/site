import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';
import { compression } from 'vite-plugin-compression2';
import imagemin from 'unplugin-imagemin/vite';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Henry Site',
    description: 'Henry site, 记录学习、生活、工作中技术相关的一些事',
    lastUpdated: true,
    cleanUrls: true,
    srcDir: 'docs',
    outDir: 'dist',
    vite: {
        plugins: [
            compression({
                include: /\.(html|xml|css|json|js|mjs|woff2|svg)$/,
                algorithm: 'brotliCompress',
            }),
            imagemin({
                mode: 'squoosh',
                beforeBundle: true,
                compress: {
                    webp: {
                        quality: 90,
                    },
                },
                conversion: [
                    { from: 'png', to: 'webp' },
                    { from: 'jpg', to: 'webp' },
                ],
            }),
        ],
    },
    sitemap: {
        hostname: 'https://site.quteam.com',
    },
    markdown: {
        headers: {},
        externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
    },
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
        ],
        [
            'script',
            {
                async: '',
                src: 'https://www.googletagmanager.com/gtag/js?id=G-S00QCBQG59',
            },
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-S00QCBQG59');",
        ],
        // [
        //   'script',
        //   {
        //     async: true,
        //     crossorigin: 'anonymous',
        //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3811876010675991',
        //   },
        // ],
    ],
    themeConfig: {
        nav,
        sidebar,
        outlineTitle: '目录',
        outline: 'deep',
        editLink: {
            pattern: 'https://github.com/haovei/site/edit/main/docs/:path',
            text: '编辑页面',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/haovei/site' }],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2020-2024 Henry',
        },
        algolia: {
            appId: 'IMN8M7G4B1',
            apiKey: 'bb02b33592205ba83503042cb672fdd6',
            indexName: 'site',
        },
    },
});
