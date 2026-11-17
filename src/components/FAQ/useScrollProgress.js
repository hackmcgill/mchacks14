import { useCallback, useEffect, useRef } from "react"

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * Scroll progress (0 → 1) of a tall "track" element, from the moment its top
 * reaches the top of the viewport until its bottom reaches the bottom of the
 * viewport. Clamped, so it is 0 before the track and 1 after it.
 */
export const computeProgress = (track) => {
  const rect = track.getBoundingClientRect()
  const range = rect.height - window.innerHeight
  if (range <= 0) return 0
  return clamp(-rect.top / range, 0, 1)
}

/**
 * rAF-throttled progress for a track ref. Deliberately NOT React state: the
 * callback is invoked at most once per frame and is expected to write styles
 * straight to DOM refs. Returns `requestUpdate` to force a recompute (e.g.
 * after a resize or a mode switch).
 *
 * SSR-safe: window is only touched inside effects.
 */
const useScrollProgress = (trackRef, onProgress) => {
  const callbackRef = useRef(onProgress)
  callbackRef.current = onProgress
  const frameRef = useRef(0)

  const requestUpdate = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0
      const track = trackRef.current
      if (track) callbackRef.current(computeProgress(track))
    })
  }, [trackRef])

  useEffect(() => {
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    window.addEventListener("orientationchange", requestUpdate)
    requestUpdate()
    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      window.removeEventListener("orientationchange", requestUpdate)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
  }, [requestUpdate])

  return { requestUpdate }
}

export default useScrollProgress
