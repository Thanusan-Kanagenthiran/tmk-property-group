/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
