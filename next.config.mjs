/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "localhost", "https://placehold.co"]
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
