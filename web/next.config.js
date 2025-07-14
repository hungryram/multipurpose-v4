/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  webpack: (config) => {
    let modularizeImports = null
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports
        return modularizeImports
      })
    )
    return config
  },

  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {hostname: "cdn.sanity.io"},
      {hostname: "source.unsplash.com"},
      {hostname: "images.unsplash.com"},
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
