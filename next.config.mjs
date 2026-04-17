/** @type {import('next').NextConfig} */
const nextConfig = {
  // This disables the generation of default files
  generateEtags: false,
  // Custom webpack config to replace favicon
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Override the default favicon path
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/dist/client/image': 'next/dist/client/image',
      };
    }
    return config;
  },
  // Add custom headers
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;