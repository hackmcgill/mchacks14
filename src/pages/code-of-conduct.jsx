import React, { useEffect } from "react"

import CodeofConduct from "../components/DocPages/CodeofConduct"
import Footer from "../components/Footer/Footer"
import Nav from "../components/Nav/Nav"
import SEO from "../components/SEO/SEO"

const CodeOfConductPage = () => {
  return (
    <div>
      <SEO />
      <Nav docPage={true} />
      <CodeofConduct />
      <Footer />
    </div>
  )
}

export default CodeOfConductPage
