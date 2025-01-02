/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mahtgaekplano.com',
        port: '',
        pathname: '/wp-content/uploads/2020/05/**',
      },
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        port: "",
        pathname: "/EAFqNrAJpQs/1/0/1600w/**",
      },
      {
        protocol: 'https',
        hostname: 'morueats.com',
        port: '',
        pathname: '/cdn/shop/products/**',
      },
      {
        protocol: 'https',
        hostname: 'wimg.mk.co.kr',
        port: '',
        pathname: '/news/cms/202409/27/**',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        port: '',
        pathname: '/d/**',
      },
      {
        protocol: 'https',
        hostname: 'freepnglogo.com',
        port: '',
        pathname: '/images/all_img/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.svgator.com',
        port: '',
        pathname: '/images/2024/04/**',
      },
      {
        protocol: 'https',
        hostname: 'logos-download.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
};

export default nextConfig;
