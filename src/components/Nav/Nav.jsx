import React, { useEffect, useState } from "react"

import { slide as Menu } from "react-burger-menu"
import { Link } from "gatsby"
import HomeLogo from "../../assets/images/logos/mchacks13-home-logo.svg"

import Container from "./Container"
import IconContainer from "./IconContainer"
import Links from "./Links"
import MobileMenu from "./MobileMenu"
import NavLink from "./NavLink"

import SocialMediaBar from "../SocialMedia/SocialMediaBar"
import HomeLogoContainer from "./HomeLogoContainer"

const Nav = ({ navItems = [], docPage = false }) => {
  const [hasBorder, setHasBorder] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const handleScroll = () => {
    setHasBorder(window.pageYOffset > 20)
    setScrolled(window.pageYOffset > 500)
  }

  useEffect(() => {
    console.log(scrolled)
  }, [scrolled])

  useEffect(() => {
    handleScroll()
    document.addEventListener("scroll", handleScroll)
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  const NavItems = (mobile) => (
    <>
      <NavLink as={Link} to="/">
        <IconContainer>
          <img src={HomeLogo} alt="McHacks Home Logo" />
        </IconContainer>
      </NavLink>

      {navItems.map((navItem) => (
        <NavLink onClick={navItem.onClick} $mobile={mobile}>
          {navItem.label.trim().toUpperCase()}
        </NavLink>
      ))}

      {docPage ? (
        <NavLink as={Link} to="/" $mobile={mobile}>
          HOME
        </NavLink>
      ) : null}

      <NavLink href="https://app.mchacks.ca/" $mobile={mobile}>
        APPLY
      </NavLink>

      <NavLink
        href="https://docs.google.com/forms/d/e/1FAIpQLSesvFEVGTwj6ZmPs2YBE3xehJTkoBe8fsHZV8zsq2CXhEDR_w/viewform"
        $mobile={mobile}
      >
        INTEREST FORM
      </NavLink>
    </>
  )

  return (
    <>
      <Container>
        <div className="Nav__links">{NavItems(false)}</div>
        <div className="Nav__socials">
          <SocialMediaBar />
        </div>
      </Container>
    </>
  )
}

export default Nav
