const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "en-US",
    localeDetection: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/admin/",
          destination: `https://activazon.herokuapp.com/admin/`,
        },
        {
          source: "/admin/:path*",
          destination: `https://activazon.herokuapp.com/admin/:path*`,
        },
      ],
    };
  },
};
