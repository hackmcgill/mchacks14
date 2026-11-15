import React, { useCallback, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import * as styleVars from "../variable"
import faqItems from "./data/faq"
import FaqCard from "./FaqCard"
import useScrollProgress from "./useScrollProgress"
import {
  TRACK_HEIGHT_SVH,
  WALL_RANGES,
  TILE_W,
  TILE_H,
  ESC_ANGLE_DEG,
  ESC_BOTTOM_OVERSHOOT,
  ESC_EXIT_SPAN,
  ESC_BEND,
  ESC_SPEED_RATIO,
  BEND_REF_X,
  STATIC_MODE_QUERY,
} from "./faqScene.config"
import {
  ESC_BAND_T,
  ESC_DEFAULT_LENGTH,
  ESC_LANDING_TOP_Y,
  artSize,
  bandLengthFor,
} from "./escalatorArt"
import Escalator from "./Escalator"

import tileUrl from "../../assets/images/wall-tile.webp"
import faqHeading from "../../assets/images/designs/mchacks14-faq-heading.webp"

const HEADING_W = 609
const HEADING_H = 100

const ESC_ANGLE = (ESC_ANGLE_DEG * Math.PI) / 180
const ESC_COS = Math.cos(ESC_ANGLE)
const ESC_SIN = Math.sin(ESC_ANGLE)
// Top landing's offset inside the art, per svh of band thickness (--esc-band).
const ESC_LANDING_PER_BAND = ESC_LANDING_TOP_Y / ESC_BAND_T

// Per-range pan geometry and card positions are delivered as CSS custom
// properties so the server-rendered markup is already right for any width:
//   --travel / --pan-tan : wall travel (viewport widths) and tan(pan angle)
//   --esc-band / --esc-y : escalator band thickness (svh) and start height of its landing
//   --knee               : the card x (vw) beyond which cards sit on the flat leg
//                          (the pan bends from diagonal to horizontal at ESC_BEND)
//   --cx / --cv          : the card's x (vw) and lane v (vh) for this range,
//                          picked from --x/--v (base) or --x-<name>/--v-<name>.
const rangeBlocks = WALL_RANGES.map((range) => {
  const tan = Math.tan((range.angleDeg * Math.PI) / 180)
  const suffix = range.maxWidth ? `-${range.name}` : ""
  const body = `--travel: ${range.travelX}; --pan-tan: ${tan}; --esc-band: ${range.escBandSvh}; --esc-y: ${range.escStartY}; --knee: ${BEND_REF_X + ESC_BEND * range.travelX * 100};`
  const card = `.faq-card { --cx: var(--x${suffix}); --cv: var(--v${suffix}); }`
  return range.maxWidth
    ? `@media (max-width: ${range.maxWidth}) { ${body} ${card} }`
    : `${body} ${card}`
}).join("\n  ")

// Wall camera at scroll progress p (px): diagonal until ESC_BEND, then
// horizontal only while the escalator leaves.
const cameraAt = (p, d) => ({
  x: p * d.travelX,
  y: Math.min(p, ESC_BEND) * d.travelY,
})

const CARD_BLACK = "#050505"

const Track = styled.section`
  ${rangeBlocks}
  /* Header band: room at the top of the wall for the heading image. Cards are
     pushed down by --head-band so nothing sits under it (the escalator is not:
     it hangs off the bottom-left of the screen, so it keeps its own position). */
  --head-w: min(46vw, 680px);
  --head-top: max(110px, 11vh);
  --head-top: max(110px, 11svh);
  --head-band: calc(var(--head-top) + var(--head-w) * ${HEADING_H / HEADING_W});
  position: relative;
  height: ${TRACK_HEIGHT_SVH}vh;
  height: ${TRACK_HEIGHT_SVH}svh;

  /* Heading image: lives on the wall, so it pans away with the cards and tiles.
     Centred on the first screen (50vw). */
  .faq-heading {
    position: absolute;
    left: 50vw;
    top: var(--head-top);
    transform: translateX(-50%);
    z-index: 0;
    margin: 0;
    font: inherit;
    pointer-events: none;
  }

  /* Zero-size probe so the script can read --head-band in px. */
  .faq-band {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: var(--head-band);
    pointer-events: none;
  }

  .faq-heading img {
    display: block;
    width: var(--head-w);
    height: auto;
  }

  .faq-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
    overflow: clip;
    background-color: #e4ebf2;
  }

  .faq-tiles {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw + ${TILE_W}px);
    height: calc(100vh + ${TILE_H}px);
    height: calc(100svh + ${TILE_H}px);
    background-repeat: repeat;
    background-position: 0 0;
    background-size: ${TILE_W}px ${TILE_H}px;
    will-change: transform;
  }

  .faq-wall {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw + var(--travel) * 100vw);
    height: calc(100vh + var(--travel) * var(--pan-tan) * 100vw);
    height: calc(100svh + var(--travel) * var(--pan-tan) * 100vw);
    z-index: 1; /* below the escalator: cards are part of the wall, so figures pass in front */
    will-change: transform;
  }

  /* Sized from the band thickness (the art scales with it). top = landing
     surface at --esc-y of the stage height, minus the landing's offset inside
     the art. Pure CSS so SSR is right. */
  .faq-escalator {
    position: absolute;
    left: 0;
    top: calc(
      var(--esc-y) * 100vh - ${ESC_LANDING_PER_BAND} * var(--esc-band) * 1vh
    );
    top: calc(
      var(--esc-y) * 100svh - ${ESC_LANDING_PER_BAND} * var(--esc-band) * 1svh
    );
    /* --esc-w / --esc-h: the art's size per svh of band (set by Escalator) */
    width: calc(var(--esc-w) * var(--esc-band) * 1vh);
    width: calc(var(--esc-w) * var(--esc-band) * 1svh);
    height: calc(var(--esc-h) * var(--esc-band) * 1vh);
    height: calc(var(--esc-h) * var(--esc-band) * 1svh);
    z-index: 2; /* in front of the wall (cards); clicks pass through to them */
    pointer-events: none;
    user-select: none;
    will-change: transform;
  }

  .faq-escalator svg {
    display: block;
    overflow: visible;
  }

  /* ---- Card ------------------------------------------------------------ */

  .faq-card {
    position: absolute;
    /* x along the wall; --v is the lane: vertical offset from the pan line,
       so a card's on-screen path is always parallel to the pan direction.
       The pan line is bent: it rises at --pan-tan until x = --knee, then is flat. */
    left: calc(var(--cx) * 1vw);
    top: calc(
      var(--cv) * 1vh + min(var(--cx), var(--knee)) * var(--pan-tan) * 1vw +
        var(--head-band)
    );
    top: calc(
      var(--cv) * 1svh + min(var(--cx), var(--knee)) * var(--pan-tan) * 1vw +
        var(--head-band)
    );
    width: clamp(260px, 30vw, 420px);
    z-index: 1;
    transform: rotate(var(--rot));
    transform-origin: top left;
    /* outline + shadow live out here: clip-path on the inner shape would cut them off */
    filter: drop-shadow(0 0 1.5px #e8edf3)
      drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.5));
  }

  .faq-card:focus-within {
    z-index: 2;
  }

  .faq-card[data-open="true"] {
    z-index: 3;
  }

  .faq-card:has(.faq-card__button:focus-visible) {
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff)
      drop-shadow(8px 8px 0 rgba(0, 0, 0, 0.5));
  }

  .faq-card__shape {
    background: ${CARD_BLACK};
    clip-path: polygon(0 0, 100% 5%, 100% 100%, 4% 100%);
  }

  .faq-card[data-shape="1"] .faq-card__shape {
    clip-path: polygon(0 4%, 100% 0, 96% 100%, 0 100%);
  }

  .faq-card[data-shape="2"] .faq-card__shape {
    clip-path: polygon(3% 0, 100% 0, 100% 95%, 0 100%);
  }

  .faq-card__heading {
    margin: 0;
  }

  .faq-card__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    margin: 0;
    padding: 18px 18px 18px 28px;
    border: 0;
    background: none;
    color: ${styleVars.m14GlowAmber200};
    font-family: "Instrument Sans", sans-serif;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    text-align: left;
    cursor: pointer;
  }

  /* Global CSS sets "button { outline: none }"; the clip-path would clip an
     outline on the shape anyway, so focus is shown on the toggle + question
     and as a white halo on the wrapper (see :has rule above). */
  .faq-card__button:focus-visible {
    outline: none;
  }

  .faq-card__question {
    font-family: "Instrument Sans", sans-serif;
    font-weight: 700;
    font-size: 1.6rem;
  }

  .faq-card__button:focus-visible .faq-card__question {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .faq-card__button:focus-visible .faq-card__toggle {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }

  .faq-card__toggle {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: transparent;

    &:hover {
      color: ${styleVars.m14GlowAmber100};
    }
  }

  .faq-card__toggle svg {
    transition: transform 0.3s ease;
  }

  .faq-card[data-open="true"] .faq-card__toggle svg {
    transform: rotate(180deg);
  }

  /* Grid-rows expand: 0fr -> 1fr. visibility keeps collapsed links out of the tab order. */
  .faq-card__panel {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows 0.35s ease,
      visibility 0s linear 0.35s;
  }

  .faq-card[data-open="true"] .faq-card__panel {
    grid-template-rows: 1fr;
    visibility: visible;
    transition:
      grid-template-rows 0.35s ease,
      visibility 0s linear 0s;
  }

  .faq-card__panel-inner {
    min-height: 0;
    overflow: hidden;
  }

  .faq-card__answer {
    padding: 0 30px 26px 28px;
    font-family: "Instrument Sans", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.45;
    color: ${styleVars.m14GlowAmber100};
  }

  .faq-card__answer a {
    color: ${styleVars.m14GlowAmber200};
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-card__panel,
    .faq-card__toggle svg {
      transition: none;
    }
  }

  /* ---- Static fallback: narrow screens or reduced motion ---------------- */

  @media ${STATIC_MODE_QUERY} {
    height: auto;

    .faq-stage {
      position: relative;
      height: auto;
      overflow: hidden;
      padding: 120px 16px 72px;
    }

    .faq-tiles {
      width: 100%;
      height: 100%;
      background-size: ${TILE_W / 2}px ${TILE_H / 2}px;
      transform: none !important;
    }

    .faq-wall {
      position: relative;
      width: auto !important;
      height: auto !important;
      max-width: 560px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 22px;
      transform: none !important;
    }

    .faq-heading {
      position: static;
      transform: none;
      align-self: center;
      width: 100%;
      max-width: 560px;
      margin-bottom: 8px;
    }

    .faq-heading img {
      width: 100%;
    }

    .faq-card {
      position: relative;
      left: auto;
      top: auto;
      width: 100%;
      transform: rotate(calc(var(--rot) / 4));
      transform-origin: center;
    }

    .faq-escalator {
      display: none;
    }

    /* Tablets and up: cards sit side by side and wrap onto the next row. */
    @media (min-width: ${styleVars.faqTabletUp}) {
      .faq-stage {
        padding: 120px 32px 88px;
      }

      .faq-wall {
        max-width: 960px;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 28px 24px;
      }

      .faq-card {
        width: calc((100% - 24px) / 2);
      }
    }

    @media (min-width: 1200px) {
      .faq-wall {
        max-width: 1280px;
      }

      .faq-card {
        width: calc((100% - 48px) / 3);
      }
    }
  }
`

const FaqEscalatorSection = ({ scrollRef }) => {
  const trackRef = useRef(null)
  const tilesRef = useRef(null)
  const wallRef = useRef(null)
  const escalatorRef = useRef(null)
  const bandRef = useRef(null)
  const staticModeRef = useRef(false)
  // Set by measure() for the current window; the default is for SSR only.
  const [bandLength, setBandLength] = useState(ESC_DEFAULT_LENGTH)
  const dimsRef = useRef({
    vw: 0,
    vh: 0,
    travelX: 0,
    travelY: 0,
    tan: 0,
    tileY0: 0,
    slopeTravel: 0,
    slideTravel: 0,
    band: 0,
  })

  // Share the track node with the page's nav ref (used by scrollTo on "FAQ").
  const setTrackRef = useCallback(
    (node) => {
      trackRef.current = node
      if (scrollRef) scrollRef.current = node
    },
    [scrollRef]
  )

  // Every transform is derived from progress. No React state per frame.
  const applyProgress = useCallback((progress) => {
    if (staticModeRef.current) return
    const wall = wallRef.current
    const tiles = tilesRef.current
    const escalator = escalatorRef.current
    if (!wall || !tiles || !escalator) return

    const dims = dimsRef.current
    const { slopeTravel, slideTravel, tileY0 } = dims
    const { x: dx, y: dy } = cameraAt(progress, dims)

    wall.style.transform = `translate3d(${-dx}px, ${-dy}px, 0)`
    tiles.style.transform = `translate3d(${-(dx % TILE_W)}px, ${-((dy + tileY0) % TILE_H)}px, 0)`

    // Escalator: exactly along the 20° slope for the diagonal leg (so the
    // slope's edge looks stationary) until its bottom reaches the bottom of the
    // screen, then straight left, quickly, and out of view.
    let ex
    let ey
    if (progress <= ESC_BEND) {
      const d = (progress / ESC_BEND) * slopeTravel
      ex = -d * ESC_COS
      ey = -d * ESC_SIN
    } else {
      const k = Math.min(1, (progress - ESC_BEND) / ESC_EXIT_SPAN)
      ex = -slopeTravel * ESC_COS - k * slideTravel
      ey = -slopeTravel * ESC_SIN
    }
    escalator.style.transform = `translate3d(${ex}px, ${ey}px, 0)`
  }, [])

  const { requestUpdate } = useScrollProgress(trackRef, applyProgress)

  useEffect(() => {
    const wall = wallRef.current
    const tiles = tilesRef.current
    const escalator = escalatorRef.current

    // The wall tiles must line up with the sections either side of the FAQ, which
    // each start their own tile pattern at their top edge. So the pattern's phase
    // at the top of the stage starts where the previous section's pattern ended
    // (its height), and the phase at the bottom of the stage at the end of the
    // pin is published as --faq-tile-x / --faq-tile-y for the next section's
    // background-position.
    const publishTilePhase = (x, y) => {
      const root = document.documentElement.style
      root.setProperty("--faq-tile-x", `${-x}px`)
      root.setProperty("--faq-tile-y", `${-y}px`)
    }
    function syncTilePhase() {
      const track = trackRef.current
      const stage = tiles && tiles.parentElement
      if (!track || !stage) return
      const prev = track.previousElementSibling
      const prevH = prev ? prev.offsetHeight : 0
      if (staticModeRef.current) {
        // Static list: half-size tiles, no transforms.
        const tileH = TILE_H / 2
        const y0 = prevH % tileH
        tiles.style.backgroundPosition = `0px ${-y0}px`
        publishTilePhase(0, (y0 + stage.offsetHeight) % tileH)
      } else {
        const dims = dimsRef.current
        dims.tileY0 = prevH % TILE_H
        tiles.style.backgroundPosition = ""
        const end = cameraAt(1, dims)
        publishTilePhase(
          end.x % TILE_W,
          (end.y + dims.tileY0 + stage.offsetHeight) % TILE_H
        )
        requestUpdate()
      }
    }

    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      // Pan geometry for the current width range (CSS custom properties).
      const cs = window.getComputedStyle(trackRef.current)
      const travel = parseFloat(cs.getPropertyValue("--travel")) || 0
      const tan = parseFloat(cs.getPropertyValue("--pan-tan")) || 0
      const travelX = travel * vw
      const travelY = travelX * tan

      // Escalator ride: during leg 1 it slides up along its slope, covering
      // ESC_SPEED_RATIO times the wall's horizontal travel, and ends with its
      // bottom edge just below the bottom of the screen. Its band length is
      // whatever makes both true here (the art scales with the stage height,
      // the wall's travel with its width).
      let slopeTravel = 0
      let slideTravel = 0
      if (escalator && escalator.offsetParent) {
        const stageH = escalator.offsetParent.clientHeight
        const escBand = parseFloat(cs.getPropertyValue("--esc-band")) || 0
        const unit = (escBand * stageH) / 100 / ESC_BAND_T // px per art unit
        const top0 = escalator.offsetTop // doesn't depend on the length
        const want = (ESC_SPEED_RATIO * ESC_BEND * travelX) / ESC_COS
        const length = Math.round(
          bandLengthFor(
            (want * ESC_SIN + ESC_BOTTOM_OVERSHOOT + stageH - top0) / unit
          )
        )
        setBandLength(length)
        const size = artSize(length)
        slopeTravel = Math.max(
          0,
          (top0 + size.h * unit - ESC_BOTTOM_OVERSHOOT - stageH) / ESC_SIN
        )
        // Then leave to the left, just far enough for its right edge to clear
        // the screen.
        slideTravel = Math.max(
          0,
          escalator.offsetLeft + size.w * unit - slopeTravel * ESC_COS + 8
        )
      }
      const band = bandRef.current ? bandRef.current.offsetHeight : 0
      dimsRef.current = {
        vw,
        vh,
        travelX,
        travelY,
        tan,
        tileY0: dimsRef.current.tileY0,
        slopeTravel,
        slideTravel,
        band,
      }
      if (wall) {
        const end = cameraAt(1, dimsRef.current)
        wall.style.width = `${vw + end.x}px`
        wall.style.height = `${vh + end.y}px`
      }
      syncTilePhase()
    }

    const clearInline = () => {
      for (const el of [wall, tiles, escalator]) {
        if (el) el.style.transform = ""
      }
      if (wall) {
        wall.style.width = ""
        wall.style.height = ""
      }
    }

    const mq = window.matchMedia(STATIC_MODE_QUERY)
    const syncMode = () => {
      staticModeRef.current = mq.matches
      if (mq.matches) {
        clearInline()
        syncTilePhase()
      } else {
        measure()
        requestUpdate()
      }
    }
    const onResize = () => {
      if (staticModeRef.current) syncTilePhase()
      else measure()
    }

    syncMode()
    // Section heights change without a window resize (images load, cards open).
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(onResize)
    if (observer) {
      observer.observe(tiles.parentElement)
      if (trackRef.current.previousElementSibling) {
        observer.observe(trackRef.current.previousElementSibling)
      }
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    if (mq.addEventListener) mq.addEventListener("change", syncMode)
    else mq.addListener(syncMode)

    return () => {
      if (observer) observer.disconnect()
      document.documentElement.style.removeProperty("--faq-tile-x")
      document.documentElement.style.removeProperty("--faq-tile-y")
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      if (mq.removeEventListener) mq.removeEventListener("change", syncMode)
      else mq.removeListener(syncMode)
    }
  }, [requestUpdate])

  // Keyboard focus: pan the scene so a focused (possibly off-screen) card is
  // brought to roughly the middle of the screen.
  const handleFocus = useCallback((event) => {
    if (staticModeRef.current) return
    const target = event.target
    // Only keyboard focus; a mouse click on a visible card shouldn't move the wall.
    if (target.matches && !target.matches(":focus-visible")) return

    const cardEl = target.closest("[data-faq-card]")
    const track = trackRef.current
    if (!cardEl || !track) return
    const item = faqItems.find((i) => i.id === cardEl.dataset.faqCard)
    if (!item) return

    // Keep the card clear of the fixed navbar (top) and the screen edges.
    const SAFE = { left: 24, right: 24, top: 120, bottom: 16 }
    const vh = window.innerHeight
    const vw = window.innerWidth

    // Already comfortably on screen? Leave the wall alone.
    const rect = cardEl.getBoundingClientRect()
    if (
      rect.top >= SAFE.top &&
      rect.bottom <= vh - SAFE.bottom &&
      rect.left >= SAFE.left &&
      rect.right <= vw - SAFE.right
    ) {
      return
    }

    const dims = dimsRef.current
    const { tan, band } = dims
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    const cardW = cardEl.offsetWidth
    const cardH = cardEl.offsetHeight
    // This card's position for the current width range (see the CSS vars).
    const cardStyle = window.getComputedStyle(cardEl)
    const cardX = parseFloat(cardStyle.getPropertyValue("--cx")) || 0
    const cardV = parseFloat(cardStyle.getPropertyValue("--cv")) || 0
    const knee = parseFloat(cardStyle.getPropertyValue("--knee")) || 0
    const left = (cardX / 100) * vw // card box on the wall, px
    // The pan line is bent: it rises at `tan` only up to the knee.
    const top =
      (cardV / 100) * vh + Math.min(cardX, knee) * (vw / 100) * tan + band

    // Cards tilt about their top-left corner, so use the rotated bounds.
    const rad = (item.rotate * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    const xs = [0, cardW * cos, -cardH * sin, cardW * cos - cardH * sin]
    const ys = [0, cardW * sin, cardH * cos, cardW * sin + cardH * cos]
    const bx0 = left + Math.min(...xs)
    const bx1 = left + Math.max(...xs)
    const by0 = top + Math.min(...ys)
    const by1 = top + Math.max(...ys)

    // The wall's camera at progress p (diagonal leg, then horizontal only).
    // Scan progress for the spot that keeps the whole card inside the safe
    // area (vertical fit counts double) and is closest to centring the card.
    const cx = left + cardW / 2
    const cy = top + Math.min(cardH, 90) / 2
    let p = 0
    let best = Infinity
    const STEPS = 400
    for (let i = 0; i <= STEPS; i++) {
      const q = i / STEPS
      const { x: camX, y: camY } = cameraAt(q, dims)
      const miss =
        Math.max(0, SAFE.left - (bx0 - camX)) +
        Math.max(0, bx1 - camX - (vw - SAFE.right)) +
        2 * Math.max(0, SAFE.top - (by0 - camY)) +
        2 * Math.max(0, by1 - camY - (vh - SAFE.bottom))
      const off = Math.hypot(cx - camX - vw * 0.5, cy - camY - vh * 0.45)
      const score = miss * 1000 + off
      if (score < best) {
        best = score
        p = q
      }
    }
    p = clamp01(p)

    const trackTop = track.getBoundingClientRect().top + window.scrollY
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({
      top: trackTop + p * (track.offsetHeight - vh),
      behavior: reduced ? "auto" : "smooth",
    })
  }, [])

  return (
    <Track ref={setTrackRef}>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={tileUrl}
          type="image/webp"
          fetchpriority="low"
        />
      </Helmet>
      <div className="faq-stage">
        <div
          className="faq-tiles"
          ref={tilesRef}
          aria-hidden="true"
          style={{ backgroundImage: `url(${tileUrl})` }}
        />
        <Escalator
          className="faq-escalator"
          ref={escalatorRef}
          bandLength={bandLength}
        />
        <div className="faq-wall" ref={wallRef} onFocus={handleFocus}>
          <div className="faq-band" ref={bandRef} aria-hidden="true" />
          <h2 className="faq-heading">
            <img
              src={faqHeading}
              alt="Frequently asked questions"
              width={HEADING_W}
              height={HEADING_H}
              draggable={false}
            />
          </h2>
          {faqItems.map((item, index) => (
            <FaqCard key={item.id} item={item} shape={index % 3} />
          ))}
        </div>
      </div>
    </Track>
  )
}

export default FaqEscalatorSection
