import React from "react"

import Container from "./Container"
import Text from "./Text"
import { Content } from "./Content"

const About = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
    <Content>
      <Text>
        <h1>Code That Casts Spells</h1>
        <p>
          For 24 enchanting hours, McGill University transforms into a realm of imagination and innovation. Over
          500 curious minds will gather under one roof, casting spells of
          creativity through code, design, and daring ideas. Whether you're
          summoning your first "Hello, World!", brewing APIs in your cauldron,
          or crafting the next big tech potion, McHacks is your very own
          playground. Join us for the{" "}
          <strong>
            13<sup>th</sup> edition
          </strong>{" "}
          of Canada’s most magical hackathon and bring your ideas to life, one
          line of code at a time.
        </p>
      </Text>
    </Content>
  </Container>
)

export default About
