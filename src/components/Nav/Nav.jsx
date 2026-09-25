import React, { useEffect, useState } from "react"

// import { Link } from "gatsby"
import { slide as Menu } from "react-burger-menu"
import HomeLogo from "../../assets/images/logos/mchacks13-home-logo.svg"

import Container from "./Container"
import IconContainer from "./IconContainer"
import Links from "./Links"
import MobileMenu from "./MobileMenu"
import NavLink from "./NavLink"

import SocialMediaBar from "../SocialMedia/SocialMediaBar"
import HomeLogoContainer from "./HomeLogoContainer"

const Nav = ({
  scrollToAbout,
  scrollToSponsor,
  scrollToInvolvement,
  scrollToFaq,
  schedule,
  docPage = false,
  hiddenBackground = true,
}) => {
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
      <NavLink href="/">
        <IconContainer>
          <img src={HomeLogo} alt="McHacks Home Logo" />
        </IconContainer>
      </NavLink>

      {scrollToAbout ? (
        <NavLink onClick={scrollToAbout} $mobile={mobile}>
          ABOUT
        </NavLink>
      ) : null}

      {scrollToSponsor ? (
        <NavLink onClick={scrollToSponsor} $mobile={mobile}>
          SPONSOR
        </NavLink>
      ) : null}

      {scrollToInvolvement ? (
        <NavLink onClick={scrollToInvolvement} $mobile={mobile}>
          GET INVOLVED
        </NavLink>
      ) : null}

      {scrollToFaq ? (
        <NavLink onClick={scrollToFaq} $mobile={mobile}>
          FAQ
        </NavLink>
      ) : null}
      {/* {schedule ? (
        <NavLink href="/schedule" $mobile={mobile}>
          Schedule
        </NavLink>
      ) : null} */}
      {docPage ? (
        <NavLink href="/" $mobile={mobile}>
          HOME
        </NavLink>
      ) : null}

      {/* <NavLink href="https://app.mchacks.ca" $mobile={mobile}>
        Apply
      </NavLink> */}

      {/*<NavLink href="https://forms.gle/2CHq5PZZLxuirVCT6" $mobile={mobile}>
        Volunteer
      </NavLink> */}
      <NavLink href="https://app.mchacks.ca/" $mobile={mobile}>
        APPLY
      </NavLink>
      
    </>
  )
  return (
    <Container>
      <div>
        <Links $hasBorder={hasBorder}>
          {NavItems(false)}
          <div className="Nav__socials">
            <SocialMediaBar />
          </div>
          <div className="Nav__mlh-banner">
            <a id="mlh-trust-badge" style={{ display: "block", maxWidth: "100px", minWidth: "60px", position: "fixed", right: "50px", top: "0", width: "10%", zIndex: "10000" }} href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank">
            <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: "100%" }} />
            </a>
          </div>
        </Links>

        <HomeLogoContainer>
          <NavLink href="/">
            <IconContainer>
              <img src={HomeLogo} alt="McHacks Home Logo" />
            </IconContainer>
          </NavLink>
        </HomeLogoContainer>

      </div>
      <Menu isOpen={true} styles={MobileMenu} $hasBorder={hasBorder}>
        {NavItems(true)}
      </Menu>
    </Container>
  )
}

export default Nav