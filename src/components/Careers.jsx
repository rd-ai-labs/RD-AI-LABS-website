
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowRight,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiX,
  FiUploadCloud,
} from 'react-icons/fi'
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
    icon: FiTrendingUp,
    title: 'Continuous Growth',
    description:
      'Turn your raw potential and passion into production-ready engineering mastery.',
  },
]

export default function Careers() {
  const reduce = useReducedMotion()
  const [showForm, setShowForm] = useState(false)
  const [fileError, setFileError] = useState('')

  const handleSubmit = (event) => {
    const file = event.currentTarget.elements.attachment.files[0]

    if (file && file.size > 10 * 1024 * 1024) {
      event.preventDefault()
      setFileError('Resume must be smaller than 10 MB.')
      return
    }

    setFileError('')
  }

  return (
    <section
      id="careers"
      className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-15"
      style={SECTION_BG}
    >
      <div className="container-x relative">

        {/* Main heading */}
        <Reveal>
          <div className="mb-12 max-w-4xl lg:mb-16">
            <p className="mb-4 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800 sm:text-[11px]">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-violet-700/70"
              />
              Careers at RD AI Labs
            </p>

            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.3] tracking-[-0.045em] text-slate-950 [text-wrap:balance]">
              Skill is Universal.
              <span className="block bg-gradient-to-r from-[#ff6a2b] via-[#ec4899] to-[#a43fe0] bg-clip-text text-transparent">
                We Provide the Horizon.
              </span>
            </h2>

            <p className="mt-6 max-w-[540px] text-[12px] leading-[1.75] text-slate-700 sm:text-[13px] sm:leading-[1.8]">
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
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[1.25] tracking-[-0.045em] text-slate-950">
                  We don’t just hire talent.
                  <span className="block bg-gradient-to-r from-[#ff6a2b] via-[#ec4899] to-[#a43fe0] bg-clip-text text-transparent">
                    We help build it.
                  </span>
                </h3>

                <p className="mt-5 text-[12px] leading-[1.75] text-slate-700 sm:text-[13px] sm:leading-[1.8]">
                  Under the direct mentorship of our senior architects
                  and proven quality standards, we help motivated people
                  grow into world-class engineers.
                </p>

                <p className="mt-4 text-[12px] font-semibold leading-[1.75] text-slate-950 sm:text-[13px] sm:leading-[1.8]">
                  Don’t wait for a job posting. If you have the drive,
                  send us your profile and start the conversation.
                </p>

                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className={`group mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-3 text-[13px] font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl sm:text-sm ${FOCUS} motion-reduce:transition-none`}
                >
                  Share your profile

                  <FiArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-4 text-[11px] leading-relaxed text-slate-700 sm:text-xs">
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
                    whileHover={reduce ? undefined : { y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/70 bg-white/50 p-5 shadow-[0_8px_30px_-20px_rgba(80,70,100,.35)] backdrop-blur-xl transition duration-300 hover:bg-white/75 hover:shadow-lg sm:p-6 motion-reduce:transition-none"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition duration-300 group-hover:-translate-y-1 group-hover:bg-indigo-700 motion-reduce:transition-none">
                        <Icon size={21} aria-hidden="true" />
                      </span>

                      <div>
                        <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.03em] text-slate-950 sm:text-xl">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-[12px] leading-[1.75] text-slate-700 sm:text-[13px] sm:leading-[1.8]">
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
          <p className="mt-12 text-center text-[12px] text-slate-700 sm:mt-16 sm:text-[13px]">
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

      {/* Career Application Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-form-title"
        >
          <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">

            {/* Modal header */}
            <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 px-6 py-7 text-white sm:px-9">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close application form"
                className="absolute right-5 top-5 rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <FiX size={22} />
              </button>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                Careers at RD AI Labs
              </p>

              <h2
                id="career-form-title"
                className="mt-3 font-display text-2xl font-bold sm:text-3xl"
              >
                Let's build something great.
              </h2>

              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
                Tell us about yourself. Our team would love to learn
                about your skills and interests.
              </p>
            </div>

            {/* Application form */}
            <form
              action={`https://formsubmit.co/${COMPANY.email}`}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-5 p-6 sm:p-9"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Career Application - RD AI Labs"
              />

              <input
                type="hidden"
                name="_template"
                value="table"
              />

              {/* Name and email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-800">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-800">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Phone and skills */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-800">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                    maxLength={20}
                    autoComplete="tel"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-800">
                    Technical Skills *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, Python..."
                    required
                    maxLength={300}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800">
                  Experience / Education *
                </label>
                <textarea
                  name="experience"
                  rows={3}
                  required
                  maxLength={2000}
                  placeholder="Tell us about your experience, education, projects or interests..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800">
                  LinkedIn / Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio"
                  placeholder="https://linkedin.com/in/yourprofile"
                  maxLength={500}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Resume upload */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800">
                  Upload Resume *
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-5 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50">
                  <FiUploadCloud
                    size={30}
                    className="mb-3 text-indigo-600"
                  />

                  <span className="text-sm font-semibold text-slate-800">
                    Choose your resume
                  </span>

                  <span className="mt-1 text-[11px] text-slate-500">
                    PDF, DOC or DOCX · Maximum 10 MB
                  </span>

                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    className="mt-4 block w-full max-w-xs text-xs text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                </label>

                {fileError && (
                  <p className="mt-2 text-xs font-medium text-red-600" role="alert">
                    {fileError}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`group flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl ${FOCUS}`}
              >
                Submit Application
                <FiArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-[10px] leading-relaxed text-slate-500">
                By submitting, you agree to share your information
                with RD AI Labs for recruitment purposes.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
