// Every tunable for the diagonal-scroll FAQ scene lives here.
import { faqLaptopUp, faqDesktopUp } from "../variable"

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
// Below faqLaptopUp the FAQ is a static list with no escalator (see
// STATIC_MODE_QUERY): one column on phones, cards side by side and wrapping on
// tablets. Each range is selected with a `max-width` media query on `maxWidth`; `base` has
// none. Each card has one [x, v] position per range in faq.js, tuned
// together with that range's travelX / angleDeg (see the note there).
//
// escHeightSvh / escStartY size the escalator for the range: image height in
// svh, and where its top landing sits at progress 0 (0 = top of the stage,
// 1 = bottom). The escalator scales with viewport HEIGHT, so for narrower ranges
// it is made smaller and lower to leave room above its black band for cards.
//
// The pan has three legs (progress = fraction of the pinned scroll):
//   1. 0 -> bend            diagonal: the wall pans up-left at angleDeg while the
//                           escalator rides down its own slope. It ends the moment
//                           the escalator's bottom lands on the bottom of the screen.
//   2. bend -> bend + ESC_EXIT_SPAN
//                           horizontal only: the wall keeps panning left while the
//                           escalator leaves to the left, out of view.
//   3. bend + ESC_EXIT_SPAN -> 1
//                           vertical only: the wall pans straight up by `vertScreens`
//                           viewport heights, bringing the remaining cards in from below. Then the pin ends and the
//                           page continues down.
// `bend` is picked so the escalator, which has to cover its whole ride in leg 1,
// still travels further than the wall does there. Cards are laid out along the same
// path: see BEND_REF_X and the faq-card `top` rule.
//
// BEND_REF_X: the card's left edge (vw) at the moment the "card on the wall"
// is at its readable spot. A card whose x is beyond BEND_REF_X + bend * travel
// is positioned along the flat leg, so its v is a plain vertical offset.
export const BEND_REF_X = 35
const below = (bp) => `${parseInt(bp, 10) - 1}px`
export const WALL_RANGES = [
  {
    name: "base",
    maxWidth: null,
    travelX: 2.21,
    angleDeg: 23.0,
    escHeightSvh: 125,
    escStartY: 0.8,
    bend: 0.5,
    vertScreens: 2.2,
  },
  {
    name: "lg",
    maxWidth: below(faqDesktopUp),
    travelX: 2.33,
    angleDeg: 22.7,
    escHeightSvh: 100,
    escStartY: 0.9,
    bend: 0.5,
    vertScreens: 1.0,
  },
]

const SCALE_FACTOR = 2
export const TILE_W = 2199 * SCALE_FACTOR
export const TILE_H = 1591 * SCALE_FACTOR

// ---- Escalator --------------------------------------------------------------
export const ESC_ANGLE_DEG = 20 // must match the slope in the artwork exactly
// The escalator is the viewer's ride DOWN. During the diagonal leg of the pan it
// slides up-left along its own 20deg slope until its bottom edge is exactly at
// the bottom of the screen (no floating edge); then it leaves straight to the
// left, quickly: ESC_EXIT_SPAN is the stretch of scroll (fraction of the pin) the
// exit takes. After that the escalator is gone for the rest of the pin.
export const ESC_EXIT_SPAN = 0.08
// Extra px so the artwork's bottom edge sits just below the screen bottom.
export const ESC_BOTTOM_OVERSHOOT = 4

// Artwork geometry (SVG viewBox units) used for the maths above.
export const ESC_VIEWBOX_W = 5994
export const ESC_VIEWBOX_H = 2363
export const ESC_LANDING_TOP_Y = 130.16

// ---- Responsive / fallback --------------------------------------------------
// Below faqLaptopUp (1024px), or with prefers-reduced-motion, the scene falls back
// to a static list with no escalator (cards wrap side by side from faqTabletUp,
// 768px, up; a single column below that). Only width is considered (not height).
export const STATIC_MAX_WIDTH = parseInt(faqLaptopUp, 10) - 1
export const STATIC_MODE_QUERY = `(max-width: ${STATIC_MAX_WIDTH}px), (prefers-reduced-motion: reduce)`
