/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Enable gzip/brotli compression for JS, CSS and HTML
  compress: true,
  // Remove the X-Powered-By: Next.js response header (minor security + bandwidth)
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: false,
    dangerouslyAllowSVG: true,
},
};

export default nextConfig;
