
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useGoTo } from '../hooks'

const HeroScene = lazy(() => import('./HeroScene'))

const HERO_BG = {
  background:
    'radial-gradient(65% 75% at 0% 100%, rgba(255,181,75,0.95) 0%, rgba(255,181,75,0) 75%),' +
    'radial-gradient(65% 70% at 48% 100%, rgba(247,132,111,0.82) 0%, rgba(247,132,111,0) 75%),' +
    'radial-gradient(60% 75% at 100% 0%, rgba(104,151,242,0.95) 0%, rgba(104,151,242,0) 75%),' +
    'radial-gradient(55% 65% at 100% 100%, rgba(197,190,239,0.85) 0%, rgba(197,190,239,0) 75%),' +
    '#fbf1ea',
}

const EASE = [0.22, 1, 0.36, 1]
const SCENE_MIN_WIDTH = 440

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false

  return (
    (navigator.hardwareConcurrency || 8) <= 2 ||
    (navigator.deviceMemory || 8) <= 2
  )
}

function SceneFrame({ ready, active }) {
  const frameRef = useRef(null)
  const [frameWidth, setFrameWidth] = useState(0)

  useEffect(() => {
    const element = frameRef.current
    if (!element) return undefined

    const update = () => setFrameWidth(element.clientWidth)
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const designWidth = Math.max(SCENE_MIN_WIDTH, frameWidth)
  const scale = frameWidth > 0 ? frameWidth / designWidth : 1

  return (
    <motion.div
      className="mx-auto w-full max-w-[620px] px-1 sm:px-0 lg:max-w-none"
      initial={false}
      animate={
        ready
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/3] w-full"
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: designWidth,
            transform: `scale(${scale})`,
          }}
        >
          <Suspense
            fallback={
              <div className="aspect-[4/3] w-full" aria-hidden="true" />
            }
          >
            <HeroScene active={active} ready={ready} />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const headline = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.12,
    },
  },
}

const word = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

const HEADLINE_LINES = [
  [
    { text: 'Any', accent: false },
    { text: 'Software', accent: false },
    { text: 'Challenge.', accent: true },
  ],
  [
    { text: 'Any', accent: false },
    { text: 'Scale.', accent: true },
  ],
  [
    { text: 'Solved', accent: false },
    { text: 'from the', accent: false },
    { text: 'Ground Up.', accent: true },
  ],
]

export default function Hero({ ready = true }) {
  const goTo = useGoTo()
  const sectionRef = useRef(null)

  const [inView, setInView] = useState(true)
  const [lowEnd, setLowEnd] = useState(false)

  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const textY = useTransform(scrollY, [0, 450], [0, -25])
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0.9])

  useEffect(() => {
    setLowEnd(isLowEndDevice())
  }, [])

  useEffect(() => {
    const element = sectionRef.current

    if (!element || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={HERO_BG}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-28"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[35%] top-[35%] h-72 w-72 rounded-full bg-white/20 blur-[100px] sm:h-96 sm:w-96" />
        <div className="absolute right-[15%] top-[15%] h-48 w-48 rounded-full bg-white/20 blur-[90px]" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-white/30" />
      </div>

      <div className="container-x relative z-10 mx-auto grid w-full max-w-7xl items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-x-5 xl:gap-x-8">

        {/* Left: Hero content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="min-w-0 lg:col-span-6"
          style={
            reduceMotion
              ? undefined
              : { y: textY, opacity: textOpacity }
          }
        >
          {/* Positioning label */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md sm:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-600 opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-700" />
              </span>
              Enterprise Engineering. Startup Agility hi.
            </span>
          </motion.div>

          {/* Smaller headline */}
          <motion.h1
            variants={headline}
            className="mt-6 max-w-[680px] font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.045em] text-slate-950 [text-wrap:balance] sm:mt-7"
          >
            {HEADLINE_LINES.map((line, lineIndex) => (
              <span
                key={lineIndex}
                className="block"
              >
                {line.map((item, itemIndex) => (
                  <motion.span
                    key={`${item.text}-${itemIndex}`}
                    variants={word}
                    className={`mr-[0.2em] inline-block ${
                      item.accent
                        ? 'bg-gradient-to-r from-indigo-700 via-violet-600 to-purple-500 bg-clip-text text-transparent'
                        : ''
                    }`}
                  >
                    {item.text}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Shorter description with smaller text */}
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[540px] text-[12px] leading-[1.75] text-slate-700 sm:mt-5 sm:text-[13px] sm:leading-[1.8]"
          >
            We combine over two decades of enterprise engineering
            leadership with emerging talent from small towns to build
            dependable software and AI solutions. From local businesses
            to global enterprises, we deliver thoughtful technology
            with quality, agility and cost efficiency.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={() => goTo('services')}
              className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-3 text-[13px] font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 sm:text-sm"
            >
              Explore Our Services

              <FiArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => goTo('contact')}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-900/50 bg-white/20 px-7 py-3 text-[13px] font-semibold text-slate-950 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 sm:text-sm"
            >
              Contact Us
            </button>
          </motion.div>

          {/* Supporting statement */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
          >
            <span className="h-px w-8 bg-violet-700/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 sm:text-xs">
              Local Roots. Global Standards. Limitless Possibilities.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Existing animated robot scene */}
        <div className="min-w-0 lg:col-span-6">
          <SceneFrame
            ready={ready}
            active={inView && !lowEnd && !reduceMotion}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => goTo('services')}
        aria-label="Scroll to services"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-slate-700 transition hover:bg-white/30 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 lg:block"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="block"
        >
          <FiChevronDown size={25} aria-hidden="true" / >
        </motion.span>
      </button>
    </section>
  )
}
