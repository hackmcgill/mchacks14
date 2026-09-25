import React from "react"
import Container from "./SocialMediaBarContainer"

import Discord from "../../assets/images/logos/discord.svg"
import { ReactComponent as Devpost } from "../../assets/images/logos/mchacks13-devpost-logo.svg"
import { ReactComponent as Facebook } from "../../assets/images/logos/mchacks13-fb-logo.svg"
import { ReactComponent as GitHub } from "../../assets/images/logos/mchacks13-github-logo.svg"
import { ReactComponent as Instagram } from "../../assets/images/logos/mchacks13-ig-logo.svg"
import { ReactComponent as Twitter } from "../../assets/images/logos/mchacks13-x-logo.svg"
import { ReactComponent as LinkedIn } from "../../assets/images/logos/mchack13-linkedin.svg"
import NavLink from "../Nav/NavLink"

const SocialMediaBar = () => (
  <Container>
    {/* <div className="SocialMediaBar__icon">
      <a href="https://discord.gg/bVG5uHQz" target="_blank" rel="noopener noreferrer">
        <img src={Discord} alt="Discord" />
      </a>
    </div> */}
    <div className="SocialMediaBar__icon">
      <NavLink href="https://www.linkedin.com/company/mchacks/" target="_blank" rel="noopener noreferrer">
        <LinkedIn className="icon"/>
      </NavLink>
    </div>
    <div className="SocialMediaBar__icon">
      <NavLink
        href="https://www.facebook.com/mcgillhacks/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook className="icon"/>
      </NavLink>
    </div>
    <div className="SocialMediaBar__icon">
      <NavLink
        href="https://www.instagram.com/mcgillhacks/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram className="icon"/>
      </NavLink>
    </div>
    <div className="SocialMediaBar__icon">
      <NavLink
        href="https://github.com/hackmcgill"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub className="icon"/>
      </NavLink>
    </div>
    <div className="SocialMediaBar__icon">
      <NavLink
        href="https://twitter.com/McGillHacks?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="icon"/>
      </NavLink>
    </div>
    <div className="SocialMediaBar__icon">
      <NavLink href="https://mchacks-13.devpost.com/" target="_blank" rel="noopener noreferrer">
        <Devpost className="icon"/>
      </NavLink>
    </div>
  </Container>
)

export default SocialMediaBar
