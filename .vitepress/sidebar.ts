export default {
    '/technology/front-end/': [
        {
            text: 'Web',
            collapsible: true,
            items: [
                {
                    text: 'Vite/Vitepress 图片优化',
                    link: '/technology/front-end/vite-image-optimization',
                },
                {
                    text: 'Bun 运行时的 EACCES 错误',
                    link: '/technology/front-end/bun-eacces',
                },
                {
                    text: '给 Vitepress 添加评论功能',
                    link: '/technology/front-end/vitepress-comment/',
                },
                {
                    text: 'H5 定位权限测试',
                    link: '/technology/front-end/h5-geo-test',
                },
                {
                    text: '用车导航线路乱窜',
                    link: '/technology/front-end/navigation-lines-messy/',
                },
            ],
        },
    ],
    '/technology/network/': [
        {
            text: 'Network',
            collapsible: true,
            items: [
                {
                    text: 'HTTP/3 QUIC 网络错误',
                    link: '/technology/network/http3-quic-error',
                },
                {
                    text: 'HTTP 的一些知识点梳理',
                    link: '/technology/network/http-questions',
                },
                {
                    text: 'VPN 分流',
                    link: '/technology/network/vpn-shunt',
                },
            ],
        },
    ],
    '/technology/devops/': [
        {
            text: 'Devops',
            collapsible: true,
            items: [
                {
                    text: 'Nginx Brotli 模块配置',
                    link: '/technology/devops/nginx-brotli-modules',
                },
                {
                    text: '轻量服务部署 Docker Swarm',
                    link: '/technology/devops/docker-swarm-deploy',
                },
            ],
        },
    ],
    '/apps/': [
        {
            text: 'App List',
            link: '/apps/',
            collapsible: true,
            items: [
                {
                    text: 'Take a Break',
                    link: '/apps/take-a-break/index.en',
                    items: [
                        {
                            text: 'English',
                            link: '/apps/take-a-break/index.en',
                        },
                        {
                            text: '中文',
                            link: '/apps/take-a-break/index.zh',
                        },
                    ],
                },
            ],
        },
    ],
    // '/accumulation/': [
    //     {
    //         text: '学习积累',
    //         items: [
    //             {
    //                 text: '代码质量评价标准',
    //                 link: '/accumulation/code-quality-standard',
    //             },
    //             {
    //                 text: '好代码与坏代码',
    //                 link: '/accumulation/good-bad-code',
    //             },
    //             {
    //                 text: '前端技术架构与工程',
    //                 link: '/accumulation/front-end-architecture',
    //             },
    //             {
    //                 text: '架构师职责',
    //                 link: '/accumulation/front-end-architect',
    //             },
    //         ],
    //     },
    // ],
};
