import React, { forwardRef, useMemo } from "react"

import { buildArt, ESC_BAND_T } from "./escalatorArt"

/**
 * The escalator: one solid black shape (landings + band, filled below) at the
 * given band length, with the figures behind it. Decorative only. The wrapper
 * div is what the scene moves; its size comes from the art's proportions
 * (--esc-w / --esc-h, per svh of band thickness) so the CSS can size it.
 */
const Escalator = forwardRef(({ className, bandLength }, ref) => {
  const art = useMemo(() => buildArt(bandLength), [bandLength])
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
        <path d={art.shape} fill="black" />
      </svg>
    </div>
  )
})

export default Escalator
