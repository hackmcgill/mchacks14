import React from "react"

import Container from "./Container"
import TextContent from "./TextContent"
import ImagesContent from "./ImagesContent"
import LinesContent from "./LinesContent"
import StatsContent from "./StatsContent"

const About = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
    <LinesContent />
    <TextContent />
    <ImagesContent />
    <StatsContent />
  </Container>
)

export default About
