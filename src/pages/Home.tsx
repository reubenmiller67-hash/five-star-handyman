import { motion } from 'framer-motion'
import { Award, DollarSign, Home as HomeIcon, MapPin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const phoneHref = 'tel:+12696896102'

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const

const towns = [
  'Colon',
  'Sturgis',
  'Three Rivers',
  'Centreville',
  'Mendon',
  'Kalamazoo',
  'Battle Creek',
  'Coldwater',
] as const

const services = [
  {
    title: 'Bathroom Remodels',
    desc: 'Full remodels and refreshes — tubs, showers, tile, vanities, floors.',
    slug: 'bathroom-remodels',
    image:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    title: 'Deck Building',
    desc: "New deck builds, repairs, and refinishing that'll last years.",
    slug: 'deck-building',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    title: 'Window Replacement',
    desc: 'Old drafty windows out, energy-efficient ones in.',
    slug: 'window-replacement',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'General Handyman',
    desc: 'Doors, drywall, faucets, shelves, caulking — your whole to-do list.',
    slug: 'general-handyman',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  },
] as const

const galleryTiles = [
  {
    label: 'Bathroom',
    image:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    label: 'Deck',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    label: 'Windows',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    label: 'Kitchen',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    label: 'Tile',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  },
  {
    label: 'Handyman',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  },
] as const

const testimonials = [
  {
    quote:
      "Tim remodeled our master bathroom last spring. Honest quote, clean work, done on time. Exactly what he said he'd do.",
    name: 'Sarah M.',
    town: 'Sturgis',
  },
  {
    quote:
      "Built us a beautiful deck and even came back to fix a small issue for free. You don't find that kind of service anymore.",
    name: 'Dave R.',
    town: 'Three Rivers',
  },
  {
    quote:
      'Great Christian man who does excellent work. Replaced 6 windows in our home and the difference is amazing.',
    name: 'Linda K.',
    town: 'Colon',
  },
] as const

const trustItems = [
  { icon: HomeIcon, label: 'Locally Owned' },
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Award, label: '12+ Years Experience' },
  { icon: DollarSign, label: 'Free Estimates' },
] as const

