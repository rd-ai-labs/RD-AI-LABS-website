
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowRight,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiX,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
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

const FIELD_CLASS =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-950 placeholder:font-normal placeholder:text-slate-400 caret-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60'

const FIELD_STYLE = {
  color: '#0f172a',
  WebkitTextFillColor: '#0f172a',
}

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

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function Careers() {
  const reduce = useReducedMotion()

  const [showForm, setShowForm] = useState(false)
  const [fileError, setFileError] = useState('')
  const [sending, setSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const closeForm = () => {
    if (sending) return

    setShowForm(false)
    setFileError('')
    setSubmitStatus(null)
  }

  const openForm = () => {
    setShowForm(true)
    setFileError('')
    setSubmitStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const fileInput = form.elements.namedItem('attachment')
    const file = fileInput?.files?.[0]

    setFileError('')
    setSubmitStatus(null)

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({
        type: 'error',
        message:
          'Email service is not configured. Please contact the website administrator.',
      })
      return
    }

    if (!file) {
      setFileError('Please upload your resume.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Resume must be smaller than 10 MB.')
      return
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i

    if (!allowedExtensions.test(file.name)) {
      setFileError('Please upload a PDF, DOC or DOCX file.')
      return
    }

    try {
      setSending(true)

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      )

      form.reset()

      setSubmitStatus({
        type: 'success',
        message:
          'Your application has been submitted successfully! Thank you for your interest in RD AI Labs.',
      })
    } catch (error) {
      console.error('EmailJS submission failed:', error)

      setSubmitStatus({
        type: 'error',
        message:
          'We could not submit your application. Please try again or email contact@rdailabs.com.',
      })
    } finally {
      setSending(false)
    }
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

        {/* Talent philosophy and highlights */}
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
                  onClick={openForm}
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

      {/* Career application modal */}
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
                onClick={closeForm}
                disabled={sending}
                aria-label="Close application form"
                className="absolute right-5 top-5 rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white disabled:opacity-40"
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
                Let’s build something great.
              </h2>

              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
                Tell us about yourself. Our team would love to learn
                about your skills and interests.
              </p>
            </div>

            {/* Application form */}
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5 p-6 sm:p-9"
            >
              {/* Full name and email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="career-full-name"
                    className="mb-2 block text-xs font-bold text-slate-900"
                  >
                    Full Name *
                  </label>
                  <input
                    id="career-full-name"
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    disabled={sending}
                    className={FIELD_CLASS}
                    style={FIELD_STYLE}
                  />
                </div>

                <div>
                  <label
                    htmlFor="career-email"
                    className="mb-2 block text-xs font-bold text-slate-900"
                  >
                    Email Address *
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    autoComplete="email"
                    disabled={sending}
                    className={FIELD_CLASS}
                    style={FIELD_STYLE}
                  />
                </div>
              </div>

              {/* Phone and skills */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="career-phone"
                    className="mb-2 block text-xs font-bold text-slate-900"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="career-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                    maxLength={20}
                    autoComplete="tel"
                    disabled={sending}
                    className={FIELD_CLASS}
                    style={FIELD_STYLE}
                  />
                </div>

                <div>
                  <label
                    htmlFor="career-skills"
                    className="mb-2 block text-xs font-bold text-slate-900"
                  >
                    Technical Skills *
                  </label>
                  <input
                    id="career-skills"
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, Python..."
                    required
                    maxLength={300}
                    disabled={sending}
                    className={FIELD_CLASS}
                    style={FIELD_STYLE}
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="career-experience"
                  className="mb-2 block text-xs font-bold text-slate-900"
                >
                  Experience / Education *
                </label>
                <textarea
                  id="career-experience"
                  name="experience"
                  rows={3}
                  required
                  maxLength={2000}
                  placeholder="Tell us about your experience, education, projects or interests..."
                  disabled={sending}
                  className={`${FIELD_CLASS} resize-y`}
                  style={FIELD_STYLE}
                />
              </div>

              {/* Portfolio */}
              <div>
                <label
                  htmlFor="career-portfolio"
                  className="mb-2 block text-xs font-bold text-slate-900"
                >
                  LinkedIn / Portfolio URL
                </label>
                <input
                  id="career-portfolio"
                  type="url"
                  name="portfolio"
                  placeholder="https://linkedin.com/in/yourprofile"
                  maxLength={500}
                  disabled={sending}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />
              </div>

              {/* Resume upload */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-900">
                  Upload Resume *
                </label>

                <label
                  htmlFor="career-attachment"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-5 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
                >
                  <FiUploadCloud
                    size={30}
                    className="mb-3 text-indigo-600"
                  />

                  <span className="text-sm font-bold text-slate-900">
                    Choose your resume
                  </span>

                  <span className="mt-1 text-[11px] text-slate-600">
                    PDF, DOC or DOCX · Maximum 10 MB
                  </span>

                  <input
                    id="career-attachment"
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    disabled={sending}
                    className="mt-4 block w-full max-w-xs text-xs font-medium text-slate-900 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-xs file:font-bold file:text-indigo-800 hover:file:bg-indigo-200"
                  />
                </label>

                {fileError && (
                  <p
                    className="mt-2 text-xs font-semibold text-red-600"
                    role="alert"
                  >
                    {fileError}
                  </p>
                )}
              </div>

              {/* Success or error message */}
              {submitStatus && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border-green-200 bg-green-50 text-green-800'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <FiCheckCircle className="mt-0.5 shrink-0" size={19} />
                  ) : (
                    <FiAlertCircle className="mt-0.5 shrink-0" size={19} />
                  )}
                  <p>{submitStatus.message}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={sending}
                className={`group flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}
              >
                {sending ? (
                  <>
                    <FiLoader className="animate-spin" size={18} />
                    Sending Application...
                  </>
                ) : submitStatus?.type === 'success' ? (
                  <>
                    Application Submitted
                    <FiCheckCircle size={18} />
                  </>
                ) : (
                  <>
                    Submit Application
                    <FiArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] leading-relaxed text-slate-500">
                By submitting, you agree to share your information
                with RD AI Labs for recruitment purposes.
              </p>

              {submitStatus?.type === 'success' && (
                <button
                  type="button"
                  onClick={closeForm}
                  className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Close
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
