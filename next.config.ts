/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "swagger.quoril.space",
        port: "",
        pathname: "/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "swagger.quoril.space",
        port: "",
        pathname: "/**", // allow all paths over HTTPS too
      },
    ],
  },
};

module.exports = nextConfig;