export function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* 1. Hero */}
      <motion.section
        className="relative flex min-h-[80vh] items-center overflow-hidden bg-brand-black"
        {...sectionReveal}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140,198,63,0.14) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16">
          <div className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:gap-12">
            <div className="order-2 flex-1 md:order-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">
                Colon, Michigan
              </p>
              <h1 className="mt-3 bg-gradient-to-r from-brand-white to-brand-green/80 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Serving Him by serving your home.
              </h1>
              <p className="mt-4 text-lg text-brand-white/80 md:text-xl">
                Bathroom remodels, decks, windows, and the 100 little jobs on your list. Proudly
                serving Southwest Michigan with 12+ years of construction experience.
              </p>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded bg-brand-green px-6 py-4 text-center text-lg font-bold text-brand-black transition hover:scale-[1.02] hover:bg-brand-greenDk"
                >
                  Call (269) 689-6102
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded border-2 border-brand-white px-6 py-4 text-center text-lg font-bold text-brand-white transition hover:scale-[1.02] hover:bg-brand-white hover:text-brand-black"
                >
                  Get a Free Estimate
                </Link>
              </div>
            </div>
            <div className="relative order-1 w-full self-start md:order-2 md:max-w-xl">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative inline-block max-w-full overflow-hidden rounded-2xl ring-1 ring-brand-green/30">
                <img
                  src="/tim-portrait.png"
                  alt="Tim, Owner of 5-Star Handyman"
                  className="block h-auto w-full max-h-[600px] object-contain rounded-2xl shadow-2xl shadow-brand-green/20"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Trust strip */}
      <motion.section className="relative bg-brand-gray py-8" {...sectionReveal}>
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 md:flex-row md:items-center md:justify-around md:gap-6 md:px-8 lg:px-16">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-brand-white transition hover:translate-y-[-2px]"
            >
              <span className="rounded-full bg-brand-green/10 p-2 text-brand-green">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-medium tracking-tight">{label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Services grid */}
      <motion.section className="bg-brand-black py-20" {...sectionReveal}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-white md:text-4xl">
            What I Do
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-brand-white/70">
            Big projects. Small fixes. And everything in between.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-brand-gray/50 bg-brand-gray transition-all duration-300 hover:scale-105 hover:border-brand-green/40 hover:shadow-xl hover:shadow-brand-green/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  {/* TODO: REPLACE WITH REAL PHOTO OF TIM'S WORK */}
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-brand-white">{s.title}</h3>
                  <p className="mt-2 flex-1 text-brand-white/70">{s.desc}</p>
                  <Link
                    to={`/services#${s.slug}`}
                    className="mt-4 inline-flex items-center font-semibold text-brand-green transition hover:gap-1"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Recent projects */}
      <motion.section className="bg-brand-black py-20" {...sectionReveal}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="text-center text-3xl font-bold text-brand-white md:text-4xl">Recent Work</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-brand-white/70">
            A few projects from around Southwest Michigan.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryTiles.map((tile) => (
              <div
                key={tile.label}
                className="group relative aspect-square overflow-hidden rounded-lg bg-brand-gray"
              >
                {/* TODO: REPLACE WITH REAL PHOTO OF TIM'S WORK (per tile) */}
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-black/0 transition group-hover:bg-brand-black/65">
                  <span className="text-lg font-bold text-brand-white opacity-0 transition group-hover:opacity-100">
                    {tile.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/gallery"
              className="rounded border-2 border-brand-green px-6 py-3 font-bold text-brand-green transition hover:bg-brand-green hover:text-brand-black"
            >
              See More Projects →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 5. About teaser */}
      <motion.section className="bg-brand-black py-20" {...sectionReveal}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-8 lg:px-16">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <img
                src="/tim-portrait.png"
                alt="Tim, Owner of 5-Star Handyman"
                className="h-auto w-full max-h-[600px] object-contain rounded-2xl shadow-2xl shadow-brand-green/20 ring-1 ring-brand-green/25"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center border-l-4 border-brand-green py-2 pl-6 md:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">Meet Tim</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-white md:text-4xl">
              Your neighbor with a hammer.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              Hi, I&apos;m Tim. I&apos;ve been fixing up homes across Southwest Michigan with 12+ years of
              construction experience.
              From full bathroom remodels to hanging a shelf straight — I treat every job with the
              same care I&apos;d give my own home.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              I&apos;m a Christian, a neighbor, and a handyman. My goal is simple: serve God by doing
              honest work at fair prices, and treating your home the way I&apos;d want mine treated.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex w-fit items-center rounded border-2 border-brand-green px-6 py-3 font-bold text-brand-green transition hover:bg-brand-green hover:text-brand-black"
            >
              More About Me →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 6. Testimonials — TODO: REPLACE WITH REAL REVIEWS */}
      <motion.section className="bg-brand-gray py-20" {...sectionReveal}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="text-center text-3xl font-bold text-brand-white md:text-4xl">
            What Folks Are Saying
          </h2>
          <p className="mt-2 text-center text-brand-white/70">Real reviews from real neighbors.</p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-brand-green/20 bg-brand-black p-6 shadow-lg transition hover:border-brand-green/50"
              >
                <div className="text-brand-green" aria-label="5 stars">
                  {'⭐'.repeat(5)}
                </div>
                <p className="mt-4 italic leading-relaxed text-brand-white/90">&ldquo;{t.quote}&rdquo;</p>
                <hr className="my-5 border-brand-grayLt" />
                <p className="font-bold text-brand-green">
                  {t.name}, {t.town}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm italic text-brand-white/60">
            Verified reviews from my customers on Angi
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://www.angi.com/companylist/us/mi/colon/five-star-handyman%2C-llc-reviews-10652950.htm#reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border-2 border-brand-green px-6 py-3 font-bold text-brand-green transition hover:bg-brand-green hover:text-brand-black mt-10"
            >
              See All Reviews on Angi →
            </a>
          </div>
        </div>
      </motion.section>

      {/* 7. Service area */}
      <motion.section
        className="relative overflow-hidden bg-brand-gray py-20"
        {...sectionReveal}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(140,198,63,0.08), transparent 70%), radial-gradient(circle at 20% 80%, rgba(31,31,31,0.5), transparent 45%)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="text-center text-3xl font-bold text-brand-white md:text-4xl">
            Proudly Serving Southwest Michigan
          </h2>
          <p className="mt-2 text-center text-brand-white/70">
            Based in Colon. Available within about an hour.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {towns.map((town) => (
              <span
                key={town}
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-black px-4 py-2 text-sm text-brand-white transition hover:border-brand-green"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
                {town}
              </span>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-brand-white/60">
            Not sure if I cover your area? Just call — (269) 689-6102
          </p>
        </div>
      </motion.section>

      {/* 8. Final CTA */}
      <motion.section className="relative overflow-hidden bg-brand-green py-20" {...sectionReveal}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="home-cta-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-brand-black" />
            </pattern>
            <pattern id="home-cta-stripes" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M0 24 L24 0 M-6 6 L6 -6 M18 30 L30 18"
                stroke="currentColor"
                strokeWidth="1"
                className="text-brand-black"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#home-cta-dots)" />
          <rect width="100%" height="100%" fill="url(#home-cta-stripes)" opacity="0.5" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-brand-black md:text-5xl">
            Got a project? Let&apos;s talk.
          </h2>
          <p className="mt-3 text-lg text-brand-black/80">Free estimates. Honest answers. No pressure.</p>
          <a
            href={phoneHref}
            className="mt-8 inline-flex items-center justify-center rounded bg-brand-black px-8 py-5 text-xl font-bold text-brand-white transition hover:scale-105 hover:bg-brand-grayLt"
          >
            📞 Call Tim: (269) 689-6102
          </a>
          <p className="mt-6 text-sm font-medium text-brand-black/75">
            Available Mon-Sat • Free estimates • Fully insured
          </p>
        </div>
      </motion.section>
    </motion.div>
  )
}
