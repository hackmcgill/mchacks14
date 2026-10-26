import React, { useEffect } from "react"

import Privacy from "../components/DocPages/Privacy"
import Footer from "../components/Footer/Footer"
import Nav from "../components/Nav/Nav"
import SEO from "../components/SEO/SEO"

const PrivacyPage = () => {
  return (
    <div>
      <SEO />
      <Nav docPage={true} />
      <Privacy />
      <Footer />
    </div>
  )
}

export default PrivacyPage
