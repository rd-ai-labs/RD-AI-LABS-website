
import { motion, useReducedMotion } from 'framer-motion'
import { PERKS, COMPANY } from '../data'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from './Reveal'

const SECTION_BG = {
  background:
    'radial-gradient(50% 45% at 100% 0%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 50% at 0% 100%, rgba(255,179,71,.35) 0%, rgba(255,179,71,0) 70%),' +
    '#fbf1ea',
}

const CARD =
  'group relative overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] ' +
  'transition duration-300 hover:bg-white/60 hover:shadow-[0_24px_50px_-18px_rgba(120,70,60,.45)] motion-reduce:transition-none'

export default function Careers() {
  const reduce = useReducedMotion()

  return (
    <section
      id="careers"
      className="section relative overflow-hidden"
      style={SECTION_BG}
    >
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Build the future with us
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            We&apos;re a curious, friendly team that loves solving hard
            problems. If you want to learn fast and do meaningful work,
            you&apos;ll fit right in.
          </p>

          {/* Funny sticky note that wiggles */}
          <motion.p
            animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mt-6 inline-block -rotate-2 rounded-lg bg-amber-200 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md"
          >
            Warning: may cause sudden enthusiasm for clean code.
          </motion.p>
        </div>

        {/* Perks */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className={`${CARD} h-full rounded-2xl p-6 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0`}
              >
                {/* Gradient line draws in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />

                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transition-none">
                  <p.icon size={24} />
                </span>

                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/*
          Open positions section temporarily disabled.
          Uncomment this block when you want to display job listings again.
          
          Keep the job listing code here for future use.
        */}

        {/* Current hiring status */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-8 text-center shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl"
            />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-3xl shadow-lg">
                <span role="img" aria-label="Sparkles">
                  ✨
                </span>
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
                Careers at RD AI Labs
              </p>

              <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Currently, there are no open positions.
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
                All our positions are currently filled. Thank you for your
                interest in joining RD AI Labs! We&apos;re always happy to
                connect with talented people. Please check back later for
                future career opportunities.
              </p>

              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(
                  'Future Career Opportunities'
                )}`}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 motion-reduce:transition-none"
              >
                Contact us
                <FiArrowRight aria-hidden="true" />
              </a>

              <p className="mt-5 text-xs text-slate-600">
                No openings right now. New opportunities may be just around
                the corner! 👋
              </p>
            </div>
          </div>
        </Reveal>

        {/* Contact email */}
        <Reveal>
          <p className="mt-8 text-center text-sm text-slate-700">
            Have a question? Reach us at{' '}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-indigo-700 underline-offset-4 hover:underline"
            >
              {COMPANY.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
                              