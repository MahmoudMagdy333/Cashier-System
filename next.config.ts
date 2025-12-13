/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**", // Allow images from local backend
      }
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // This directs frontend calls like /api/products -> http://localhost:5000/api/products
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;