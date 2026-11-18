import React from "react"

import Container from "./Container"
import TextContent from "./TextContent"
import ImagesContent from "./ImagesContent"
import LinesContent from "./LinesContent"

const Sponsor = ({ scrollRef }) => (
  <Container ref={scrollRef}>
    <TextContent />
    <ImagesContent />
    <LinesContent />
  </Container>
)

export default Sponsor
