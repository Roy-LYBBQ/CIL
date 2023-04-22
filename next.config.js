const REMOTE = 'https://typus.fun';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: REMOTE + '/api/:path*',
        },
      ],
    };
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
