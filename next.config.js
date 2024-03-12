/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: 'mongodb+srv://ariqkharisma10:EpWpsrO05u8gO89s@cluster0.bl3cki2.mongodb.net/?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'df432ljkjdafj984u30fr'
  },
  trailingSlash: false,
}

module.exports = nextConfig