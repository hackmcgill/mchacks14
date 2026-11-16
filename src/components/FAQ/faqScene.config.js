// Every tunable for the diagonal-scroll FAQ scene lives here.
import { faqLaptopUp, faqDesktopUp } from "../variable"

export { ESC_ANGLE_DEG } from "./escalatorArt"

// ---- Scroll / pin -----------------------------------------------------------
// Track height in svh. Pinned scroll distance = TRACK_HEIGHT_SVH - 100 svh.
export const TRACK_HEIGHT_SVH = 630

// ---- Wall (tiles + cards) ---------------------------------------------------
// The wall slides up-left by `travelX` viewport widths horizontally, along a
// line `angleDeg` above the horizontal. Defining the vertical travel by an
// ANGLE (not a multiple of the viewport height) keeps the geometry the same at
// every aspect ratio.
//
// Why the angle matters: the escalator's slope edge is fixed on screen at 20°.
// If the wall panned at <= 20° cards would drift TOWARD that edge as they move
// and end up under it. Panning steeper than 20° makes every card peel away from
// it, so a card that clears the escalator when it enters the screen keeps
// clearing it.
//
// One entry per width range, widest first. The boundaries are the shared
// breakpoints from components/variable.jsx:
//   base  faqDesktopUp (1440px) and wider
//   lg    faqLaptopUp (1024px) up to just under faqDesktopUp
// Below faqLaptopUp the FAQ is a static list with no escalator (see
// STATIC_MODE_QUERY): one column on phones, cards side by side and wrapping on
// tablets. Each range is selected with a `max-width` media query on `maxWidth`; `base` has
// none. Each card has one [x, v] position per range in faq.js, tuned
// together with that range's travelX / angleDeg (see the note there).
//
// escBandSvh / escStartY size the escalator for the range: thickness of its
// band in svh (the whole artwork, figures included, scales with it), and where
// its top landing sits at progress 0 (0 = top of the stage, 1 = bottom).
//
// The pan has two legs (progress = fraction of the pinned scroll):
//   1. 0 -> ESC_BEND        diagonal: the wall pans up-left at angleDeg while the
//                           escalator rides up-left along its own slope, faster
//                           (ESC_SPEED_RATIO), so it reads as moving UP. It ends
//                           the moment the escalator's bottom landing lands on the
//                           bottom of the screen.
//   2. ESC_BEND -> 1        horizontal only: the wall keeps panning left while the
//                           escalator leaves to the left. The pin ends just as it
//                           is gone, and the page continues down.
// Cards are laid out along the same path: see BEND_REF_X and the faq-card `top`
// rule.
//
// BEND_REF_X: the card's left edge (vw) at the moment the "card on the wall"
// is at its readable spot. A card whose x is beyond BEND_REF_X + ESC_BEND * travel
// is positioned along the flat leg, so its v is a plain vertical offset.
export const BEND_REF_X = 35
const below = (bp) => `${parseInt(bp, 10) - 1}px`
export const WALL_RANGES = [
  {
    name: "base",
    maxWidth: null,
    travelX: 2.93,
    angleDeg: 23.0,
    escBandSvh: 18,
    escStartY: 0.84,
  },
  {
    name: "lg",
    maxWidth: below(faqDesktopUp),
    travelX: 3.2,
    angleDeg: 22.7,
    escBandSvh: 18,
    escStartY: 0.92,
  },
]

const SCALE_FACTOR = 2
export const TILE_W = 2199 * SCALE_FACTOR
export const TILE_H = 1591 * SCALE_FACTOR

// ---- Escalator --------------------------------------------------------------
// Artwork geometry (figures, shape) lives in escalatorArt.js.
// ESC_EXIT_SPAN: the stretch of scroll (fraction of the pin) the escalator's
// exit to the left takes, at the very end of the pin.
export const ESC_EXIT_SPAN = 0.06
export const ESC_BEND = 1 - ESC_EXIT_SPAN
// During leg 1 the escalator covers this many times the wall's horizontal
// travel. Its band LENGTH is picked at runtime to make that true at any window
// size (the bottom landing must arrive exactly at ESC_BEND).
export const ESC_SPEED_RATIO = 2
// Extra px so the artwork's bottom edge sits just below the screen bottom.
export const ESC_BOTTOM_OVERSHOOT = 4

// ---- Responsive / fallback --------------------------------------------------
// Below faqLaptopUp (1024px), or with prefers-reduced-motion, the scene falls back
// to a static list with no escalator (cards wrap side by side from faqTabletUp,
// 768px, up; a single column below that). Only width is considered (not height).
export const STATIC_MAX_WIDTH = parseInt(faqLaptopUp, 10) - 1
export const STATIC_MODE_QUERY = `(max-width: ${STATIC_MAX_WIDTH}px), (prefers-reduced-motion: reduce)`
