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
  ESC_TRAVEL_UNITS,
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
//   --cx / --cv          : the card's x (vw) and lane v (vh) for this range,
//                          picked from --x/--v (base) or --x-<name>/--v-<name>.
const rangeBlocks = WALL_RANGES.map((range) => {
  const tan = Math.tan((range.angleDeg * Math.PI) / 180)
  const suffix = range.maxWidth ? `-${range.name}` : ""
  const body = `--travel: ${range.travelX}; --pan-tan: ${tan}; --esc-h: ${range.escHeightSvh}; --esc-y: ${range.escStartY};`
  const card = `.faq-card { --cx: var(--x${suffix}); --cv: var(--v${suffix}); }`
  return range.maxWidth
    ? `@media (max-width: ${range.maxWidth}) { ${body} ${card} }`
    : `${body} ${card}`
}).join("\n  ")

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
    z-index: 2; /* cards sit above the escalator (and its figures) */
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
    z-index: 1;
    pointer-events: none;
    user-select: none;
    will-change: transform;
  }

  /* ---- Card ------------------------------------------------------------ */

  .faq-card {
    position: absolute;
    /* x along the wall; --v is the lane: vertical offset from the pan line,
       so a card's on-screen path is always parallel to the pan direction. */
    left: calc(var(--cx) * 1vw);
    top: calc(var(--cv) * 1vh + var(--cx) * var(--pan-tan) * 1vw);
    top: calc(var(--cv) * 1svh + var(--cx) * var(--pan-tan) * 1vw);
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
  }
`

const FaqEscalatorSection = ({ scrollRef }) => {
  const trackRef = useRef(null)
  const tilesRef = useRef(null)
  const wallRef = useRef(null)
  const escalatorRef = useRef(null)
  const staticModeRef = useRef(false)
  const dimsRef = useRef({ vw: 0, vh: 0, s: 0, travelX: 0, travelY: 0, tan: 0 })

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

    const { s, travelX, travelY } = dimsRef.current
    const dx = progress * travelX
    const dy = progress * travelY

    wall.style.transform = `translate3d(${-dx}px, ${-dy}px, 0)`
    tiles.style.transform = `translate3d(${-(dx % TILE_W)}px, ${-(dy % TILE_H)}px, 0)`

    // Exactly along the 20° slope, so the slope's edge looks stationary.
    const d = progress * ESC_TRAVEL_UNITS * s
    escalator.style.transform = `translate3d(${-d * ESC_COS}px, ${-d * ESC_SIN}px, 0)`
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
      const s = escalator ? escalator.offsetHeight / ESC_VIEWBOX_H : 0
      dimsRef.current = { vw, vh, s, travelX, travelY, tan }
      if (wall) {
        wall.style.width = `${vw + travelX}px`
        wall.style.height = `${vh + travelY}px`
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

    const { travelX, travelY, tan } = dimsRef.current
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    const cardW = cardEl.offsetWidth
    const cardH = cardEl.offsetHeight
    // This card's position for the current width range (see the CSS vars).
    const cardStyle = window.getComputedStyle(cardEl)
    const cardX = parseFloat(cardStyle.getPropertyValue("--cx")) || 0
    const cardV = parseFloat(cardStyle.getPropertyValue("--cv")) || 0
    const left = (cardX / 100) * vw // card box on the wall, px
    const top = (cardV / 100) * vh + left * tan

    // 1) Progress that would put the card centre at the target spot. The wall
    //    only moves along (travelX, travelY), so project onto that line.
    const cx = left + cardW / 2
    const cy = top + Math.min(cardH, 90) / 2
    const denom = travelX * travelX + travelY * travelY
    const centred = denom
      ? clamp01(
          ((cx - vw * 0.5) * travelX + (cy - vh * 0.45) * travelY) / denom
        )
      : 0

    // 2) Progress range in which the whole card is inside the safe area. The
    //    centred value can miss this (travel isn't 45°), so clamp into it.
    //    Cards tilt about their top-left corner, so use the rotated bounds.
    const rad = (item.rotate * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    const xs = [0, cardW * cos, -cardH * sin, cardW * cos - cardH * sin]
    const ys = [0, cardW * sin, cardH * cos, cardW * sin + cardH * cos]
    const bx0 = left + Math.min(...xs)
    const bx1 = left + Math.max(...xs)
    const by0 = top + Math.min(...ys)
    const by1 = top + Math.max(...ys)

    const xLo = travelX ? (bx1 - (vw - SAFE.right)) / travelX : -Infinity
    const xHi = travelX ? (bx0 - SAFE.left) / travelX : Infinity
    const yLo = travelY ? (by1 - (vh - SAFE.bottom)) / travelY : -Infinity
    const yHi = travelY ? (by0 - SAFE.top) / travelY : Infinity

    const lo = Math.max(0, xLo, yLo)
    const hi = Math.min(1, xHi, yHi)
    let p = centred
    if (lo <= hi) {
      p = Math.min(hi, Math.max(lo, centred))
    } else if (yLo <= yHi) {
      // Can't satisfy both axes: at least keep it clear of the navbar / bottom.
      p = Math.min(yHi, Math.max(yLo, centred))
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
