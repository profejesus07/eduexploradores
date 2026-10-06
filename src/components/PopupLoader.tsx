import { mediaSrc } from '@/lib/media'
import PopupManager, { type PopupData } from '@/components/PopupManager'
import { getPayloadClient } from '@/lib/payload'

export default async function PopupLoader() {
  try {
    const payload = await getPayloadClient()
    const now = new Date().toISOString()
    const { docs } = await payload.find({
      collection: 'popups',
      depth: 1,
      limit: 5,
      overrideAccess: false,
      where: {
        and: [
          { active: { equals: true } },
          { or: [{ startAt: { exists: false } }, { startAt: { less_than_equal: now } }] },
          { or: [{ endAt: { exists: false } }, { endAt: { greater_than_equal: now } }] },
        ],
      },
    })
    const popups: PopupData[] = docs.map((d) => {
      const img = typeof d.image === 'object' ? d.image : null
      return {
        id: d.id,
        title: d.title,
        imageUrl: mediaSrc(img, 'card'),
        imageAlt: img?.alt,
        body: d.body,
        videoUrl: d.videoUrl,
        ctaLabel: d.ctaLabel,
        ctaUrl: d.ctaUrl,
        showOn: d.showOn ?? 'home',
        frequency: d.frequency ?? 'session',
        delaySeconds: d.delaySeconds ?? 2,
      }
    })
    return popups.length ? <PopupManager popups={popups} /> : null
  } catch {
    return null
  }
}
