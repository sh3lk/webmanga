// const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "webmanga.net",
      "server.webmanga.net",
      "4eghcyenklxck7ngt67jc24jzm0jzzbf.lambda-url.eu-north-1.on.aws",
      "localhost"
    ],
  }
}

// module.exports = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   }
// })
