import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import teamSlides from "./teamSlides"
import TeamMemberCard, { CARD_HEIGHT, CARD_WIDTH } from "./TeamMemberCard"

const SPEED = 50

const Viewport = styled.div`
  overflow: hidden;

  ${(props) =>
    props.$inline
      ? `
    width: clamp(280px, 42vw, 560px);
    max-width: 70vw;
  `
      : `
    width: 100vw;
    margin-left: calc(50% - 50vw);
  `}
`

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: clamp(10px, 1.5vw, 22px);
  backface-visibility: hidden;
  will-change: transform;
`

const TeamMarquee = ({ active, inline = false, backgroundRef }) => {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const carouselPausedRef = useRef(false)
  const viewportVisibleRef = useRef(true)

  const startRef = useRef(() => {})
  const stopRef = useRef(() => {})

  const setCarouselPaused = useCallback((isPaused) => {
    carouselPausedRef.current = isPaused
    if (isPaused) stopRef.current()
    else if (viewportVisibleRef.current) startRef.current()
  }, [])

  useEffect(() => {
    if (!active) return undefined

    const viewport = viewportRef.current
    const track = trackRef.current
    const background = backgroundRef?.current
    if (!viewport || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined
    }

    let offset = 0
    let lastTime = 0
    let loopWidth = 0
    let paused = false
    let frame = 0
    let bgTile = 960

    const measure = () => {
      loopWidth = track.scrollWidth / 2
      if (background) {
        const size = getComputedStyle(background).backgroundSize.split(" ")[0]
        bgTile = parseFloat(size) || bgTile
      }
    }
    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    if (background) resizeObserver.observe(background)

    const tick = (time) => {
      const animating = !paused && !carouselPausedRef.current && loopWidth > 0

      if (animating) {
        const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
        lastTime = time
        offset = (offset + SPEED * delta) % loopWidth
        track.style.transform = `translate3d(${offset - loopWidth}px, 0, 0)`
        frame = requestAnimationFrame(tick)
      } else {
        lastTime = 0
      }
    }

    const start = () => {
      if (frame || paused || carouselPausedRef.current) return
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting
        viewportVisibleRef.current = entry.isIntersecting
        if (!paused && !carouselPausedRef.current) start()
        else stop()
      },
      { rootMargin: "80px" }
    )
    intersectionObserver.observe(viewport)

    startRef.current = start
    stopRef.current = stop
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      track.style.transform = ""
      carouselPausedRef.current = false
      if (background) background.style.backgroundPosition = ""
    }
  }, [active, backgroundRef])

  if (!teamSlides.length) return null

  const loopSlides = [...teamSlides, ...teamSlides]

  return (
    <Viewport
      ref={viewportRef}
      $inline={inline}
      onMouseEnter={() => setCarouselPaused(true)}
      onMouseLeave={() => setCarouselPaused(false)}
    >
      <Track ref={trackRef} aria-label="McHacks organizing team">
        {loopSlides.map(({ id, name, src, hoverSrc, profileUrl }, index) => (
          <TeamMemberCard
            key={`${id}-${index}`}
            name={name}
            src={src}
            hoverSrc={hoverSrc}
            profileUrl={profileUrl}
            eagerLoad={index < 6}
          />
        ))}
      </Track>
    </Viewport>
  )
}

export default TeamMarquee
export { CARD_WIDTH, CARD_HEIGHT }
