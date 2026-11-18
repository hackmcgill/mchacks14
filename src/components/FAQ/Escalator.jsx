import React, { forwardRef, useId, useMemo } from "react"

import {
  buildArt,
  ESC_BAND_T,
  ESC_COLORS,
  ESC_LIP_W,
  ESC_RAIL_W,
  ESC_SEAM_W,
} from "./escalatorArt"

/**
 * The escalator at the given band length, with the figures behind it: grey
 * panels with seams, a darker fill under the band, and a black handrail (with
 * a lighter lip) along the outer edge. The rail and lip are strokes centred on
 * the edge, clipped to the silhouette so only their inner half shows.
 * Decorative only. The wrapper div is what the scene moves; its size comes from
 * the art's proportions (--esc-w / --esc-h, per svh of band thickness) so the
 * CSS can size it.
 */
const Escalator = forwardRef(({ className, bandLength }, ref) => {
  const art = useMemo(() => buildArt(bandLength), [bandLength])
  const clipId = `esc-clip-${useId().replace(/:/g, "")}`
  const vb = art.viewBox
  return (
    <div
      className={className}
      ref={ref}
      aria-hidden="true"
      style={{ "--esc-w": vb.w / ESC_BAND_T, "--esc-h": vb.h / ESC_BAND_T }}
    >
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={art.shape} />
          </clipPath>
        </defs>
        {art.figures.map((f) => (
          <image
            key={f.src}
            href={f.src}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            preserveAspectRatio="none"
          />
        ))}
        <path d={art.shape} fill={ESC_COLORS.panel} />
        <g clipPath={`url(#${clipId})`} fill="none" strokeLinejoin="round">
          <path
            d={art.seams}
            stroke={ESC_COLORS.seam}
            strokeWidth={ESC_SEAM_W}
          />
          <path d={art.under} fill={ESC_COLORS.under} />
          <path
            d={art.edge}
            stroke={ESC_COLORS.lip}
            strokeWidth={2 * (ESC_RAIL_W + ESC_LIP_W)}
          />
          <path
            d={art.edge}
            stroke={ESC_COLORS.rail}
            strokeWidth={2 * ESC_RAIL_W}
          />
        </g>
      </svg>
    </div>
  )
})

export default Escalator
