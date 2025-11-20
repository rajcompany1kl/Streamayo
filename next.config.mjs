/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
      ,
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      }
    ],
     domains: ['res.cloudinary.com'], // allow Cloudinary
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;