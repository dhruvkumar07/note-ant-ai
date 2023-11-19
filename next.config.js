/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['imgur.com','images.unsplash.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
