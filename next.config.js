const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error', 'info', 'warn'],
    },
  },
  experimental: {
    serverComponentsExternalPackages: [
      // remove when the wrapper is removed
      'wrap-react-dom-server',

      'mjml',
      'snoowrap',
      'discord.js',
      'mailgun.js',
    ],
  },
};

module.exports = withPWA(nextConfig);
