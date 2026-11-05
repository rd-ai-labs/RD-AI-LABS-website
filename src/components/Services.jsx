import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiCode,
  FiCpu,
  FiMonitor,
  FiCloud,
} from 'react-icons/fi'
import { useGoTo } from '../hooks'

const EASE = [0.22, 1, 0.36, 1]

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

const CAPABILITIES = [
  {
    title: 'Custom Software Engineering',
    description:
      'We build tailored software ecosystems to streamline manual operations, eliminate bottlenecks, and modernize outdated technology. Our solutions help your business operate smoothly with greater efficiency, reliability, and control.',
    icon: FiCode,
    bg: 'from-sky-700 via-sky-800 to-slate-900',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Applied AI & Automation',
    description:
      'We integrate cutting-edge intelligence into everyday business operations. From AI-powered assistants and intelligent workflows to process automation, we make your systems smarter, faster, and more efficient.',
    icon: FiCpu,
    bg: 'from-indigo-600 via-indigo-800 to-slate-900',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Web & Mobile Platforms',
    description:
      'We engineer high-performance digital experiences, including scalable portals, responsive corporate web applications, and seamless mobile apps designed for usability, performance, and real-world adoption.',
    icon: FiMonitor,
    bg: 'from-teal-600 via-teal-800 to-slate-900',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cloud Architecture & Systems Design',
    description:
      'Backed by over two decades of enterprise engineering leadership, we design robust AWS and Azure environments, manage secure data migrations, optimize infrastructure, and build platforms that scale reliably. We also audit and optimize cloud spending to improve business efficiency.',
    icon: FiCloud,
    bg: 'from-blue-600 via-blue-800 to-slate-900',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Services() {
  const goTo = useGoTo()
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="container-x relative mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: EASE,
          }}
          className="mb-9 flex flex-col gap-5 sm:mb-11 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[11px]">
              <span
                className="h-px w-7 bg-sky-600"
                aria-hidden="true"
              />
              Capabilities & Expertise
            </p>

            <h2 className="font-display text-[clamp(1.9rem,3.5vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900">
              Anything Related to Software,{' '}
              <span className="text-slate-400">
                We Are Here to Help.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              From automating a single local business workflow to
              architecting high-availability systems for global
              platforms, our capabilities span the entire technology
              landscape. If it runs on code, we engineer it.
            </p>
          </div>

          <button
            type="button"
            onClick={() => goTo('contact')}
            className={`group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 ${FOCUS}`}
          >
            Discuss your project

            <FiArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>

        {/* Capability cards */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.06 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CAPABILITIES.map((capability) => {
            const Icon = capability.icon

            return (
              <motion.article
                key={capability.title}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.22 },
                      }
                }
                className="group relative isolate min-w-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* Card backdrop: gradient fallback + Unsplash photo */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-20 bg-gradient-to-br ${capability.bg}`}
                />
                <img
                  src={capability.image}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />

                {/* Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-900/15 transition-colors duration-500 group-hover:from-slate-950/95 group-hover:via-slate-950/75 group-hover:to-slate-950/40"
                />

                {/* Card content */}
                <div className="flex min-h-[310px] flex-col justify-end p-4 sm:min-h-[340px] sm:p-5 lg:min-h-[365px]">

                  {/* Icon and arrow */}
                  <div className="mb-auto flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white/25">
                      <Icon size={20} aria-hidden="true" />
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-900">
                      <FiArrowUpRight
                        size={17}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Capability title */}
                  <h3 className="max-w-sm font-display text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                    {capability.title}
                  </h3>

                  {/* Description: hidden until hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-300 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-3 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:mt-3 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <div className="overflow-hidden">
                      <p className="text-[12px] leading-5 text-white/85 sm:text-[13px] sm:leading-6">
                        {capability.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => goTo('contact')}
                        aria-label={`Discuss ${capability.title}`}
                        className={`mt-4 inline-flex min-h-8 items-center gap-2 text-xs font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-sky-200 sm:text-[13px] ${FOCUS}`}
                      >
                        Discuss this capability

                        <FiArrowUpRight
                          size={15}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 text-center sm:mt-12"
        >
          <p className="text-sm font-medium tracking-wide text-slate-500 sm:text-base">
            From a single workflow to an enterprise-scale platform.
            <span className="ml-1 font-semibold text-slate-900">
              We engineer it.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}