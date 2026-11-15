import React, { useCallback, useEffect, useRef } from "react"
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
  BEND_REF_X,
  ESC_VIEWBOX_W,
  ESC_VIEWBOX_H,
  ESC_LANDING_TOP_Y,
  STATIC_MODE_QUERY,
} from "./faqScene.config"

import tileUrl from "../../assets/images/wall-tile.webp"
import escalatorUrl from "../../assets/images/faq/escalator.webp"

const ESC_ANGLE = (ESC_ANGLE_DEG * Math.PI) / 180
const ESC_COS = Math.cos(ESC_ANGLE)
const ESC_SIN = Math.sin(ESC_ANGLE)

// Per-range pan geometry and card positions are delivered as CSS custom
// properties so the server-rendered markup is already right for any width:
//   --travel / --pan-tan : wall travel (viewport widths) and tan(pan angle)
//   --esc-h / --esc-y    : escalator height (svh) and start height of its landing
//   --bend / --knee      : where the pan bends from diagonal to horizontal (fraction
//                          of scroll) and the card x (vw) beyond which cards sit on
//                          the flat leg
//   --cx / --cv          : the card's x (vw) and lane v (vh) for this range,
//                          picked from --x/--v (base) or --x-<name>/--v-<name>.
const rangeBlocks = WALL_RANGES.map((range) => {
  const tan = Math.tan((range.angleDeg * Math.PI) / 180)
  const suffix = range.maxWidth ? `-${range.name}` : ""
  const body = `--travel: ${range.travelX}; --pan-tan: ${tan}; --esc-h: ${range.escHeightSvh}; --esc-y: ${range.escStartY}; --bend: ${range.bend}; --vert-screens: ${range.vertScreens}; --knee: ${BEND_REF_X + range.bend * range.travelX * 100};`
  const card = `.faq-card { --cx: var(--x${suffix}); --cv: var(--v${suffix}); }`
  return range.maxWidth
    ? `@media (max-width: ${range.maxWidth}) { ${body} ${card} }`
    : `${body} ${card}`
}).join("\n  ")

// Wall camera at scroll progress p (px): diagonal until `bend`, horizontal until
// the escalator has left (`bend + ESC_EXIT_SPAN`), then vertical only.
const cameraAt = (p, d) => {
  const end = Math.min(1, d.bend + ESC_EXIT_SPAN)
  return {
    x: Math.min(p, end) * d.travelX,
    y: Math.min(p, d.bend) * d.travelY + Math.max(0, p - end) * d.vertSpeed,
  }
}

const CARD_BLACK = "#050505"

