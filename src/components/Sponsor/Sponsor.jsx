import React from "react"

import Container from "./Container"
import Content from "./Content"
import Text from "./Text"

const Sponsor = ({ scrollRef }) => (
  <Container ref={scrollRef}>
    <Content>
      <Text>
        <h2>Sponsoring McHacks</h2>
        <p>
          Imagine this: a room full of caffeine, creativity, and code. 500+
          students chasing the next big idea – using <em>your</em> tools,{" "}
          <em>your</em> tech, <em>your</em> spark.
        </p>
        <p>That’s McHacks.</p>
        <p>
          A 24-hour adrenaline rush where limits are tested and boundaries don’t
          exist. Your support fuels this magic, turning dreams into prototypes
          and imagination into impact. Bring your tech, your insight, and your
          energy, and let’s create something that lasts beyond just the 24
          Hours.
        </p>
        <p>
          View our{" "}
          <a href="https://mchacks.ca/sponsor.pdf">sponsorship package</a>. Our
          sponsorship tiers along with our add-ons are flexible and designed
          to meet your goals - whether it’s hiring, outreach, or community
          impact. Contact{" "}
          <a href="mailto:sponsorship@mchacks.ca">sponsorship@mchacks.ca</a> for
          more details.
        </p>
      </Text>
    </Content>
  </Container>
)

export default Sponsor
