import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'

const phoneHref = 'tel:+12696896102'

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const

const blocks = [
  {
    key: 'bathroom',
    id: 'bathroom-remodels',
    eyebrow: 'Service 01',
    title: 'Bathroom Remodels',
    body: "Whether it's a full gut-and-replace or just a refresh, I handle bathroom projects from demo to details. Tile, plumbing fixtures, vanities, lighting, flooring — all done with care.",
    items: [
      'Full remodels & refreshes',
      'Tile work (floor & walls)',
      'Tub and shower installs',
      'Vanities & countertops',
      'Lighting & fixtures',
    ],
    image:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    key: 'deck',
    id: 'deck-building',
    eyebrow: 'Service 02',
    title: 'Deck Building',
    body: "Brand new decks, repairs on old ones, and refinishing that actually lasts. Pressure-treated, composite, or hardwood — I'll build what fits your yard and your budget.",
    items: [
      'New deck construction',
      'Deck repair & board replacement',
      'Staining & sealing',
      'Railing & stair work',
      'Custom sizes & shapes',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    key: 'window',
    id: 'window-replacement',
    eyebrow: 'Service 03',
    title: 'Window Replacement',
    body: "Old drafty windows cost you money every month. I'll pull the old, install energy-efficient replacements, and seal everything up tight.",
    items: [
      'Full window replacement',
      'Energy-efficient installs',
      'Storm window repair',
      'Frame & trim work',
      'Screen replacement',
    ],
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    key: 'handyman',
    id: 'general-handyman',
    eyebrow: 'Service 04',
    title: 'General Handyman',
    body: "The 100 little jobs on your list — I'll knock them out in one visit. Doors that won't close, drywall dings, leaky faucets, shelves that need hanging — that's my specialty.",
    items: [
      'Drywall repair & patching',
      'Door adjustment & installation',
      'Faucet & fixture replacement',
      'Shelving & furniture assembly',
      'Caulking & sealing',
    ],
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  },
] as const

export function Services() {
  const [servicePhotos, setServicePhotos] = useState<Record<string, string>>({})

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        const keys = ['bathroom', 'deck', 'window', 'handyman'] as const
        const snaps = await Promise.all(keys.map((key) => getDoc(doc(db, 'services', key))))
        const next: Record<string, string> = {}
        for (const snap of snaps) {
          const data = snap.data() as { photoUrl?: string } | undefined
          if (data?.photoUrl) next[snap.id] = data.photoUrl
        }
        if (!alive) return
        setServicePhotos(next)
      } catch {
        // Keep hardcoded fallbacks if Firestore is unavailable.
      }
    }
    void run()
    return () => {
      alive = false
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.section
        className="relative overflow-hidden bg-brand-gray py-20"
        {...sectionReveal}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140,198,63,0.12) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-white md:text-6xl">What I Do</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-brand-white/70">
            From full remodels to the 100 little jobs on your list.
          </p>
        </div>
      </motion.section>

      {blocks.map((block, index) => (
        <motion.section
          key={block.id}
          id={block.id}
          className="scroll-mt-24 bg-brand-black py-16"
          {...sectionReveal}
        >
          <div
            className={`mx-auto flex max-w-7xl flex-col gap-10 px-4 md:gap-12 md:px-8 lg:px-16 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            } md:items-center`}
          >
            <div className="flex-1">
              <div className="overflow-hidden rounded-xl shadow-xl shadow-brand-green/10 ring-1 ring-brand-green/20">
                {/* TODO: REPLACE WITH REAL PHOTO OF TIM'S WORK */}
                <img
                  src={servicePhotos[block.key] || block.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">
                {block.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-brand-white md:text-4xl">{block.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-white/80">{block.body}</p>
              <ul className="mt-6 space-y-3 text-brand-white/80">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex rounded bg-brand-green px-6 py-3 font-bold text-brand-black transition hover:bg-brand-greenDk hover:shadow-lg hover:shadow-brand-green/25"
              >
                Get a Quote →
              </Link>
            </div>
          </div>
        </motion.section>
      ))}

      <motion.section className="relative overflow-hidden bg-brand-green py-20" {...sectionReveal}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="svc-cta-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-brand-black" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-cta-dots)" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-brand-black md:text-5xl">Don&apos;t see your project?</h2>
          <p className="mt-4 text-lg text-brand-black/80">
            If it&apos;s in a home, I probably do it. Just call.
          </p>
          <a
            href={phoneHref}
            className="mt-8 inline-flex items-center justify-center rounded bg-brand-black px-8 py-5 text-xl font-bold text-brand-white transition hover:scale-105 hover:bg-brand-grayLt"
          >
            📞 Call Tim: (269) 689-6102
          </a>
        </div>
      </motion.section>
    </motion.div>
  )
}
