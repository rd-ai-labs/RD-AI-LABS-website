import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL } from '../legalContent'

export default function LegalPage({ kind }) {
  const doc = LEGAL[kind]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = doc ? `${doc.title} | RD AI Labs` : 'Page not found | RD AI Labs'
  }, [doc])

  // Unknown page (kind="404")
  if (!doc) {
    return (
      <main className="min-h-screen bg-white px-5 pb-16 pt-32 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight">Page not found</h1>
          <p className="mt-4 leading-relaxed">The page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-5 pb-16 pt-32 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">{doc.title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last Updated: {doc.updated}</p>
        <p className="mt-6 leading-relaxed">{doc.intro}</p>

        {doc.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-xl font-bold">{s.heading}</h2>
            {s.text && <p className="mt-3 leading-relaxed">{s.text}</p>}
            {s.items && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}