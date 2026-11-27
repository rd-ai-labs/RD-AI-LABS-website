
import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowRight,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiChevronDown,
  FiStar,
  FiClock,
  FiGlobe,
  FiBookOpen,
} from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
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

/*
 * The descriptions below are taken from the supplied
 * "AI & Prompt Engineering Internship Program" PDF.
 * Keep this copy aligned with the approved PDF.
 */
const LEARNING_ITEMS = [
  {
    title: 'Structured Prompt Engineering',
    description:
      'Master zero-shot, few-shot, Chain-of-Thought, and role-based prompting across leading LLMs (ChatGPT, Claude, Gemini).',
  },
  {
    title: 'Data Extraction & Formatting',
    description:
      'Design prompts that convert messy, unstructured text into clean JSON, Markdown, and business reports.',
  },
  {
    title: 'Hallucination Control & QA Testing',
    description:
      'Stress-test AI systems against edge cases and build reliable, document-grounded workflows.',
  },
  {
    title: 'Capstone Project',
    description:
      'Build and document a reusable AI workflow or prompt library tailored to a real business or domain use case.',
  },
]

const BENEFIT_ITEMS = [
  {
    title: 'Official Offer Letter',
    description:
      'Issued on RD AI Labs OPC Pvt Ltd letterhead upon selection.',
  },
  {
    title: 'Verifiable Completion Certificate',
    description:
      'Includes a unique Certificate ID verifiable on our website for college credits and LinkedIn.',
  },
  {
    title: 'Letter of Recommendation (LoR)',
    description:
      'Awarded to top-performing interns based on capstone project quality.',
  },
  {
    title: 'Pre-Placement Opportunity',
    description:
      'High-performing interns may be considered for part-time or full-time roles as we grow.',
  },
]

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_INTERNSHIP_ACK_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_INTERNSHIP_ACK_TEMPLATE_ID

