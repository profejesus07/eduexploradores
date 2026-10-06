import { withPayload } from '@payloadcms/next/withPayload'

// Exportación estática (GitHub Pages): STATIC_EXPORT=1 BASE_PATH=/nombre-del-repo
const isStatic = process.env.STATIC_EXPORT === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }], localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }], ...(isStatic && { unoptimized: true }) },
  ...(isStatic && { output: 'export', trailingSlash: true, basePath: process.env.BASE_PATH || '' }),
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
