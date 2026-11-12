
import {
  FiArrowUpRight,
  FiMapPin,
  FiUsers,
  FiShield,
  FiGlobe,
} from 'react-icons/fi'
import { useGoTo } from '../hooks'
import Reveal from './Reveal'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'

const PHILOSOPHIES = [
  {
    number: '01',
    icon: FiMapPin,
    title: 'Elite Software Quality, Main Street Heart',
    description:
      'We intentionally establish our engineering hubs in small towns because we know that tech genius isn’t limited to mega-cities or major tech corridors. By tapping into brilliant minds outside the typical crowded tech spaces, we aim to bring unmatched focus, dedication, and passion to your projects.',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Software engineers collaborating at laptops in a small-town innovation hub',
    accent: 'from-orange-500 to-rose-500',
    iconBg: 'bg-orange-100 text-orange-700',
  },
  {
    number: '02',
    icon: FiUsers,
    title: 'The Talent Incubator Engine',
    description:
      'We act as a unique talent incubator that aims to deliver global-quality engineering by leveraging fresh, ambitious minds. Through mentorship, hands-on experience, and continuous learning, we shape local capability into world-class development teams.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Mentor guiding young developers during hands-on learning',
    accent: 'from-sky-500 to-indigo-500',
    iconBg: 'bg-sky-100 text-sky-700',
  },
  {
    number: '03',
    icon: FiShield,
    title: 'Two Decades of Quality Guardrails',
    description:
      'Our engineering approach is guided by over 20 years of enterprise technology leadership. Every solution benefits from experienced technical oversight, thoughtful architecture, and quality-focused mentorship. You get the agility of emerging talent backed by mature engineering practices.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Professional enterprise technology and engineering hardware',
    accent: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-100 text-violet-700',
  },
]

export default function Portfolio() {
  const goTo = useGoTo()

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="container-x relative mx-auto max-w-7xl">

        {/* Section heading */}
        <Reveal>
          <div className="mb-12 max-w-4xl sm:mb-16">
            <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[11px]">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-sky-600"
              />
              Our Growth Philosophy
            </p>

            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-slate-950">
              Growing Across the{' '}
              <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
                Horizon.
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              We don’t believe in staying restricted within geographic
              boundaries. Our goal is to connect untapped opportunities
              with incredible talent, scaling our impact horizontally
              across industries and borders.
            </p>
          </div>
        </Reveal>

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PHILOSOPHIES.map((item, index) => {
            const Icon = item.icon

            return (
              <Reveal key={item.number} delay={index * 0.1}>
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.08] motion-reduce:transition-none motion-reduce:hover:translate-y-0">

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-60">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                    />

                    <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-slate-950/40 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-white backdrop-blur-md">
                      {item.number} / 03
                    </span>

                    <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/95 text-slate-950 shadow-lg backdrop-blur-md">
                      <Icon size={23} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${item.accent}`} />

                    <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.iconBg}`}>
                        <FiGlobe size={14} aria-hidden="true" />
                      </span>
                      Our approach
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${item.accent} transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none`}
                  />
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Closing CTA */}
        <Reveal delay={0.2}>
          <div
            className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 bg-cover bg-center px-6 py-9 text-white shadow-xl sm:mt-16 sm:px-10 sm:py-12"
            style={{
              backgroundImage: "url('/images/portfolio-vision-bg.png')",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-slate-950/35"
            />

            <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                  Our vision. Your opportunity.
                </p>

                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Great talent. Thoughtful engineering. Global possibilities.
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Have a challenge worth solving? Let’s explore how we can
                  turn your ideas into meaningful technology solutions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => goTo('contact')}
                className={`group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-lg ${FOCUS}`}
              >
                Let’s connect

                <FiArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
