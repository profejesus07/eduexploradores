import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }] },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
