import React, { useState } from "react"

import { Link } from "gatsby"
import HomeLogo from "../../assets/images/logos/mchacks13-home-logo.svg"

import Container from "./Container"
import IconContainer from "./IconContainer"
import NavLink from "./NavLink"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SocialMediaBar from "../SocialMedia/SocialMediaBar"

const Nav = ({ navItems = [], docPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

      <NavLink
        href="https://app.mchacks.ca/"
        onClick={() => mobile && setIsMenuOpen(false)}
        $mobile={mobile}
      >
        Apply
      </NavLink>

      <NavLink
        href="https://docs.google.com/forms/d/e/1FAIpQLSesvFEVGTwj6ZmPs2YBE3xehJTkoBe8fsHZV8zsq2CXhEDR_w/viewform"
        onClick={() => mobile && setIsMenuOpen(false)}
        $mobile={mobile}
      >
        Interest Form
      </NavLink>
    </>
  )

  return (
    <>
      <Container $menuOpen={isMenuOpen}>
        <span className="Nav__left_group">
          <span className="Nav__mchacks_logo">
            <NavLink as={Link} to="/">
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
