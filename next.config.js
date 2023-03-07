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

module.exports = withBundleAnalyzer(
  withPWA({
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
