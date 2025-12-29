/** @type {import('next').NextConfig} */
const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
const backend = new URL(backendUrl);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backend.protocol.replace(':', ''),
        hostname: backend.hostname,
        port: backend.port || undefined,
        pathname: '/**', // Allow images from backend
      }
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // Route /api/* to the backend defined in BACKEND_URL (set on Vercel)
        source: '/api/:path*',
        destination: `${backend.origin}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;