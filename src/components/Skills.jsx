import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FiCheck,
  FiCheckCircle,
  FiGitBranch,
  FiGitCommit,
  FiLayers,
  FiPackage,
  FiPlay,
  FiShield,
  FiUploadCloud,
  FiZap,
} from 'react-icons/fi'
import { SKILL_SCENES } from '../data'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]
const AUTO_MS = 2000

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf1ea]'

/* Same soft gradient look as the hero: blue top-right, orange bottom-left, pink base glow */
const SECTION_BG = {
  background:
    'radial-gradient(55% 50% at 100% 0%, rgba(111,156,240,.45) 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(55% 55% at 0% 100%, rgba(255,179,71,.42) 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(45% 40% at 60% 100%, rgba(244,143,177,.30) 0%, rgba(244,143,177,0) 70%),' +
    '#fbf1ea',
}

/* Icon for each scene id (ids come from SKILL_SCENES in data.js) */
const SCENE_ICONS = {
  react: FiLayers,
  playwright: FiPlay,
  devops: FiGitBranch,
}

/* -------------------------------------------------------------------------- */
/*  Shared window chrome for the preview UIs                                   */
/* -------------------------------------------------------------------------- */

function Window({ title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-950/90 shadow-2xl shadow-slate-900/25 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 truncate text-xs font-medium text-slate-400">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function AiBadge() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
      <FiZap size={12} aria-hidden="true" />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scene 1: React, AI component builder                                       */
/* -------------------------------------------------------------------------- */

function ReactPreview() {
  return (
    <Window title="AI component builder">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <div className="space-y-3">
          <div className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-md bg-indigo-500 px-3.5 py-2.5 text-xs leading-5 text-white">
            Create a responsive pricing card with a monthly and yearly toggle.
          </div>

          <div className="flex items-start gap-2">
            <AiBadge />
            <div className="rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-xs leading-5 text-slate-200">
              Done. I generated{' '}
              <span className="font-semibold text-white">PricingCard.jsx</span>{' '}
              with an accessible toggle and responsive styles.
            </div>
          </div>

          <div className="rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-5 text-slate-400">
            <p>
              <span className="text-pink-400">const</span>{' '}
              <span className="text-sky-300">[yearly, setYearly]</span> =
              useState(false)
            </p>
            <p>
              &lt;<span className="text-emerald-300">PricingCard</span>{' '}
              plan="Pro" /&gt;
            </p>
          </div>
        </div>

        {/* Live preview */}
        <div className="rounded-xl bg-white p-4 text-slate-900 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600">Pro</span>
            <span className="flex rounded-full bg-slate-100 p-0.5 text-[10px] font-semibold">
              <span className="rounded-full bg-white px-2 py-0.5 shadow-sm">
                Monthly
              </span>
              <span className="px-2 py-0.5 text-slate-500">Yearly</span>
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            $29
            <span className="text-xs font-medium text-slate-500"> /mo</span>
          </p>

          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {['Unlimited projects', 'Priority support', 'Team analytics'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <FiCheck
                    size={13}
                    aria-hidden="true"
                    className="text-emerald-600"
                  />
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="mt-4 rounded-lg bg-slate-950 py-2 text-center text-xs font-semibold text-white">
            Get started
          </div>
        </div>
      </div>
    </Window>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scene 2: Playwright, AI-assisted test run                                  */
/* -------------------------------------------------------------------------- */

const TESTS = [
  { name: 'Login with valid credentials', time: '1.2s' },
  { name: 'Checkout completes payment', time: '3.4s' },
  { name: 'Dashboard renders on mobile', time: '0.9s' },
  { name: 'Search filters results', time: '1.6s' },
]

const BROWSERS = ['Chromium', 'Firefox', 'WebKit']

function PlaywrightPreview() {
  return (
    <Window title="Playwright test run">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-slate-400">
            <span className="text-emerald-400">$</span> npx playwright test
          </p>

          <div className="flex flex-wrap gap-1.5">
            {BROWSERS.map((browser) => (
              <span
                key={browser}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300"
              >
                <FiCheck size={11} aria-hidden="true" />
                {browser}
              </span>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {TESTS.map((test) => (
            <li
              key={test.name}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs"
            >
              <span className="flex items-center gap-2.5 text-slate-200">
                <FiCheckCircle
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-emerald-400"
                />
                {test.name}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {test.time}
              </span>
            </li>
          ))}
        </ul>

        {/* AI suggestion */}
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-sky-400/40 bg-sky-400/5 px-3.5 py-3">
          <AiBadge />
          <p className="flex-1 text-xs leading-5 text-slate-300">
            <span className="font-semibold text-white">AI suggestion:</span>{' '}
            add a test for an expired session on checkout.
          </p>
          <span className="shrink-0 rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white">
            Generate
          </span>
        </div>

        <p className="text-xs font-semibold text-emerald-300">
          4 passed <span className="font-normal text-slate-500">(7.1s)</span>
        </p>
      </div>
    </Window>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scene 3: DevOps, CI/CD pipeline run                                        */
/* -------------------------------------------------------------------------- */

const STAGES = [
  { label: 'Commit', icon: FiGitCommit, state: 'done' },
  { label: 'Build', icon: FiPackage, state: 'done' },
  { label: 'Test', icon: FiCheckCircle, state: 'done' },
  { label: 'Scan', icon: FiShield, state: 'done' },
  { label: 'Deploy', icon: FiUploadCloud, state: 'running' },
]

const LOGS = [
  'build completed in 42s',
  '48 tests passed across 3 browsers',
  'no critical vulnerabilities found',
]

function DevopsPreview() {
  return (
    <Window title="CI/CD pipeline #128">
      <div className="space-y-4 p-4 sm:p-5">
        {/* Stages */}
        <div className="relative grid grid-cols-5 gap-1">
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-5 h-px bg-white/15"
          />
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-5 h-px w-[60%] bg-gradient-to-r from-emerald-400 to-sky-400"
          />

          {STAGES.map((stage) => {
            const Icon = stage.icon
            const running = stage.state === 'running'

            return (
              <div
                key={stage.label}
                className="relative flex flex-col items-center gap-2"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    running
                      ? 'border-sky-300/60 bg-sky-500 text-white ring-4 ring-sky-500/20 motion-safe:animate-pulse'
                      : 'border-emerald-400/40 bg-slate-900 text-emerald-300'
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-semibold text-slate-300 sm:text-[11px]">
                  {stage.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Logs */}
        <div className="rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-6 text-slate-400">
          {LOGS.map((line) => (
            <p key={line}>
              <span className="text-emerald-400">✓</span> {line}
            </p>
          ))}
          <p>
            <span className="text-sky-300">›</span> deploying to production…
          </p>
        </div>

        {/* AI release assistant */}
        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
          <AiBadge />
          <div className="text-xs leading-5 text-slate-300">
            <p className="font-semibold text-white">
              AI release check:{' '}
              <span className="text-emerald-300">Low risk</span>
            </p>
            <p className="mt-0.5">
              All tests passed, no new vulnerabilities, and rollback is ready.
            </p>
          </div>
        </div>
      </div>
    </Window>
  )
}

const PREVIEWS = {
  react: ReactPreview,
  playwright: PlaywrightPreview,
  devops: DevopsPreview,
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Skills() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = SKILL_SCENES.length
  const scene = SKILL_SCENES[active]
  const Preview = PREVIEWS[scene.id]

  /* Auto-advance through the three scenes; pauses on hover or focus */
  useEffect(() => {
    if (reduce || paused) return undefined
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total)
    }, AUTO_MS)
    return () => clearInterval(timer)
  }, [reduce, paused, total])

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -10 },
    transition: { duration: reduce ? 0 : 0.35, ease: EASE },
  }

  return (
    <section
      id="skills"
     className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-11"
      style={SECTION_BG}
    >
      <div className="container-x relative mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal>
          <div className="mb-10 max-w-3xl sm:mb-12">
            <p className="mb-3 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-700 sm:text-[11px]">
              <span className="h-px w-7 bg-indigo-600" aria-hidden="true" />
              Skills & Delivery
            </p>

            <h2 className="font-display text-[clamp(1.9rem,3.5vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-950">
              Build it, test it, ship it.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              Our engineers cover the full delivery pipeline, from the
              first component to the production release, with AI
              assisting at every stage.
            </p>
          </div>
        </Reveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Pipeline stepper */}
          <div className="relative mx-auto mb-10 grid max-w-3xl grid-cols-3 gap-3 sm:mb-12">
            <div
              aria-hidden="true"
              className="absolute left-[16.667%] right-[16.667%] top-6 h-px bg-slate-900/15"
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-[16.667%] top-6 h-px bg-gradient-to-r from-sky-500 to-indigo-600"
              initial={false}
              animate={{
                width: `${(active / (total - 1)) * 66.667}%`,
              }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            />

            {SKILL_SCENES.map((item, index) => {
              const Icon = SCENE_ICONS[item.id]
              const isActive = index === active
              const isDone = index < active

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`group relative flex flex-col items-center gap-2.5 rounded-xl py-1 text-center ${FOCUS}`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition duration-300 motion-reduce:transition-none ${
                      isActive
                        ? 'border-sky-300/60 bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/15'
                        : isDone
                          ? 'border-indigo-300 bg-white text-indigo-600'
                          : 'border-slate-900/10 bg-white text-slate-500 group-hover:text-slate-950'
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <span className="flex flex-col">
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? 'text-slate-950' : 'text-slate-500'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {item.skill}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Scene content */}
          <div
            className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            aria-live="polite"
          >
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={scene.id} {...fade}>
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-slate-950 sm:text-3xl">
                    {scene.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
                    {scene.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {scene.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                          <FiCheck size={12} aria-hidden="true" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {scene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-7" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={scene.id} {...fade}>
                  <Preview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 