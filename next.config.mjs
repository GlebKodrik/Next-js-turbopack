
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        cssChunking: 'strict',
    },
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: '/api/pro/ru/block/:path*',
                destination: '/api/pro/app/block/:path*',
                permanent: true,
            },
            {
                source: '/pro/ru',
                destination: '/',
                permanent: true,
            },
            {
                source: '/pro/ru/:path*',
                destination: '/:path*',
                permanent: true
            },
            {
                source: '/course/for-managers',
                destination: '/courses',
                permanent: true
            },
            {
                source: '/course/for-sellers',
                destination: '/courses',
                permanent: true
            },
            {
                source: '/courses/for-managers',
                destination: '/courses',
                permanent: true
            },
            {
                source: '/wibes',
                destination: '/course/program/2vnuFwC47TdmtmFw4dEeolno7DB/2vo3XZaMSveMrEXdBHcQ8zjb84A',
                permanent: true
            },
            {
                source: '/catalog',
                destination: '/magazine',
                permanent: true
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/course/program',
                has: [
                    {
                        type: 'query',
                        key: 'unitId',
                        value: '(?<unitId>.*)',
                    },
                    {
                        type: 'query',
                        key: 'publicationId',
                        value: '(?<publicationId>.*)',
                    },
                ],
                destination: '/course/program/:unitId/:publicationId',
            },
            {
                source: '/lesson',
                has: [
                    {
                        type: 'query',
                        key: 'unit',
                        value: '(?<unitId>.*)',
                    },
                    {
                        type: 'query',
                        key: 'pub',
                        value: '(?<publicationId>.*)',
                    },
                ],
                destination: '/lesson/:unitId/:publicationId',
            },
            {
                source: '/watch',
                has: [
                    {
                        type: 'query',
                        key: 'videoId',
                        value: '(?<videoId>.*)',
                    },
                ],
                destination: '/watch/:videoId',
            },
            {
                source: '/insight',
                has: [
                    {
                        type: 'query',
                        key: 'id',
                        value: '(?<id>.*)',
                    },
                    {
                        type: 'query',
                        key: 'unit',
                        value: '(?<unit>.*)',
                    },
                ],
                destination: '/insight/:unit/:id',
            },
        ];
    },
    sassOptions: {
        additionalData: '@use "app/styles" as *;',
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )
        config.module.rules.push(
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: /react/,
                use: ['@svgr/webpack'],
            },
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /react/] },

            },
        )
        fileLoaderRule.exclude = /\.svg$/i
        return config
    },
}

export default nextConfig;