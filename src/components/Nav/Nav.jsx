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
        <div>
          <Links $hasBorder={hasBorder}>
            <div className="Nav__links">{NavItems(false)}</div>
            <div className="Nav__socials">
              <SocialMediaBar />
            </div>
            <div className="Nav__mlh-banner">
              <a
                id="mlh-trust-badge"
                style={{
                  display: "block",
                  maxWidth: "100px",
                  minWidth: "60px",
                  position: "fixed",
                  right: "50px",
                  top: "0",
                  width: "10%",
                  zIndex: "10000",
                }}
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
          </Links>

          <HomeLogoContainer>
            <NavLink as={Link} to="/">
              <IconContainer>
                <img src={HomeLogo} alt="McHacks Home Logo" />
              </IconContainer>
            </NavLink>
          </HomeLogoContainer>
        </div>
      </Container>
      <Menu right styles={MobileMenu} $hasBorder={hasBorder}>
        {NavItems(true)}
      </Menu>
    </>
  )
}

export default Nav
