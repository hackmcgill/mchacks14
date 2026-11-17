import React from "react"
import Container from "./SocialMediaBarContainer"

import { ReactComponent as Devpost } from "../../assets/images/logos/mchacks14-devpost-logo.svg"
import { ReactComponent as Facebook } from "../../assets/images/logos/mchacks14-facebook-logo.svg"
import { ReactComponent as GitHub } from "../../assets/images/logos/mchacks14-github-logo.svg"
import { ReactComponent as Instagram } from "../../assets/images/logos/mchacks14-instagram-logo.svg"
import { ReactComponent as X } from "../../assets/images/logos/mchacks14-x-logo.svg"
import { ReactComponent as LinkedIn } from "../../assets/images/logos/mchacks14-linkedin-logo.svg"
import { ReactComponent as Mail } from "../../assets/images/logos/mchacks14-mail-logo.svg"
import NavLink from "../Nav/NavLink"

const SocialMediaBar = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/mcgillhacks/",
      icon: Instagram,
    },
    {
      href: "https://www.linkedin.com/company/mchacks/",
      icon: LinkedIn,
    },
    {
      href: "mailto:contact@mchacks.ca?Subject=Hello!",
      icon: Mail,
    },
    {
      href: "https://www.facebook.com/mcgillhacks/",
      icon: Facebook,
    },
    {
      href: "https://github.com/hackmcgill",
      icon: GitHub,
    },
    {
      href: "https://x.com/McGillHacks?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
      icon: X,
    },
    {
      href: "https://mchacks13.devpost.com/",
      icon: Devpost,
    },
  ]

  return (
    <Container>
      {socialLinks.map(({ href, icon: Icon }) => (
        <NavLink
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="icon" />
        </NavLink>
      ))}
    </Container>
  )
}

export default SocialMediaBar
