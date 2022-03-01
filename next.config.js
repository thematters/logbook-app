/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  pageExtensions: ["tsx"],

  // i18n: {
  //   locales: ["en", "zh"],
  //   defaultLocale: "en",
  //   localeDetection: true,
  // },

  webpack(config, options) {

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true, dimensions: false, },
        },
        {
          loader: 'url-loader',
          options: {
            limit: 1024,
            publicPath: '/_next/static/',
            outputPath: `${options.isServer ? '../' : ''}static/`,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
