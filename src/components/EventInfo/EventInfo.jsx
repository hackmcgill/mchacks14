import React from "react"

import Container from "./Container"
import Text from "./Text"

const EventInfo = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
    <Text>
      <h1>Last year, we had ...</h1>
    </Text>
  </Container>
)

export default EventInfo
