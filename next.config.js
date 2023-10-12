/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/wordlnt",
        destination: "https://wordlnt.benjaminkitson.com",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
