/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgcdn.dev',
      },
      {
        protocol: 'https',
        hostname: 'i.imgcdn.dev',
      },
    ],
  },
}

export default nextConfig
