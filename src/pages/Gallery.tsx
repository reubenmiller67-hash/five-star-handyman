import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { db } from '../firebase'

type PhotoCategory = 'Bathroom' | 'Deck' | 'Window' | 'Other'
type GalleryFilter = 'All' | PhotoCategory

type PhotoDoc = {
  id: string
  url: string
  caption: string
  category: PhotoCategory
}

const filters: GalleryFilter[] = ['All', 'Bathroom', 'Deck', 'Window', 'Other']

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-4 py-2 text-sm font-bold transition',
        active
          ? 'bg-brand-green text-brand-black'
          : 'border border-brand-grayLt bg-brand-black text-brand-white hover:border-brand-green/60 hover:text-brand-green',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function Gallery() {
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState<PhotoDoc[]>([])
  const [filter, setFilter] = useState<GalleryFilter>('All')
  const [lightbox, setLightbox] = useState<PhotoDoc | null>(null)

  useEffect(() => {
    let alive = true
    async function run() {
      setLoading(true)
      const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'))
      const snaps = await getDocs(q)
      const next = snaps.docs.map((d) => {
        const data = d.data() as Partial<PhotoDoc>
        return {
          id: d.id,
          url: data.url ?? '',
          caption: data.caption ?? '',
          category: (data.category as PhotoCategory) ?? 'Other',
        }
      })
      if (!alive) return
      setPhotos(next)
      setLoading(false)
    }
    void run()
    return () => {
      alive = false
    }
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return photos
    return photos.filter((p) => p.category === filter)
  }, [photos, filter])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null)
    }
    if (!lightbox) return
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 lg:px-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-white md:text-5xl">Gallery</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-white/70">
          Recent projects and finished work.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </FilterButton>
        ))}
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-10 text-center text-brand-white/70">
            Loading…
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-10 text-center text-brand-white/80">
            Gallery coming soon — projects will appear here as Tim completes them.
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-10 text-center text-brand-white/70">
            No photos in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setLightbox(p)}
                className="group relative aspect-square overflow-hidden rounded-lg border border-brand-grayLt bg-brand-gray text-left"
              >
                <img
                  src={p.url}
                  alt={p.caption || p.category}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-brand-black/65 p-3">
                  <p className="truncate text-sm font-bold text-brand-white">
                    {p.caption?.trim() ? p.caption : p.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-xl border border-brand-grayLt bg-brand-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-brand-grayLt px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-brand-white">
                  {lightbox.caption?.trim() ? lightbox.caption : lightbox.category}
                </p>
                <p className="text-xs text-brand-white/60">{lightbox.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded border border-brand-grayLt bg-brand-black px-3 py-1.5 text-sm font-bold text-brand-white hover:border-brand-green/60 hover:text-brand-green"
              >
                Close
              </button>
            </div>
            <div className="bg-brand-black">
              <img src={lightbox.url} alt="" className="block h-auto w-full max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

