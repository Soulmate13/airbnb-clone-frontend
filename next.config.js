/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
