import React from "react"

import Container from "./Container"
import Text from "./Text"
import { Content } from "./Content"

const About = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
    <Content>
      <Text>
        <h1>Your Next Stop: McHacks 14</h1>
        <p>
          Join 750+ hackers at McGill University for 24 hours of building,
          learning, and connecting. Whether you're exploring your first idea or
          bringing years of experience, McHacks is a place to try something new,
          collaborate with like-minded people, and turn your ideas into real
          projects. With hands-on workshops, supportive mentors, and a community
          that welcomes everyone, we'll help you make the most of every hour.
          We'll take care of the food, you bring the ideas, and we'll see where
          they take you.
        </p>
        <p>
          Welcome aboard McHacks 14!
        </p>
      </Text>
    </Content>
  </Container>
)

export default About
