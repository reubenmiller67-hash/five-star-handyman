import { motion } from 'framer-motion'
import { MapPin, CheckCircle2 } from 'lucide-react'
import { useForm, ValidationError } from '@formspree/react'

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

const projectTypes = [
  'Bathroom Remodel',
  'Deck Building',
  'Window Replacement',
  'General Handyman',
  'Other',
] as const

const inputClass =
  'w-full rounded border border-brand-gray bg-brand-gray p-3 text-brand-white placeholder:text-brand-muted/70 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30'

export function Contact() {
  const [state, handleSubmit] = useForm('mrerywbv')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.section className="relative overflow-hidden bg-brand-gray py-16" {...sectionReveal}>
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140,198,63,0.12) 1px, transparent 0)',
            backgroundSize: '34px 34px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-white md:text-5xl">
            Let&apos;s Talk
          </h1>
          <p className="mt-3 text-lg text-brand-white/70 md:text-xl">
            Call, email, or send a message. I answer fast.
          </p>
        </div>
      </motion.section>

      <motion.section className="bg-brand-black py-16" {...sectionReveal}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-white">
              Get in Touch
              <span className="mt-2 block h-1 w-16 rounded-full bg-brand-green" />
            </h3>
            <div className="space-y-4">
              <a
                href={phoneHref}
                className="block rounded-lg bg-brand-gray p-6 transition hover:ring-2 hover:ring-brand-green/40"
              >
                <div className="text-2xl" aria-hidden="true">
                  📞
                </div>
                <div className="mt-2 font-semibold text-brand-white">Phone</div>
                <p className="text-sm text-brand-white/70">Call or text anytime</p>
                <p className="mt-2 font-bold text-brand-green">(269) 689-6102</p>
              </a>
              <a
                href="mailto:fivestarhandyman23@gmail.com"
                className="block rounded-lg bg-brand-gray p-6 transition hover:ring-2 hover:ring-brand-green/40"
              >
                <div className="text-2xl" aria-hidden="true">
                  ✉️
                </div>
                <div className="mt-2 font-semibold text-brand-white">Email</div>
                <p className="text-sm text-brand-white/70">Response within 24 hours</p>
                <p className="mt-2 break-all font-bold text-brand-green">
                  fivestarhandyman23@gmail.com
                </p>
              </a>
              <div className="rounded-lg bg-brand-gray p-6">
                <div className="text-2xl" aria-hidden="true">
                  📍
                </div>
                <div className="mt-2 font-semibold text-brand-white">Service Area</div>
                <p className="text-sm text-brand-white/70">Based in Colon, MI</p>
                <p className="mt-2 text-brand-white/90">About 1 hour radius — Southwest Michigan</p>
              </div>
            </div>
            <div className="rounded-lg border border-brand-green/30 bg-brand-gray/50 p-5 text-brand-white/90">
              <p className="font-semibold text-brand-white">Hours</p>
              <p className="mt-1 text-sm">Mon–Fri: 7am–3pm</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-brand-white">
              Request a Free Estimate
              <span className="mt-2 block h-1 w-16 rounded-full bg-brand-green" />
            </h3>
            <div className="mt-6">
              {state.succeeded ? (
                <div className="rounded-lg bg-brand-gray p-8 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" aria-hidden="true" />
                  <h3 className="mt-4 text-2xl font-bold text-brand-white">Thanks — message received!</h3>
                  <p className="mt-3 text-brand-white/80">
                    I&apos;ll get back to you within 24 hours. For anything urgent, just call me directly at (269)
                    689-6102.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_subject" value="New 5-Star Handyman Inquiry" />
                  <div>
                    <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-brand-white">
                      Full Name <span className="text-brand-green">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-white">
                      Phone Number <span className="text-brand-green">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-white">
                      Email <span className="text-brand-green">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      autoComplete="email"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="town" className="mb-1 block text-sm font-medium text-brand-white">
                      Town / City <span className="text-brand-green">*</span>
                    </label>
                    <input id="town" name="town" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="mb-1 block text-sm font-medium text-brand-white">
                      Project Type <span className="text-brand-green">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className={`${inputClass} cursor-pointer`}
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-brand-gray text-brand-muted">
                        Select a project type
                      </option>
                      {projectTypes.map((opt) => (
                        <option key={opt} value={opt} className="bg-brand-gray">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-white">
                      Tell me about your project <span className="text-brand-green">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="What do you need done? Any details help — room sizes, timeline, budget range, etc."
                      className={inputClass}
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded bg-brand-green px-8 py-4 font-bold text-brand-black transition hover:bg-brand-greenDk disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.submitting ? 'Sending...' : 'Send Request'}
                  </button>
                  <p className="text-center text-xs text-brand-white/60">
                    I&apos;ll get back to you within 24 hours. No spam, no pressure.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-brand-black py-16" {...sectionReveal}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h3 className="text-center text-2xl font-bold text-brand-white md:text-3xl">
            Proudly Serving Southwest Michigan
          </h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {towns.map((town) => (
              <span
                key={town}
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-gray px-4 py-2 text-sm text-brand-white"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
                {town}
              </span>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-brand-white/60">
            Not sure if I cover your area? Just call — (269) 689-6102
          </p>
        </div>
      </motion.section>
    </motion.div>
  )
}
