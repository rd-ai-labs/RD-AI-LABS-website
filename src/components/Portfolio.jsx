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
    title: 'Elite Software Quality, Local Heart',
    footer: 'REGIONAL HUBS',
    description:
      "We intentionally build our engineering hubs in emerging towns because tech talent isn't limited to mega-cities or crowded tech corridors. By tapping into driven minds outside traditional hubs, we bring unmatched focus, dedication, and passion to your projects.",
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Small team of engineers collaborating around laptops in a bright, welcoming workspace',
    accent: 'from-orange-500 to-rose-500',
    iconBg: 'bg-orange-100 text-orange-700',
  },
  {
    number: '02',
    icon: FiUsers,
    title: 'The Talent Incubator Engine',
    footer: 'TALENT GROWTH',
    description:
      'Our talent incubator delivers world-class engineering by empowering fresh, ambitious minds. Through mentorship, hands-on experience, and continuous learning, we shape regional capability into high-performing development teams.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Young learners studying together through hands-on mentorship',
    accent: 'from-sky-500 to-indigo-500',
    iconBg: 'bg-sky-100 text-sky-700',
  },
  {
    number: '03',
    icon: FiShield,
    title: 'Two Decades of Quality Guardrails',
    footer: 'PROVEN STANDARDS',
    description:
      'Our engineering approach is guided by 20+ years of enterprise technology leadership. Every solution benefits from experienced technical oversight, thoughtful architecture, and disciplined mentorship—giving you the agility of emerging talent backed by mature engineering standards.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Digital padlock on a circuit board representing enterprise security and engineering quality',
    accent: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-100 text-violet-700',
  },
]

export default function Portfolio() {
  const goTo = useGoTo()

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-11"
    >
      <div className="container-x relative mx-auto max-w-7xl">

        {/* Section heading (Hero style) */}
        <Reveal>
          <div className="mb-12 max-w-4xl sm:mb-16">
            <p className="mb-4 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800 sm:text-[11px]">
              <span aria-hidden="true" className="h-px w-8 bg-violet-700/70" />
              Our Growth Philosophy
            </p>

            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.3] tracking-[-0.045em] text-slate-950 [text-wrap:balance]">
              Growing Across the{' '}
              <span className="bg-gradient-to-r from-[#ff6a2b] via-[#ec4899] to-[#a43fe0] bg-clip-text text-transparent">
                Horizon.
              </span>
            </h2>

            <p className="mt-6 max-w-[540px] text-[12px] leading-[1.75] text-slate-700 sm:text-[13px] sm:leading-[1.8]">
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

                  <div
                    className={`relative h-56 overflow-hidden bg-gradient-to-br ${item.accent} sm:h-60`}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
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

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${item.accent}`} />

                    <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.03em] text-slate-950 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 flex-1 text-[12px] leading-[1.75] text-slate-700 sm:text-[13px] sm:leading-[1.8]">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800 sm:text-[11px]">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.iconBg}`}>
                        <FiGlobe size={14} aria-hidden="true" />
                      </span>
                      {item.footer}
                    </div>
                  </div>

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
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-400 sm:text-[11px]">
                  Our vision. Your opportunity.
                </p>

                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[1.25] tracking-[-0.045em] text-white">
                  Great talent. Thoughtful engineering. Global possibilities.
                </h3>

                <p className="mt-3 text-[12px] leading-[1.75] text-slate-200 sm:text-[13px] sm:leading-[1.8]">
                  Have a challenge worth solving? Let’s explore how we can
                  turn your ideas into meaningful technology solutions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => goTo('contact')}
                className={`group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-lg sm:text-sm ${FOCUS}`}
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