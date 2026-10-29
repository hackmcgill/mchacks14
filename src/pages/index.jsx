import React, { useRef, useEffect } from "react"

import SEO from "../components/SEO/SEO"
import Nav from "../components/Nav/Nav"
import Hero from "../components/Hero/Hero"
import About from "../components/About/About"
import Sponsor from "../components/Sponsor/Sponsor"
import FAQ from "../components/FAQ/FAQ"
import GetInvolved from "../components/GetInvolved/GetInvolved"
import MeetTheTeam from "../components/MeetTheTeam/MeetTheTeamCarousel"
import Footer from "../components/Footer/Footer"
import EventInfo from "../components/EventInfo/EventInfo"

const scrollTo = (ref, offset = 50) => {
  if (ref.current) {
    window.scrollTo({
      top: ref.current.offsetTop - offset,
      behavior: "smooth",
    })
  }
}

const IndexPage = () => {
  const aboutRef = useRef(null)
  const sponsorRef = useRef(null)
  const faqRef = useRef(null)
  const involvementRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }, 0)
  }, [])

  const navItems = [
    {
      label: "About",
      onClick: () => scrollTo(aboutRef),
    },
    {
      label: "Sponsor",
      onClick: () => scrollTo(sponsorRef),
    },
    {
      label: "Get Involved",
      onClick: () => scrollTo(involvementRef),
    },
    {
      label: "FAQ",
      onClick: () => scrollTo(faqRef),
    },
  ]

  return (
    <div>
      <SEO />
      <Nav navItems={navItems} schedule={true} />
      <Hero />
      <About scrollRef={aboutRef} />
      <EventInfo />
      <Sponsor scrollRef={sponsorRef} />
      <GetInvolved scrollRef={involvementRef} />
      <FAQ scrollRef={faqRef} />
      <MeetTheTeam />
      <Footer />
    </div>
  )
}

export default IndexPage
