/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'data',
        hostname: '*',
      },
    ],
  },
}

module.exports = nextConfig