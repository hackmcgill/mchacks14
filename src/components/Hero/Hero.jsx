import React from "react"
import HeroStyles from "./HeroStyles"
import McHacksLogo from "../../assets/images/designs/mchacks14-hero-logo.webp"
import Moon from "../../assets/images/designs/mchacks13-moon.svg"
import LeftCloud from "../../assets/images/designs/mchacks13-leftCloud.svg"
import RightCloud from "../../assets/images/designs/mchacks13-rightCloud.svg"
import Saturn from "../../assets/images/designs/mchacks13-saturn.svg"
import star1 from "../../assets/images/designs/mchacks13-star1.svg"
import star2 from "../../assets/images/designs/mchacks13-star2.svg"
import star3 from "../../assets/images/designs/mchacks13-star3.svg"
import star4 from "../../assets/images/designs/mchacks13-star4.svg"
import Portal from "../../assets/gifs/mchacks13-portal.gif"
import Button from "./Button"

const interestForm = () => {
  window.location = "https://docs.google.com/forms/d/e/1FAIpQLSesvFEVGTwj6ZmPs2YBE3xehJTkoBe8fsHZV8zsq2CXhEDR_w/viewform"
}

// const live = () => {
//   window.location = "/live"
// }

// const apply = () => {
//   window.open("/bot_or_not_challenge.pdf", "_blank")
// }

const Hero = () => (
  <HeroStyles>
    <div className="hero__wrapper">
      <div className="hero__clouds"></div>
      <h1 className="hero__heading">McHacks 14</h1>
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
