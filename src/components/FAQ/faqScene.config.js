// Every tunable for the diagonal-scroll FAQ scene lives here.
import { faqTabletUp, faqLaptopUp, faqDesktopUp } from "../variable"

// ---- Scroll / pin -----------------------------------------------------------
// Track height in svh. Pinned scroll distance = TRACK_HEIGHT_SVH - 100 svh.
export const TRACK_HEIGHT_SVH = 500

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
//   md    faqTabletUp (768px) up to just under faqLaptopUp
// Below faqTabletUp the FAQ is a static stacked list (see STATIC_MODE_QUERY). Each
// range is selected with a `max-width` media query on `maxWidth`; `base` has
// none. Each card has one [x, v] position per range in faq.js, tuned
// together with that range's travelX / angleDeg (see the note there).
//
// escHeightSvh / escStartY size the escalator for the range: image height in
// svh, and where its top landing sits at progress 0 (0 = top of the stage,
// 1 = bottom). The escalator scales with viewport HEIGHT, so for narrower ranges
// it is made smaller and lower to leave room above its black band for cards.
const below = (bp) => `${parseInt(bp, 10) - 1}px`
export const WALL_RANGES = [
  {
    name: "base",
    maxWidth: null,
    travelX: 2.21,
    angleDeg: 23.0,
    escHeightSvh: 125,
    escStartY: 0.8,
  },
  {
    name: "lg",
    maxWidth: below(faqDesktopUp),
    travelX: 2.33,
    angleDeg: 22.7,
    escHeightSvh: 100,
    escStartY: 0.9,
  },
  {
    name: "md",
    maxWidth: below(faqLaptopUp),
    travelX: 2.36,
    angleDeg: 35.0,
    escHeightSvh: 65,
    escStartY: 0.95,
  },
]

// Size of ONE wall-tile.webp tile at 1x, in CSS px (the file itself is 2x).
export const TILE_W = 2199 * 2
export const TILE_H = 1591 * 2

// ---- Escalator --------------------------------------------------------------
export const ESC_ANGLE_DEG = 20 // must match the slope in the artwork exactly
// Slope distance (in SVG units) travelled over the whole pin. At 4100 the
// bottom landing is just reaching the bottom edge of the screen at progress 1,
// so the end of the escalator never slides into view.
export const ESC_TRAVEL_UNITS = 4100

// Artwork geometry (SVG viewBox units) used for the maths above.
export const ESC_VIEWBOX_W = 5994
export const ESC_VIEWBOX_H = 2363
export const ESC_LANDING_TOP_Y = 130.16

// ---- Responsive / fallback --------------------------------------------------
// Below faqTabletUp (768px), or with prefers-reduced-motion, the scene falls back to a
// static stacked list. Only width is considered (not height).
export const MOBILE_MAX_WIDTH = parseInt(faqTabletUp, 10) - 1
export const STATIC_MODE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px), (prefers-reduced-motion: reduce)`
