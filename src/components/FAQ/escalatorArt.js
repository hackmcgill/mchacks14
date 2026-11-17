// Geometry of the escalator artwork, built in code so its length can change.
//
// Units are the design file's (escalator-band.svg): the band is a black bar
// BAND_T thick, tilted ESC_ANGLE_DEG, between a top landing (left) and a bottom
// landing (right). The origin is the top-left of the top landing, so y = 0 is
// the landing's top surface. The escalator is drawn as ONE solid shape: the
// landings' and band's top edge, with everything below it black (no tiles may
// show under the band in the bottom-left corner of the screen).
//
// The band's length is not fixed: the scene picks it at runtime so the ride
// moves at ESC_SPEED_RATIO times the wall's speed at any window size (see
// bandLengthFor and FaqEscalatorSection's measure()). ESC_DEFAULT_LENGTH is only
// what the server-rendered HTML uses until then.
//
// Figures are the character exports (figures/figure-N.webp, rendered at 2x
// from the SVGs). They are drawn BEHIND the band so their bottoms are hidden in
// it, like in the original artwork. Their order, pairings and how deep they sit
// in the band were measured from that artwork (escalator-with-figures.svg).
import fig1 from "../../assets/images/faq/figures/figure-1.webp"
import fig2 from "../../assets/images/faq/figures/figure-2.webp"
import fig3 from "../../assets/images/faq/figures/figure-3.webp"
import fig4 from "../../assets/images/faq/figures/figure-4.webp"
import fig5 from "../../assets/images/faq/figures/figure-5.webp"
import fig6 from "../../assets/images/faq/figures/figure-6.webp"
import fig7 from "../../assets/images/faq/figures/figure-7.webp"
import fig8 from "../../assets/images/faq/figures/figure-8.webp"

export const ESC_ANGLE_DEG = 20 // must match the artwork

export const ESC_DEFAULT_LENGTH = 19000
const MIN_LENGTH = 3000

// Figure size relative to the band. 1 = the exports as delivered. 1.47 matches
// the design mock (Desktop - 16: a figure stands ~186px above the band edge on a
// 1024px-tall screen, with the band at 18svh).
export const FIGURE_SCALE = 1.47

// Where the figure groups go along the band (top edge, from the top landing),
// first group's centre to last group's centre, as distances from each end.
// The first group starts far enough down to clear the first FAQ card.
const SPREAD_START = 900
const SPREAD_END_GAP = 450

export const ESC_BAND_T = 294.278
const LAND_W = 429.97
const LAND_H = 294.26
const LAND_R = 200
const BAND_X0 = 429.848 // where the bar leaves the top landing
// How far the black shape extends below the bottom landing (it is always at or
// below the bottom of the screen; this only guards against subpixel slivers).
const UNDER = 60

const RAD = (ESC_ANGLE_DEG * Math.PI) / 180
const COS = Math.cos(RAD)
const SIN = Math.sin(RAD)
const TAN = Math.tan(RAD)

// Figures in order down the band. w/h: export size; anchor: bottom-centre of
// the silhouette in export units; depth: how far that point sits below the
// band's top edge (export units); pair: offset from the group's centre along
// the band, for figures that stand in pairs.
const FIGURES = [
  { src: fig1, w: 123, h: 324, anchor: [60.5, 317.2], depth: 112.7, group: 0 },
  { src: fig2, w: 195, h: 270, anchor: [97.1, 269.8], depth: 118.8, group: 1 },
  { src: fig3, w: 135, h: 312, anchor: [67.5, 311.2], depth: 153.9, group: 2 },
  {
    src: fig4,
    w: 160,
    h: 301,
    anchor: [79.9, 301],
    depth: 126.9,
    group: 3,
    pair: -89,
  },
  {
    src: fig5,
    w: 129,
    h: 253,
    anchor: [64.1, 253],
    depth: 140.9,
    group: 3,
    pair: 89,
  },
  { src: fig6, w: 142, h: 320, anchor: [72.6, 316], depth: 174.8, group: 4 },
  {
    src: fig7,
    w: 110,
    h: 278,
    anchor: [54.8, 277.2],
    depth: 126.6,
    group: 5,
    pair: -93,
  },
  {
    src: fig8,
    w: 153,
    h: 326,
    anchor: [75.5, 319.5],
    depth: 84.4,
    group: 5,
    pair: 93,
  },
]
const GROUPS = 1 + Math.max(...FIGURES.map((f) => f.group))

// The first group is the highest figure, and its spot doesn't depend on the
// band's length, so neither does the room above the landing.
const placeFigures = (bandLength) => {
  const k = FIGURE_SCALE
  const span = Math.max(0, bandLength - SPREAD_START - SPREAD_END_GAP)
  return FIGURES.map((f) => {
    const s = SPREAD_START + (span * f.group) / (GROUPS - 1) + (f.pair || 0) * k
    const px = BAND_X0 + s * COS
    const py = (px - BAND_X0) * TAN + f.depth * k
    return {
      src: f.src,
      x: px - f.anchor[0] * k,
      y: py - f.anchor[1] * k,
      w: f.w * k,
      h: f.h * k,
    }
  })
}
const TOP = Math.min(0, ...placeFigures(ESC_DEFAULT_LENGTH).map((f) => f.y))
// The top landing's surface, from the top of the viewBox.
export const ESC_LANDING_TOP_Y = -TOP

// Bottom landing's bottom edge and right edge for a band length.
const ends = (bandLength) => {
  const cx = BAND_X0 + bandLength * COS
  const cy = bandLength * SIN
  const bx = cx - ESC_BAND_T * SIN
  const by = cy + ESC_BAND_T * COS
  return { bx, by, top: by - LAND_H, right: bx + LAND_W }
}

// viewBox size (units) for a band length.
export const artSize = (bandLength) => {
  const e = ends(bandLength)
  return { w: e.right, h: e.by - TOP }
}

// Band length whose artwork is `height` units tall (inverse of artSize().h).
export const bandLengthFor = (height) =>
  Math.max(MIN_LENGTH, (height + TOP - ESC_BAND_T * COS) / SIN)

export const buildArt = (bandLength) => {
  const e = ends(bandLength)
  // Top edge: top landing, down the band to where it meets the bottom
  // landing's top, along that to its rounded corner; then straight down and
  // back along the bottom: everything under the edge is black.
  const meet = BAND_X0 + e.top / TAN
  const bottom = e.by + UNDER
  const shape = [
    `M0 0H${BAND_X0}L${meet} ${e.top}H${e.right - LAND_R}`,
    `A${LAND_R} ${LAND_R} 0 0 1 ${e.right} ${e.top + LAND_R}`,
    `V${bottom}H0Z`,
  ].join("")
  const { w, h } = artSize(bandLength)
  return {
    viewBox: { x: 0, y: TOP, w, h },
    shape,
    figures: placeFigures(bandLength),
  }
}
