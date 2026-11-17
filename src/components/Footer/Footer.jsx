import React from "react"

import Container from "./Container"
import Links from "./Links"
import PageLink from "./PageLink"
import SocialMediaBar from "../SocialMedia/SocialMediaBar"
import McHacksLogo from "../../assets/images/logos/mchacks14-logo.svg"

const Footer = () => (
  <Container>
    <img className="footer__logo" src={McHacksLogo} alt="McHacks logo" />
    <Links>
      <PageLink to="/code-of-conduct">Code of Conduct</PageLink>
      <PageLink to="/privacy">Privacy Policy</PageLink>
    </Links>
    <div className="footer__social-links">
      <SocialMediaBar />
    </div>
  </Container>
)

export default Footer
