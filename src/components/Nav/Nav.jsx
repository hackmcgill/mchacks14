import React, { useEffect, useRef, useState } from "react"

import { Link } from "gatsby"
import HomeLogo from "../../assets/images/logos/mchacks14-logo.svg"

import Container, { MenuOverlay } from "./Container"
import IconContainer from "./IconContainer"
import NavLink from "./NavLink"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SocialMediaBar from "../SocialMedia/SocialMediaBar"

const Nav = ({ navItems = [], docPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const originalBodyOverflow = useRef(null)

  const handleScroll = () => {
    setScrolled(window.pageYOffset > 20)
  }

  useEffect(() => {
    handleScroll()
    document.addEventListener("scroll", handleScroll)
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  /*
  Locks the page’s background scrolling while the mobile menu is open and 
  restores scrolling when the menu closes
  */
  useEffect(() => {
    if (isMenuOpen) {
      originalBodyOverflow.current = document.body.style.overflow
      document.body.style.overflow = "hidden"
    } else if (originalBodyOverflow.current !== null) {
      document.body.style.overflow = originalBodyOverflow.current
      originalBodyOverflow.current = null
    }

    return () => {
      if (originalBodyOverflow.current !== null) {
        document.body.style.overflow = originalBodyOverflow.current
        originalBodyOverflow.current = null
      }
    }
  }, [isMenuOpen])

  const NavItems = (mobile) => (
    <>
      {navItems.map((navItem) => (
        <NavLink
          key={navItem.label}
          onClick={(event) => {
            navItem.onClick?.(event)
            if (mobile) setIsMenuOpen(false)
          }}
          $mobile={mobile}
        >
          {navItem.label}
        </NavLink>
      ))}

      {docPage ? (
        <NavLink
          as={Link}
          to="/"
          onClick={() => mobile && setIsMenuOpen(false)}
          $mobile={mobile}
        >
          Home
        </NavLink>
      ) : null}

      <NavLink href="https://app.mchacks.ca/" $mobile={mobile}>
        Apply
      </NavLink>

      <NavLink
        href="https://docs.google.com/forms/d/e/1FAIpQLSesvFEVGTwj6ZmPs2YBE3xehJTkoBe8fsHZV8zsq2CXhEDR_w/viewform"
        $mobile={mobile}
      >
        Interest Form
      </NavLink>
    </>
  )

  return (
    <>
      {isMenuOpen ? (
        <MenuOverlay aria-hidden="true" onClick={() => setIsMenuOpen(false)} />
      ) : null}
      <Container $menuOpen={isMenuOpen} $scrolled={scrolled}>
        <span className="Nav__left_group">
          <span className="Nav__mchacks_logo">
            <NavLink
              as={Link}
              to="/"
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            >
              <IconContainer>
                <img src={HomeLogo} alt="McHacks Home Logo" />
              </IconContainer>
            </NavLink>
          </span>

          <span className="Nav__links">{NavItems(isMenuOpen)}</span>
        </span>

        <div className="Nav__socials">
          <SocialMediaBar />
        </div>
        <div className="Nav__mlh_banner">
          <a
            id="mlh-trust-badge"
            href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white"
            target="_blank"
          >
            <img
              src="https://s3.amazonaws.com/logged-assets/trust-badge/2027/mlh-trust-badge-2027-white.svg"
              alt="Major League Hacking 2027 Hackathon Season"
              style={{ width: "100%" }}
            />
          </a>
        </div>

        <button
          type="button"
          className="Nav__hamburger_menu_button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faXmark : faBars}
            className="Nav__hamburger_menu"
          />
        </button>
      </Container>
    </>
  )
}

export default Nav
