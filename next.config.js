module.exports = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },

  crossOrigin: "anonymous",
  images: {
    domains: [
      "amazonaws.com",
      "ofu-bucket.s3.eu-west-2.amazonaws.com",
      "ofu-bucket.s3.eu-west-2.amazonaws.com",
      "https://www.youtube.com",
      "i.ytimg.com",
      "res.cloudinary.com",
      "connect.stripe.com",
      "https://checkout.stripe.com",
      "https://*.stripe.com",
    ],
    hostname: "ofu-bucket.s3.eu-west-2.amazonaws.com",
  },
}
