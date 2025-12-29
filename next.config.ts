/** @type {import('next').NextConfig} */
// Patch for deprecated util._extend used by older http-proxy bundled with Next
try {
  const util = require('util');
  if (util && typeof util._extend === 'function') {
    util._extend = Object.assign; // replace deprecated API with Object.assign
  }
} catch (e) {
  // If patching fails, we don't want to stop the dev server
  /* eslint-disable no-console */
  console.warn('util._extend patch failed', e);
}

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