function ExpandableList({ title, items, openItem, onToggle, idPrefix }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_8px_30px_-22px_rgba(80,70,100,.35)] sm:p-7">
      <h4 className="font-display text-xl font-bold tracking-[-0.03em] text-slate-950 sm:text-2xl">
        {title}
      </h4>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => {
          const isOpen = openItem === index
          const panelId = `${idPrefix}-panel-${index}`
          const buttonId = `${idPrefix}-button-${index}`

          return (
            <div
              key={item.title}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen
                  ? 'border-indigo-200 bg-indigo-50/70'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(isOpen ? null : index)}
                className={`flex min-h-[60px] w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 ${FOCUS}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FiStar
                    aria-hidden="true"
                    className="shrink-0 fill-amber-400 text-amber-500"
                    size={18}
                  />
                  <span className="font-semibold leading-snug text-slate-900">
                    {item.title}
                  </span>
                </span>

                <FiChevronDown
                  aria-hidden="true"
                  className={`shrink-0 text-indigo-700 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  size={19}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="border-t border-indigo-100 px-4 pb-5 pt-4 sm:px-5"
                >
                  <p className="text-[13px] leading-[1.8] text-slate-700 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Careers() {
  const reduce = useReducedMotion()
  const [showForm, setShowForm] = useState(false)
  const [showInternshipForm, setShowInternshipForm] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [openLearningItem, setOpenLearningItem] = useState(null)
  const [openBenefitItem, setOpenBenefitItem] = useState(null)

  // Update the URL while visitors move between the Careers content and
  // the internship card. The internship remains part of the Careers page.
  useEffect(() => {
    const careersSection = document.getElementById('careers')
    const internshipSection = document.getElementById('internship')

    if (!careersSection || !internshipSection) return undefined

    const updateHash = (hash) => {
      if (window.location.hash === hash) return

      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}${hash}`
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateHash('#internship')
          return
        }

        const internshipTop = internshipSection.getBoundingClientRect().top
        const careersRect = careersSection.getBoundingClientRect()
        const careersIsVisible =
          careersRect.bottom > 0 && careersRect.top < window.innerHeight

        // The internship is below the viewport: the visitor is back in
        // the upper Careers content. If it has moved above the viewport,
        // keep #internship until the visitor scrolls back above it.
        if (
          internshipTop > window.innerHeight * 0.3 &&
          careersIsVisible
        ) {
          updateHash('#careers')
        }
      },
      {
        threshold: 0.01,
        rootMargin: '-15% 0px -70% 0px',
      }
    )

    observer.observe(internshipSection)

    return () => observer.disconnect()
  }, [])

  const closeForm = () => {
    if (sending) return
    setShowForm(false)
    setSubmitStatus(null)
  }

  const openForm = () => {
    setShowForm(true)
    setSubmitStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmitStatus(null)

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({
        type: 'error',
        message:
          'Email service is not configured. Please contact the website administrator.',
      })
      return
    }

    try {
      setSending(true)

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.get('fullName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: `
            CAREER APPLICATION

            Full Name: ${formData.get('fullName')}
            Email: ${formData.get('email')}
            Phone: ${formData.get('phone')}

            Technical Skills: ${formData.get('skills')}

            Experience / Education:
            ${formData.get('experience')}

            LinkedIn / Portfolio:
            ${formData.get('portfolio') || 'Not provided'}

            Resume Link:
            ${formData.get('resumeLink')}
          `,
        },
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

  const closeInternshipForm = () => {
    if (sending) return
    setShowInternshipForm(false)
    setSubmitStatus(null)
  }

  const openInternshipForm = () => {
    setShowInternshipForm(true)
    setSubmitStatus(null)
  }

  const handleInternshipSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitStatus(null)

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({
        type: 'error',
        message: 'Email service is not configured. Please contact the website administrator.',
      })
      return
    }

    try {
      setSending(true)

      // First, send the internship application to the RD AI Labs team.
      // The acknowledgement is attempted only after this succeeds.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'contact@rdailabs.com',
          name: formData.get('fullName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: `
            AI & PROMPT ENGINEERING INTERNSHIP APPLICATION

            Full Name: ${formData.get('fullName')}
            Email Address: ${formData.get('email')}
            Phone Number: ${formData.get('phone')}
            College / Institution: ${formData.get('college')}
            Technical Skills: ${formData.get('skills') || 'Not provided'}
            Area of AI Interest: ${formData.get('aiInterest') || 'Not selected'}
            Additional Information:
            ${formData.get('additionalInfo') || 'Not provided'}
          `,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      // The company has received the application. Try the applicant
      // acknowledgement separately so its failure cannot cause a duplicate
      // company notification if the applicant retries the form.
      let acknowledgementSent = false

      if (EMAILJS_INTERNSHIP_ACK_TEMPLATE_ID) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_INTERNSHIP_ACK_TEMPLATE_ID,
            {
              to_email: formData.get('email'),
              name: formData.get('fullName'),
              email: formData.get('email'),
            },
            { publicKey: EMAILJS_PUBLIC_KEY }
          )
          acknowledgementSent = true
        } catch (acknowledgementError) {
          console.error(
            'Internship acknowledgement email failed:',
            acknowledgementError
          )
        }
      } else {
        console.error(
          'Internship acknowledgement template is not configured. Set VITE_EMAILJS_INTERNSHIP_ACK_TEMPLATE_ID.'
        )
      }

      form.reset()
      setSubmitStatus({
        type: 'success',
        message: acknowledgementSent
          ? 'Your internship application has been submitted successfully! A confirmation email has been sent to your email address.'
          : 'Your internship application has been received by RD AI Labs, but we could not send the automatic confirmation email. Please do not submit the application again. If needed, contact contact@rdailabs.com.',
      })
    } catch (error) {
      console.error('Internship EmailJS submission failed:', error)
      setSubmitStatus({
        type: 'error',
        message: 'We could not submit your application. Please try again or email contact@rdailabs.com.',
      })
    } finally {
      setSending(false)
    }
  }


  return (
    <section
      id="careers"
      className="relative overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11"
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

                <p className="mt-10 text-[11px] leading-relaxed text-slate-700 sm:text-xs">
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

        {/* AI & Prompt Engineering Internship */}
        <Reveal>
          <section
            id="internship"
            aria-labelledby="internship-title"
            className="mt-16 overflow-hidden rounded-[28px] border border-white/80 bg-white/75 shadow-[0_18px_55px_-30px_rgba(70,60,100,.35)] backdrop-blur-xl sm:mt-20"
          >
            {/* Internship banner */}
            <div className="relative isolate overflow-hidden bg-gradient-to-r from-[#fff0e6] via-[#fce8f3] to-[#eeeaff] px-6 py-8 sm:px-9 sm:py-10 lg:px-10 lg:py-12">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-20 -z-10 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-orange-300/40 blur-3xl"
              />

              <div className="grid items-center gap-5 md:grid-cols-[1.15fr_.85fr] lg:gap-8">
                {/* Internship heading */}
                <div className="relative z-10">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-indigo-800 shadow-sm sm:text-xs">
                    <FaGraduationCap
                      size={20}
                      aria-hidden="true"
                    />
                    Internship Opportunity
                  </p>

                  <h3
                    id="internship-title"
                    className="mt-5 max-w-2xl font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.05em] text-slate-950"
                  >
                    AI & Prompt Engineering
                    <span className="block bg-gradient-to-r from-[#ff642d] via-[#ec4899] to-[#a20bd8] bg-clip-text text-transparent">
                      Internship Program
                    </span>
                  </h3>

                  <p className="mt-4 max-w-2xl text-[14px] font-medium leading-[1.65] text-slate-700 sm:text-base">
                    Build real-world AI workflows, master structured prompting,
                    and gain hands-on industry experience at RD AI Labs.
                  </p>
                </div>

                {/* AI laptop illustration */}
                <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-8 rounded-full bg-white/60 blur-3xl"
                  />

                  <img
                    src="/internship-ai-laptop.png"
                    alt="AI laptop with artificial intelligence and analytics illustrations"
                    className="relative z-10 h-auto w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Internship information */}
            <div className="p-5 sm:p-8 lg:p-10">
              <p className="max-w-4xl text-[13px] leading-[1.8] text-slate-700 sm:text-sm">
                Our 4-to-6-week internship program bridges the gap between
                academic learning and practical Generative AI deployment.
                Designed for curious students from academic backgrounds
                (Engineering and Arts & Science), this program focuses on applied AI problem-solving
                rather than heavy coding.
              </p>

              {/* Program highlights */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    icon: FiClock,
                    label: 'Duration',
                    value: '4 Weeks or 6 Weeks',
                    detail: 'Flexible for college academic credit requirements',
                  },
                  {
                    icon: FiGlobe,
                    label: 'Mode',
                    value: 'Remote / Hybrid',
                    detail: 'Choose the available working mode',
                  },
                  {
                    icon: FiBookOpen,
                    label: 'Prerequisites',
                    value: 'No prior coding required',
                    detail:
                      'Strong English communication, logical thinking, and curiosity about AI',
                  },
                  {
                    icon: FiUsers,
                    label: 'Batch Intake',
                    value: 'Rolling monthly cohorts',
                    detail: 'New cohorts start on a rolling monthly basis',
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200/80 bg-white/80 p-4"
                    >
                      <div className="flex items-center gap-2 text-indigo-700">
                        <Icon size={17} aria-hidden="true" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
                          {item.label}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-bold leading-snug text-slate-950">
                        {item.value}
                      </p>

                      <p className="mt-1.5 text-[11px] leading-[1.65] text-slate-600">
                        {item.detail}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Expandable sections */}
              <div className="mt-9 grid gap-5 lg:grid-cols-2">
                <ExpandableList
                  title="What You Will Learn & Build"
                  items={LEARNING_ITEMS}
                  openItem={openLearningItem}
                  onToggle={setOpenLearningItem}
                  idPrefix="internship-learning"
                />

                <ExpandableList
                  title="What You Receive"
                  items={BENEFIT_ITEMS}
                  openItem={openBenefitItem}
                  onToggle={setOpenBenefitItem}
                  idPrefix="internship-benefits"
                />
              </div>

              {/* Internship application CTA */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-5 text-white sm:flex-row sm:items-center sm:px-7 sm:py-6">
                <div>
                  <h4 className="font-display text-lg font-bold sm:text-xl">
                    Ready to begin your AI journey?
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    Apply for the AI internship at RD AI Labs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openInternshipForm}
                  className={`group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-950 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-100 ${FOCUS}`}
                >
                  Apply Now
                  <FiArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
              </div>
          </section>
        </Reveal>

        {/* Contact email */}
        <Reveal>
          <p className="mt-16 text-center text-[12px] text-slate-700 sm:mt-20 sm:text-[13px]">
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

      {/* Existing career application modal */}
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

            {/* Existing general career application form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-9">
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

              <div>
                <label
                  htmlFor="career-resume-link"
                  className="mb-2 block text-xs font-bold text-slate-900"
                >
                  Resume Link *
                </label>

                <input
                  id="career-resume-link"
                  type="url"
                  name="resumeLink"
                  placeholder="https://drive.google.com/..."
                  required
                  maxLength={1000}
                  disabled={sending}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />

                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  Paste a Google Drive or OneDrive link to your resume.
                  Please give {COMPANY.email} permission to view it.
                </p>
              </div>

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

      {/* AI internship application modal */}
      {showInternshipForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/70 px-3 py-5 backdrop-blur-sm sm:px-5 sm:py-7" role="dialog" aria-modal="true" aria-labelledby="internship-form-title">
          <div className="relative my-auto max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-white/70 bg-white shadow-2xl">
            <div
              className="relative min-h-[250px] overflow-hidden bg-cover bg-center px-6 py-8 text-white sm:min-h-[280px] sm:px-10 sm:py-10"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(3, 9, 38, 0.96) 0%, rgba(3, 9, 38, 0.82) 43%, rgba(3, 9, 38, 0.12) 100%), url('/internship-form-header.png')" }}
            >
              <button type="button" onClick={closeInternshipForm} disabled={sending} aria-label="Close internship application form" className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/90 transition hover:bg-white/15 disabled:opacity-40 sm:right-6 sm:top-6">
                <FiX size={25} />
              </button>
              <div className="relative z-10 max-w-[560px]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-300 sm:text-xs">Internship Program at RD AI Labs</p>
                <h2 id="internship-form-title" className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white">
                  Let’s start your<span className="block">AI journey.</span>
                </h2>
                <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-slate-200 sm:text-base">Tell us about yourself. We’re excited to learn about your interests!</p>
              </div>
            </div>

            <form onSubmit={handleInternshipSubmit} className="space-y-7 px-5 py-7 sm:px-10 sm:py-9">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="internship-full-name" className="mb-2 block text-sm font-bold text-slate-900">Full Name *</label>
                  <input id="internship-full-name" type="text" name="fullName" placeholder="Your full name" required maxLength={100} autoComplete="name" disabled={sending} className={`${FIELD_CLASS} rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                </div>
                <div>
                  <label htmlFor="internship-email" className="mb-2 block text-sm font-bold text-slate-900">Email Address *</label>
                  <input id="internship-email" type="email" name="email" placeholder="you@example.com" required maxLength={254} autoComplete="email" disabled={sending} className={`${FIELD_CLASS} rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                </div>
                <div>
                  <label htmlFor="internship-phone" className="mb-2 block text-sm font-bold text-slate-900">Phone Number *</label>
                  <input id="internship-phone" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required maxLength={20} autoComplete="tel" disabled={sending} className={`${FIELD_CLASS} rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                </div>
                <div>
                  <label htmlFor="internship-college" className="mb-2 block text-sm font-bold text-slate-900">College / Institution *</label>
                  <input id="internship-college" type="text" name="college" placeholder="Your college name" required maxLength={180} autoComplete="organization" disabled={sending} className={`${FIELD_CLASS} rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-7">
                <h3 className="font-display text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-[28px]">AI Learning Interests</h3>
                <div className="mt-5 space-y-6">
                  <div>
                    <label htmlFor="internship-skills" className="mb-2 block text-sm font-bold text-slate-900">Technical Skills <span className="font-medium">(Optional)</span></label>
                    <input id="internship-skills" type="text" name="skills" placeholder="e.g. Python, Machine Learning, Data Science..." maxLength={500} disabled={sending} className={`${FIELD_CLASS} rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                  </div>
                  <div>
                    <label htmlFor="internship-ai-interest" className="mb-2 block text-sm font-bold text-slate-900">Area of AI Interest <span className="font-medium">(Optional)</span></label>
                    <div className="relative">
                      <select id="internship-ai-interest" name="aiInterest" defaultValue="" disabled={sending} className={`${FIELD_CLASS} appearance-none rounded-2xl bg-slate-100/90 px-5 py-4 pr-12 text-base`} style={FIELD_STYLE}>
                        <option value="">Select your area of interest</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Generative AI">Generative AI</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Natural Language Processing (NLP)">Natural Language Processing (NLP)</option>
                        <option value="Computer Vision">Computer Vision</option>
                        <option value="Prompt Engineering">Prompt Engineering</option>
                        <option value="Other AI area">Other AI area</option>
                      </select>
                      <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-800" size={20} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="internship-additional-info" className="mb-2 block text-sm font-bold text-slate-900">Additional Information <span className="font-medium">(Optional)</span></label>
                    <textarea id="internship-additional-info" name="additionalInfo" rows={3} maxLength={2000} placeholder="Share any questions, expectations, learning goals, or other information you'd like us to know..." disabled={sending} className={`${FIELD_CLASS} resize-y rounded-2xl bg-slate-100/90 px-5 py-4 text-base`} style={FIELD_STYLE} />
                  </div>
                </div>
              </div>

              {submitStatus && (
                <div role="status" aria-live="polite" className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${submitStatus.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
                  {submitStatus.type === 'success' ? <FiCheckCircle className="mt-0.5 shrink-0" size={19} /> : <FiAlertCircle className="mt-0.5 shrink-0" size={19} />}
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <button type="submit" disabled={sending || submitStatus?.type === 'success'} className={`group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 px-6 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}>
                {sending ? <><FiLoader className="animate-spin" size={19} />Sending Application...</> : submitStatus?.type === 'success' ? <>Application Submitted<FiCheckCircle size={19} /></> : <>Submit Application<FiArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-slate-500">Your information will be shared with RD AI Labs for internship application purposes.</p>
              {submitStatus?.type === 'success' && (
                <button type="button" onClick={closeInternshipForm} className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">Close</button>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

