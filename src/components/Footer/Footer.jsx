import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faXTwitter,
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons"

import Container from "./Container"
import Links from "./Links"
import PageLink from "./PageLink"
import {Location } from "@reach/router"
import SocialLink from "./SocialLink"

const pageLinks = [
  { href: "/code-of-conduct", text: "Code of Conduct" },
  { href: "/privacy", text: "Privacy Policy" },
]

const socialLinks = [
  { href: "mailto:contact@mchacks.ca?Subject=Hello!", icon: faEnvelope },
  { href: "https://fb.com/mcgillhacks", icon: faFacebookSquare },
  { href: "https://instagram.com/mcgillhacks", icon: faInstagram },
  { href: "https://twitter.com/mcgillhacks", icon: faXTwitter },
]

const Footer = () => (
  <Location>
    {({ location }) => {
      const isHomePage = !location.pathname.includes('/discord-guide/') && !location.pathname.includes('/privacy') && !location.pathname.includes('/code-of-conduct/');
      return (
        <Container $isHomePage={isHomePage}>
          <Links>
            {pageLinks.map(({ href, text, external }) => (
              <PageLink
                key={text}
                $isHomePage={isHomePage}
                href={href}
                target={external ? "_blank" : undefined}
              >
                {text}
              </PageLink>
            ))}
          </Links>
          <Links className="footer__social-links">
            {socialLinks.map(({ href, icon }) => (
              <SocialLink
                key={href}
                $isHomePage={isHomePage}
                href={href}
                target="_blank"
                rel={icon === faEnvelope ? undefined : "noopener noreferrer"}
                >
                <FontAwesomeIcon icon={icon} />
                </SocialLink>
            ))}
          </Links>
        </Container>
      )
    }}
  </Location>
)

export default Footer