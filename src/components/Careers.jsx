import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCode, FiUsers, FiGlobe, FiTrendingUp } from 'react-icons/fi'
import { COMPANY } from '../data'
import Reveal from './Reveal'

const SECTION_BG = {
  background:
    'radial-gradient(50% 45% at 100% 0%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 50% at 0% 100%, rgba(255,179,71,.35) 0%, rgba(255,179,71,0) 70%),' +
    '#fbf1ea',
}

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2'

const HIGHLIGHTS = [
  {
    icon: FiCode,
    title: 'Real-World Engineering',
    description:
      'Work on meaningful software challenges and build solutions that deliver measurable business impact.',
  },
  {
    icon: FiUsers,
    title: 'Direct Mentorship',
    description:
      'Learn from experienced technology leaders through practical guidance and engineering standards.',
  },
  {
    icon: FiGlobe,
    title: 'Global Opportunities',
    description:
      'Develop your skills and contribute to technology solutions designed for businesses everywhere.',
  },
  {
    icon: FiTrendingUp,
    title: 'Continuous Growth',
    description:
      'Turn your raw potential and passion into production-ready engineering mastery.',
  },
]

export default function Careers() {
  const reduce = useReducedMotion()

  const profileEmail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    'Career Profile - RD AI Labs'
  )}&body=${encodeURIComponent(
    'Hello RD AI Labs Team,\n\nI would like to connect with you regarding future opportunities.\n\nName:\nSkills:\nExperience / Education:\nPortfolio or LinkedIn:\n\nPlease find my profile attached.\n\nThank you.'
  )}`

  return (
    <section
      id="careers"
      className="section relative overflow-hidden"
      style={SECTION_BG}
    >
      <div className="container-x relative">

        {/* Main heading */}
        <Reveal>
          <div className="mb-12 max-w-4xl lg:mb-16">

            <p className="mb-5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-700 sm:text-xs">
              <span className="h-px w-8 bg-indigo-600" />
              Careers at RD AI Labs
            </p>

            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.05em] text-slate-950">
              Skill is Universal.
              <span className="block bg-gradient-to-r from-indigo-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
                We Provide the Horizon.
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              We hire for problem-solving ability, curiosity, and drive,
              not just years of experience. We may not have an open role
              today, but we are always building our talent pipeline.
            </p>
          </div>
        </Reveal>

        {/* Talent philosophy + highlights */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">

          {/* Left content */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-7 shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl sm:p-10">

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl"
              />

              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                  We don’t just hire talent.
                  <span className="block text-indigo-700">
                    We help build it.
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                  Under the direct mentorship of our senior architects and proven quality standards, we help motivated people grow into world-class engineers."
                </p>

                <p className="mt-4 text-sm font-semibold leading-7 text-slate-900 sm:text-base">
                  Don’t wait for a job posting. If you have the drive,
                  send us your profile and start the conversation.
                </p>

                <a
                  href={profileEmail}
                  className={`group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:bg-indigo-800 hover:shadow-xl ${FOCUS} motion-reduce:transition-none`}
                >
                  Share your profile

                  <FiArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  Include your resume, portfolio, or LinkedIn link.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right highlights */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <motion.div
                    whileHover={
                      reduce
                        ? undefined
                        : { y: -3 }
                    }
                    transition={{ duration: 0.25 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/70 bg-white/50 p-5 shadow-[0_8px_30px_-20px_rgba(80,70,100,.35)] backdrop-blur-xl transition duration-300 hover:bg-white/75 hover:shadow-lg sm:p-6 motion-reduce:transition-none"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition duration-300 group-hover:-translate-y-1 group-hover:bg-indigo-700 motion-reduce:transition-none">
                        <Icon size={21} aria-hidden="true" />
                      </span>

                      <div>
                        <h3 className="font-display text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Contact email */}
        <Reveal>
          <p className="mt-12 text-center text-sm text-slate-700 sm:mt-16">
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