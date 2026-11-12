
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Navigate to a section on the homepage.
 * Supports same-page scrolling and navigation from other routes.
 */
export function useGoTo() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (id) => {
      if (!id) return

      if (pathname !== '/') {
        navigate(`/#${id}`)
        return
      }

      // Update the URL hash without reloading the page.
      window.history.pushState(null, '', `/#${id}`)

      // Scroll to the requested section.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    },
    [pathname, navigate]
  )
}
