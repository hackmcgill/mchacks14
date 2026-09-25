import React, { useRef, useEffect } from "react"

import SEO from "../components/SEO/SEO"
import Nav from "../components/Nav/Nav"
import Hero from "../components/Hero/Hero"
import About from "../components/About/About"
import Sponsor from "../components/Sponsor/Sponsor"
import FAQ from "../components/FAQ/FAQ"
import Involvement from "../components/Involvement/Involvement"
import SponsorLogos from "../components/Logos/SponsorLogos"
import Footer from "../components/Footer/Footer"
import EventInfo from "../components/EventInfo/EventInfo"
import CommunityPartnerLogos from "../components/Logos/CommunityPartnerLogos"
import TravelPartnerLogos from "../components/Logos/TravelPartnerLogos"

const scrollTo = (ref, offset = 50) => {
  if (ref.current) {
    window.scrollTo({
      top: ref.current.offsetTop - offset,
      behavior: 'smooth',
    });
  }
};

const IndexPage = () => {
  const aboutRef = useRef(null)
  const sponsorRef = useRef(null)
  const faqRef = useRef(null)
  const involvementRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' }, 0);
  }, []);

  return (
    <div>
      <SEO />
      <Nav
        scrollToAbout={() => scrollTo(aboutRef)}
        scrollToSponsor={() => scrollTo(sponsorRef)}
        scrollToInvolvement={() => scrollTo(involvementRef)}
        scrollToFaq={() => scrollTo(faqRef)}
        schedule={true}
        darkBackground={true}
      />
      <Hero />
      <About scrollRef={aboutRef} />
      <EventInfo />
      <Sponsor scrollRef={sponsorRef} />
      <Involvement scrollRef={involvementRef}/>
      <FAQ scrollRef={faqRef} />
      <SponsorLogos />
      <CommunityPartnerLogos />
      <TravelPartnerLogos />
      <Footer />
    </div>
  )
}

export default IndexPage