const Track = styled.section`
  ${rangeBlocks}
  position: relative;
  height: ${TRACK_HEIGHT_SVH}vh;
  height: ${TRACK_HEIGHT_SVH}svh;

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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
    z-index: 1; /* the escalator (and its figures) is drawn above the cards */
    will-change: transform;
  }

  .faq-escalator {
    position: absolute;
    left: 0;
    /* top = landing surface at --esc-y of the stage height, minus the
       landing's offset inside the image. Pure CSS so SSR is right. */
    top: calc(
      var(--esc-y) * 100vh - ${ESC_LANDING_TOP_Y / ESC_VIEWBOX_H} * var(--esc-h) *
        1vh
    );
    top: calc(
      var(--esc-y) * 100svh - ${ESC_LANDING_TOP_Y / ESC_VIEWBOX_H} *
        var(--esc-h) * 1svh
    );
    height: calc(var(--esc-h) * 1vh);
    height: calc(var(--esc-h) * 1svh);
    width: auto;
    max-width: none;
    z-index: 2;
    pointer-events: none;
    user-select: none;
    will-change: transform;
  }

  /* ---- Card ------------------------------------------------------------ */

  .faq-card {
    position: absolute;
    /* x along the wall; --v is the lane: vertical offset from the pan line,
       so a card's on-screen path is always parallel to the pan direction.
       The pan line is bent: it rises at --pan-tan until x = --knee, then is flat. */
    left: calc(var(--cx) * 1vw);
    top: calc(
      var(--cv) * 1vh + min(var(--cx), var(--knee)) * var(--pan-tan) * 1vw
    );
    top: calc(
      var(--cv) * 1svh + min(var(--cx), var(--knee)) * var(--pan-tan) * 1vw
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
    font: inherit;
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
    font-size: 1.7rem;
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
  const staticModeRef = useRef(false)
  const dimsRef = useRef({
    vw: 0,
    vh: 0,
    s: 0,
    travelX: 0,
    travelY: 0,
    tan: 0,
    bend: 1,
    vertSpeed: 0,
    slopeTravel: 0,
    slideTravel: 0,
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
    const { bend, slopeTravel, slideTravel } = dims
    const { x: dx, y: dy } = cameraAt(progress, dims)

    wall.style.transform = `translate3d(${-dx}px, ${-dy}px, 0)`
    tiles.style.transform = `translate3d(${-(dx % TILE_W)}px, ${-(dy % TILE_H)}px, 0)`

    // Escalator: exactly along the 20° slope for the diagonal leg (so the
    // slope's edge looks stationary) until its bottom reaches the bottom of the
    // screen, then straight left, quickly, and out of view.
    let ex
    let ey
    if (progress <= bend) {
      const d = bend ? (progress / bend) * slopeTravel : slopeTravel
      ex = -d * ESC_COS
      ey = -d * ESC_SIN
    } else {
      const k = Math.min(1, (progress - bend) / ESC_EXIT_SPAN)
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

    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      // Pan geometry for the current width range (CSS custom properties).
      const cs = window.getComputedStyle(trackRef.current)
      const travel = parseFloat(cs.getPropertyValue("--travel")) || 0
      const tan = parseFloat(cs.getPropertyValue("--pan-tan")) || 0
      const travelX = travel * vw
      const travelY = travelX * tan
      const bend = parseFloat(cs.getPropertyValue("--bend")) || 1
      const s = escalator ? escalator.offsetHeight / ESC_VIEWBOX_H : 0

      // Escalator ride: slide along the slope until the artwork's bottom edge
      // is just below the bottom of the screen.
      let slopeTravel = 0
      let slideTravel = 0
      if (escalator && escalator.offsetParent) {
        const stageH = escalator.offsetParent.clientHeight
        const bottom0 = escalator.offsetTop + escalator.offsetHeight
        const right0 = escalator.offsetLeft + escalator.offsetWidth
        slopeTravel = Math.max(
          0,
          (bottom0 - ESC_BOTTOM_OVERSHOOT - stageH) / ESC_SIN
        )
        // Then leave to the left, just far enough for its right edge to clear
        // the screen.
        slideTravel = Math.max(0, right0 - slopeTravel * ESC_COS + 8)
      }
      const vertScreens = parseFloat(cs.getPropertyValue("--vert-screens")) || 0
      const vertSpeed =
        (vertScreens * vh) / (1 - Math.min(1, bend + ESC_EXIT_SPAN))
      dimsRef.current = {
        vw,
        vh,
        s,
        travelX,
        travelY,
        tan,
        bend,
        vertSpeed,
        slopeTravel,
        slideTravel,
      }
      if (wall) {
        const end = cameraAt(1, dimsRef.current)
        wall.style.width = `${vw + end.x}px`
        wall.style.height = `${vh + end.y}px`
      }
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
      } else {
        measure()
        requestUpdate()
      }
    }
    const onResize = () => {
      if (!staticModeRef.current) measure()
    }

    syncMode()
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    if (mq.addEventListener) mq.addEventListener("change", syncMode)
    else mq.addListener(syncMode)

    return () => {
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
    const { tan } = dims
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
    const top = (cardV / 100) * vh + Math.min(cardX, knee) * (vw / 100) * tan

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
        <h2 className="visually-hidden">Frequently asked questions</h2>
        <div
          className="faq-tiles"
          ref={tilesRef}
          aria-hidden="true"
          style={{ backgroundImage: `url(${tileUrl})` }}
        />
        <div className="faq-wall" ref={wallRef} onFocus={handleFocus}>
          {faqItems.map((item, index) => (
            <FaqCard key={item.id} item={item} shape={index % 3} />
          ))}
        </div>
        <img
          className="faq-escalator"
          ref={escalatorRef}
          src={escalatorUrl}
          alt=""
          aria-hidden="true"
          width={ESC_VIEWBOX_W}
          height={ESC_VIEWBOX_H}
          decoding="async"
          draggable={false}
        />
      </div>
    </Track>
  )
}

export default FaqEscalatorSection
