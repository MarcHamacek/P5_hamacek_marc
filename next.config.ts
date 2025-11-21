import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
  },
  allowedDevOrigins: ['192.168.1.191', '192.168.125.38'],
};

export default nextConfig;
