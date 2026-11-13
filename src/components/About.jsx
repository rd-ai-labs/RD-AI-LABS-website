import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowRight,
  FiTarget,
  FiUsers,
  FiTrendingUp,
} from 'react-icons/fi'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const PILLARS = [
  {
    title: 'Our Mission',
    description:
      "We engineer software solutions only when they add real, measurable value to your business. We don't just write code; we build stable platforms designed to solve real-world problems from day one.",
    icon: FiTarget,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Our Leadership',
    description:
      "We believe in direct communication, transparent delivery, and value-based trust. Backed by over two decades of enterprise core systems architecture experience, we focus on making every solution stable, secure, and production-ready.",
    icon: FiUsers,
    accent: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Our Journey',
    description:
      "We believe technology talent has no geographical boundaries. By bringing 20+ years of enterprise engineering discipline together with talented minds from smaller towns, we are building a borderless engineering hub committed to exceptional standards.",
    icon: FiTrendingUp,
    accent: 'bg-violet-100 text-violet-700',
  },
]

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#F7F3EF] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24 lg:pt-12"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, transparent 10%, rgba(255,190,140,0.13) 28%, transparent 39%, rgba(125,190,235,0.15) 53%, rgba(190,187,240,0.12) 68%, transparent 82%)',
          }}
        />

        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-orange-200/30 blur-[100px]" />

        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-sky-200/30 blur-[110px]" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-200/20 blur-[100px]" />
      </div>

      <div className="container-x relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14"
        >
          {/* LEFT CONTENT */}
          <div className="min-w-0">

            {/* Label */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[12px]">
                <span className="h-px w-7 bg-sky-600" />
                About RD AI Labs
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="mt-4 max-w-xl font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-slate-950 [text-wrap:balance]"
            >
              The Engineering Creed behind{' '}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                RD AI Labs.
              </span>
            </motion.h2>

            {/* Intro paragraph */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[540px] text-[13px] leading-[1.75] text-slate-700 sm:mt-5 sm:text-[14px] sm:leading-[1.8]"
            >
              We operate at the intersection of deep architectural maturity and the relentless drive of a modern software startup. By pairing proven engineering discipline with thoughtful innovation, we build technology that delivers meaningful business impact.
            </motion.p>

            {/* Engineering philosophy */}
            <motion.div
              variants={fadeUp}
              className="mt-6 max-w-[540px] border-l-2 border-sky-300 pl-4 sm:mt-7"
            >
              <h3 className="font-display text-[15px] font-semibold tracking-tight text-slate-950 sm:text-[17px]">
                Built on Engineering Excellence
              </h3>

              <p className="mt-2 text-[13px] leading-[1.75] text-slate-700 sm:text-[14px] sm:leading-[1.8]">
                We don't believe in technology for the sake of technology. Every architecture, every line of code, and every solution serves a clear purpose: solving real problems and creating lasting results.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-6 sm:mt-7">
              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-slate-950 py-2 pl-6 pr-2 text-[14px] font-semibold text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Let's work together

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <FiArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-[540px] lg:ml-auto"
          >
            {/* Technology image */}
            <div className="group relative overflow-hidden rounded-[26px] border border-white/80 bg-white/60 p-2 shadow-[0_24px_65px_-32px_rgba(36,48,62,0.35)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#E6EAF0]">

                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern collaborative technology workspace"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">

                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200 sm:text-[12px]">
                    Our philosophy
                  </span>

                  <h3 className="mt-2 max-w-sm font-display text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-white sm:text-2xl">
                    Enterprise discipline
                    <span className="block text-orange-300">
                      Startup innovation
                    </span>
                  </h3>

                  <p className="mt-2 max-w-sm text-[13px] leading-[1.75] text-white/85 sm:text-[14px] sm:leading-[1.8]">
                    Experience that builds confidence. Innovation that
                    moves businesses forward.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience highlight */}
            <div className="mt-4 flex items-center gap-4 rounded-[20px] border border-white/90 bg-white/75 p-4 shadow-[0_8px_28px_-18px_rgba(36,48,62,0.24)] backdrop-blur-xl sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                <FiTrendingUp className="text-orange-700" size={22} />
              </div>

              <div>
                <p className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  20+ Years
                </p>
                <p className="mt-1 text-[13px] leading-[1.75] text-slate-700 sm:text-[14px]">
                  Enterprise core systems architecture experience
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* OUR THREE PILLARS */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14"
        >
          {PILLARS.map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className="rounded-[22px] border border-white/90 bg-white/75 p-5 shadow-[0_8px_28px_-18px_rgba(36,48,62,0.24)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(36,48,62,0.25)] sm:p-6"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.accent}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-slate-950 sm:text-[19px]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[13px] leading-[1.75] text-slate-700 sm:text-[14px] sm:leading-[1.8]">
                  {item.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}