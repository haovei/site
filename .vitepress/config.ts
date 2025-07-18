import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Henry Site',
    description: 'Henry site, 记录学习、生活、工作中技术相关的一些事',
    lastUpdated: true,
    cleanUrls: true,
    srcDir: 'docs',
    outDir: 'dist',
    router: {
        prefetchLinks: false
    },
    vite: {
        plugins: [
            imagetools({
                defaultDirectives: new URLSearchParams({
                    format: 'webp',
                    quality: '90',
                    fit: 'cover',
                }),
            }),
        ],
        server: {
            host: '0.0.0.0', // 允许从任何 IP 访问
            port: 5173, // 设置端口号
            strictPort: true, // 如果端口被占用则报错
            cors: true,
            allowedHosts: true,
        }
    },
    sitemap: {
        hostname: 'https://site.quteam.com',
    },
    markdown: {
        headers: {},
        externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
        image: {
            lazyLoading: true,
        },
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
            copyright: `Copyright © 2020-${new Date().getFullYear()} Henry`,
        },
        search: {
            provider: 'local'
        }
    },
});
