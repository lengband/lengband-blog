/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net', 'tailwindui.com', 'img0.baidu.com'],
  },
}

module.exports = nextConfig
