const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "es-ES",
    localeDetection: true,
  },
};
