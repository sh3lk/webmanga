// const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "webmanga.net",
      "server.webmanga.net",
      "4eghcyenklxck7ngt67jc24jzm0jzzbf.lambda-url.eu-north-1.on.aws",
      "localhost",
      process.env.AWS_S3
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
          ],
          source: '/',
          destination: '/hosts/:host',
        },
        {
          has: [
            {
              type: 'host',
              value: '(?<host>.*)',
            },
          ],
          source: '/catalog',
          destination: '/hosts/:host/catalog',
        },
      ]
    }
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
