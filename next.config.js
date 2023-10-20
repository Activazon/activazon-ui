/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public/pwa",
  register: false,
  skipWaiting: true,
  // importScripts: ["/worker/index.js"],

  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = {};

module.exports = withPWA(nextConfig);
