import { withPayload } from '@payloadcms/next/withPayload'
import fs from 'fs'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { dir }) => {
    // Ensure .next and .next/server contain {"type": "commonjs"} package.json
    // to resolve Node.js ERR_REQUIRE_ESM when Next's requirePage loads server bundles in ESM projects
    try {
      const nextDir = path.join(dir, '.next')
      const serverDir = path.join(nextDir, 'server')
      if (fs.existsSync(nextDir)) {
        fs.writeFileSync(
          path.join(nextDir, 'package.json'),
          JSON.stringify({ type: 'commonjs' }, null, 2)
        )
      }
      if (fs.existsSync(serverDir)) {
        fs.writeFileSync(
          path.join(serverDir, 'package.json'),
          JSON.stringify({ type: 'commonjs' }, null, 2)
        )
      }
    } catch {}
    return config
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
