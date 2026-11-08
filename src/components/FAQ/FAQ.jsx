import React from "react"

import FaqEscalatorSection from "./FaqEscalatorSection"

// The FAQ is a scroll-pinned, diagonally panning scene. See faqScene.config.js
// for every tunable and FaqEscalatorSection.jsx for the mechanics.
const FAQ = ({ scrollRef }) => <FaqEscalatorSection scrollRef={scrollRef} />

export default FAQ
