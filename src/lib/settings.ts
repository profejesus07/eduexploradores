import { getPayloadClient } from '@/lib/payload'

export async function getSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}
