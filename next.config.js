const path = require("path");

const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    image: "/offline.png",
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// prevent clickjacking: https://dev.to/theinfosecguy/how-to-protect-your-nextjs-website-from-clickjacking-2jbg
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'",
  },
];

module.exports = withBundleAnalyzer(
  withPWA({
    async headers() {
      return [
        {
          source: "/",
          headers: securityHeaders,
        },
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    i18n: {
      locales: ["en", "es"],
      defaultLocale: "es",
      localeDetection: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader",
      });

      return config;
    },
  })
);
