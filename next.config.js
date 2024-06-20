/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "kadinle.com",
      "66.29.142.115",
      "media.kadinle.com",
      "lh3.googleusercontent.com",
      "png.pngtree.com",
      "203.161.50.110",
      "*",
    ],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  staticPageGenerationTimeout: 240, // Adjust the timeout as needed
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.js"
);

module.exports = withNextIntl(nextConfig);
