import React, { useEffect, useRef } from "react"
import HeroStyles from "./HeroStyles"
import McHacksLogo from "../../assets/images/designs/mchacks14-hero-logo.webp"
import McHacksLogoMobile from "../../assets/images/designs/mchacks14-hero-logo-mobile.webp"

const apply = () => {
  window.location = "https://app.mchacks.ca/"
}

/* ----- tuning constants ---------------------------------------------------- */
const STAGE_VH = 200 // total height of the scroll stage (vh)
const SCENE_MAX = 3 // extra scale applied to the scene at full zoom
const LAMP_MAX = 5 // extra scale applied to the lamp (faster = parallax depth)
const VEIL_OPEN = 80 // vignette hole radius (vmax) that counts as fully open
const FADE_END = 0.20 // fraction of zoom progress over which the hero UI fades out
const CLOSE_START = 0.01 // zoom progress at which the fade-to-black begins

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

const Hero = () => {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    // Desktop with a real mouse/trackpad only.
    const enabledQuery = window.matchMedia(
      "(min-width: 769px) and (hover: hover) and (pointer: fine)"
    )

    let rafId = null
    let ticking = false
    const root = stage.style

    const setVars = (zoom, lamp, fade, veil) => {
      root.setProperty("--hero-zoom", zoom.toFixed(3))
      root.setProperty("--hero-lamp", lamp.toFixed(3))
      root.setProperty("--hero-fade", fade.toFixed(3))
      root.setProperty("--hero-veil", veil.toFixed(2))
    }

    const reset = () => setVars(1, 1, 1, VEIL_OPEN)

    const update = () => {
      ticking = false
      // When the effect is off, hold everything at rest
      if (!enabled) return reset()
      const vh = window.innerHeight
      const top = -stage.getBoundingClientRect().top
      const runway = stage.offsetHeight - vh // scroll distance while pinned
      if (runway <= 0) return reset()

      // zp: 0 at the top of the stage, 1 once we've scrolled through the pin.
      const zp = clamp01(top / runway)
      const zoomT = easeInOut(clamp01(zp / 0.85))
      const zoom = 1 + zoomT * SCENE_MAX
      const lamp = 1 + zoomT * LAMP_MAX
      const fade = 1 - clamp01(zp / FADE_END)

      // Vignette: close to black over the back half of the pin, then open again
      // as the following section rises to fill the viewport.
      let veil
      if (zp < 1) {
        const closeT = easeInOut(clamp01((zp - CLOSE_START) / (1 - CLOSE_START)))
        veil = VEIL_OPEN * (1 - closeT)
      } else {
        const next = stage.nextElementSibling
        const nextTop = next ? next.getBoundingClientRect().top : -vh
        // Open while the next section travels from ~55% down the screen to the top.
        const openT = easeInOut(clamp01((0.55 * vh - nextTop) / (0.6 * vh)))
        veil = VEIL_OPEN * openT
      }

      setVars(zoom, lamp, fade, veil)
    }

    const onScroll = () => {
      if (!enabled || ticking) return
      ticking = true
      rafId = window.requestAnimationFrame(update)
    }

    let enabled = false
    const applyMode = () => {
      enabled = enabledQuery.matches && !motionQuery.matches
      if (enabled) {
        stage.dataset.anim = "on"
        root.setProperty("--hero-stage-height", `${STAGE_VH}vh`)
        update()
      } else {
        stage.dataset.anim = "off"
        reset()
      }
    }

    const onResize = () => {
      applyMode()
      if (enabled) onScroll()
    }

    applyMode()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    // matchMedia change (e.g. OS reduced-motion toggle, rotating a tablet)
    enabledQuery.addEventListener?.("change", onResize)
    motionQuery.addEventListener?.("change", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      enabledQuery.removeEventListener?.("change", onResize)
      motionQuery.removeEventListener?.("change", onResize)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <HeroStyles ref={stageRef} data-anim="off">
      <div className="hero-sticky">
        <div className="hero-layer hero-scene" aria-hidden="true" />
        <div className="hero-layer hero-lamp" aria-hidden="true" />

        <div className="hero-content">
          <h1 className="hero__heading">McHacks 14</h1>
          <div className="hero__images-container">
          <picture>
            <source media="(max-width: 560px)" srcSet={McHacksLogoMobile}/>
            <img
              className="hero__heading-image"
              src={McHacksLogo}
              alt="McHacks 14"
            />
          </picture>
          </div>
        </div>

        <div className="hero__hit-frame">
          <button
            type="button"
            className="invisible-apply"
            onClick={apply}
            aria-label="Click me to apply"
          />
        </div>
      </div>

      <div className="hero-veil" aria-hidden="true" />
    </HeroStyles>
  )
}

export default Hero
