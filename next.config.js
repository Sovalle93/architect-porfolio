/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // This is critical for Netlify
  images: {
    unoptimized: true,    // Helps with Cloudinary images
  },
}

module.exports = nextConfig
