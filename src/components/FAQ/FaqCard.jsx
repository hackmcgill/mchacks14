import React, { useState } from "react"

import { WALL_RANGES } from "./faqScene.config"

const Chevron = () => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    focusable="false"
    aria-hidden="true"
  >
    <path
      d="M3 6l5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * One expandable FAQ card. Real HTML: a heading containing a button
 * (aria-expanded / aria-controls) and a labelled region for the answer.
 * Several cards can be open at once, so state is local to the card.
 *
 * Position / tilt come in as CSS custom properties (see positionVars) so the
 * server-rendered markup is already laid out and the static (mobile /
 * reduced-motion) layout can simply ignore them.
 */
// Position of the card for every width range, as CSS custom properties:
// --x/--v for the base range and --x-<name>/--v-<name> for the narrower ones
// (the section's CSS picks the right pair; see WALL_RANGES).
const positionVars = (item) => {
  const vars = { "--rot": `${item.rotate}deg` }
  WALL_RANGES.forEach((range) => {
    const [x, v] = item.layouts[range.name]
    const suffix = range.maxWidth ? `-${range.name}` : ""
    vars[`--x${suffix}`] = x
    vars[`--v${suffix}`] = v
  })
  return vars
}

const FaqCard = ({ item, shape = 0 }) => {
  const [open, setOpen] = useState(false)
  const buttonId = `faq-question-${item.id}`
  const panelId = `faq-answer-${item.id}`

  return (
    <div
      className="faq-card"
      data-faq-card={item.id}
      data-open={open}
      data-shape={shape}
      style={positionVars(item)}
    >
      <div className="faq-card__shape">
        <h3 className="faq-card__heading">
          <button
            type="button"
            id={buttonId}
            className="faq-card__button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="faq-card__question">{item.question}</span>
            <span className="faq-card__toggle" aria-hidden="true">
              <Chevron />
            </span>
          </button>
        </h3>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="faq-card__panel"
        >
          <div className="faq-card__panel-inner">
            <div className="faq-card__answer">{item.answer}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqCard
