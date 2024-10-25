/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'mahtgaekplano.com',
            port: '',
            pathname: '/wp-content/uploads/2020/05/**',
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
        ],
      },
};

export default nextConfig;
