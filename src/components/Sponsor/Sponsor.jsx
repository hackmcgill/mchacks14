import React from "react"

import Container from "./Container"
import TextContent from "./TextContent"
import ImagesContent from "./ImagesContent"

const Sponsor = ({ scrollRef }) => (
  <Container ref={scrollRef}>
    <TextContent />
    <ImagesContent />
  </Container>
)

export default Sponsor
