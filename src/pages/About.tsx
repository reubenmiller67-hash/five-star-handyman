import { motion } from 'framer-motion'

const phoneHref = 'tel:+12696896102'

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const

const values = [
  {
    emoji: '✝️',
    title: 'Faith-Driven',
    desc: 'Every job done to the glory of God.',
  },
  {
    emoji: '🤝',
    title: 'Honest Quotes',
    desc: 'Fair prices, no surprises, no upsells.',
  },
  {
    emoji: '🔨',
    title: 'Quality Work',
    desc: 'Done right the first time, guaranteed.',
  },
  {
    emoji: '🏡',
    title: 'Your Neighbor',
    desc: "I live here too. I'll treat your home like mine.",
  },
] as const

export function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.section
        className="relative overflow-hidden bg-brand-gray py-20"
        {...sectionReveal}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140,198,63,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-white md:text-6xl">Meet Tim</h1>
          <p className="mt-4 text-xl font-medium text-brand-green md:text-2xl">
            Christian. Family man. Handyman.
          </p>
        </div>
      </motion.section>

      <motion.section className="bg-brand-black py-20" {...sectionReveal}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center md:px-8 lg:px-16">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-brand-green/20 ring-1 ring-brand-green/30">
              {/* TODO: REPLACE WITH REAL PHOTO OF TIM'S WORK */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Tim"
                className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">My Story</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-white md:text-4xl">
              Honest work for Southwest Michigan.
            </h2>
            {/* TODO: TIM TO REWRITE IN HIS OWN WORDS */}
            <p className="mt-6 text-lg leading-relaxed text-brand-white/80">
              Hi, I&apos;m Tim. For the past 3 years I&apos;ve been running 5-Star Handyman out of Colon,
              Michigan, serving families and homeowners all across Southwest Michigan — from Sturgis to
              Kalamazoo to Battle Creek.
            </p>
            {/* TODO: TIM TO REWRITE IN HIS OWN WORDS */}
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              I believe work is worship. Every project — whether it&apos;s a full bathroom remodel or
              just hanging a shelf straight — deserves the same care, honesty, and craftsmanship.
              That&apos;s what &ldquo;Serving Him by serving your home&rdquo; means to me.
            </p>
            {/* TODO: TIM TO REWRITE IN HIS OWN WORDS */}
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              When I&apos;m not working, I&apos;m spending time with my family, at church, or around town.
              Colon isn&apos;t just where I live — it&apos;s where my neighbors live, and that&apos;s
              exactly how I treat every job.
            </p>
            <p className="mt-10 font-serif text-2xl italic text-brand-white md:text-3xl">— Tim</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="relative bg-brand-black py-20" {...sectionReveal}>
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140,198,63,0.06) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="text-center text-3xl font-bold text-brand-white md:text-4xl">How I Work</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-brand-gray/80 bg-brand-gray/40 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg hover:shadow-brand-green/10"
              >
                <div className="text-4xl" aria-hidden="true">
                  {v.emoji}
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-white">{v.title}</h3>
                <p className="mt-2 text-brand-white/75">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden bg-brand-green py-20" {...sectionReveal}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="about-cta-stripes" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 20 L20 0"
                stroke="currentColor"
                strokeWidth="1"
                className="text-brand-black"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-cta-stripes)" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-brand-black md:text-5xl">
            Let&apos;s get your project done right.
          </h2>
          <a
            href={phoneHref}
            className="mt-10 inline-flex items-center justify-center rounded bg-brand-black px-8 py-5 text-xl font-bold text-brand-white transition hover:scale-105 hover:bg-brand-grayLt"
          >
            📞 Call Tim: (269) 689-6102
          </a>
        </div>
      </motion.section>
    </motion.div>
  )
}
