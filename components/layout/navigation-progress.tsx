'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const COMPLETE_DELAY = 220

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeKey = `${pathname}?${searchParams.toString()}`
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const activeRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousRouteRef = useRef(routeKey)

  useEffect(() => {
    const clearTimers = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }

    const start = () => {
      clearTimers()
      activeRef.current = true
      setVisible(true)
      setProgress(12)

      requestAnimationFrame(() => setProgress(28))
      intervalRef.current = setInterval(() => {
        setProgress((current) => {
          if (current >= 88) return current
          return current + Math.max(1, (88 - current) * 0.12)
        })
      }, 180)
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const destination = new URL(anchor.href, window.location.href)
      const current = new URL(window.location.href)

      if (
        destination.origin !== current.origin ||
        (destination.pathname === current.pathname &&
          destination.search === current.search)
      ) {
        return
      }

      start()
    }

    document.addEventListener('click', handleClick, true)
    window.addEventListener('popstate', start)

    return () => {
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('popstate', start)
      clearTimers()
    }
  }, [])

  useEffect(() => {
    if (previousRouteRef.current === routeKey) return
    previousRouteRef.current = routeKey
    if (!activeRef.current) return

    activeRef.current = false
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(100)

    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, COMPLETE_DELAY)
  }, [routeKey])

  return (
    <div
      className={`navigation-progress${visible ? ' navigation-progress--visible' : ''}`}
      role="progressbar"
      aria-label="Memuat halaman"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <span
        className="navigation-progress__bar"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
