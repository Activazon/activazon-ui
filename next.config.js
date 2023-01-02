const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
    localeDetection: true,
  },
  async rewrites() {
    return [
      {
        source: "/bear.js",
        destination: "https://cdn.panelbear.com/analytics.js",
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};
