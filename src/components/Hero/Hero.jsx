import React from "react"
import HeroStyles from "./HeroStyles"
import McHacksLogo from "../../assets/images/designs/mchacks14-hero-logo.webp"

const interestForm = () => {
  window.location = "https://docs.google.com/forms/d/e/1FAIpQLSesvFEVGTwj6ZmPs2YBE3xehJTkoBe8fsHZV8zsq2CXhEDR_w/viewform"
}

// const live = () => {
//   window.location = "/live"
// }

const apply = () => {
  window.location = "https://app.mchacks.ca/"
}

const Hero = () => (
  <HeroStyles>
    <div className="hero__wrapper">
      <h1 className="hero__heading">McHacks 14</h1>
      <div className="hero__hit-frame">
        <button type="button" className="invisible-apply" onClick={apply} aria-label="Click me to apply"/>
      </div>
      <div className="hero__images-container">
        <img
          className="hero__heading-image"
          src={McHacksLogo}
          alt="McHacks 14"
        />
      </div>
    </div>
  </HeroStyles>
)

export default Hero
