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
              <img
                src="/tim-portrait.png"
                alt="Tim, Owner of 5-Star Handyman"
                className="aspect-[4/5] w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">My Story</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-white md:text-4xl">
              Honest work for Southwest Michigan.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              My name is Tim, and I&apos;m the owner of 5-Star Handyman. With over 12 years of experience
              in construction, I&apos;ve spent much of my life building, repairing, and learning how to
              do things the right way.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              I come from an Anabaptist background, and my faith shapes how I approach my work. I
              believe in living out biblical values like honesty, humility, and serving others. The
              goal isn&apos;t just to complete a job, but to do it faithfully — working &ldquo;as unto the
              Lord&rdquo; in all things.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              Over the years, I&apos;ve developed a wide range of skills, but what matters most to me is
              being someone people can trust. I aim to show up when I say I will, communicate
              clearly, and do solid, dependable work without cutting corners.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-white/80">
              I&apos;m not perfect, but I do my best to treat every customer fairly and to stand behind
              the work I do.
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
