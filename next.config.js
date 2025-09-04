/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // hostname:"pstripe.onrender.com",
        hostname: "res.cloudinary.com",
      },
      {
        // hostname:"pstripe.onrender.com",
        hostname: "localhost",
      },
   
         {
        hostname: "priscillaserver.onrender.com",
      },
        {
          protocol: 'https',
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig
