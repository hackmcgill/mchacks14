import React from "react"
import styled from "styled-components"

import Text from "./Text"

const Content = styled.div`
  position: absolute;
  top: 6%;
  left: 22%;
`

export const TextContent = () => (
  <Content>
    <Text>
      <h2>Sponsor a Weekend of Building</h2>
      <p>
        McHacks brings together 750+ students to build projects, learn from each
        other, and explore new ideas in tech. None of it would be possible
        without our sponsors, who make the event happen while connecting with
        the next generation of developers, designers, and problem-solvers.
      </p>
      <p>
        Interested in partnering with us? Contact us at{" "}
        <a href="mailto:sponsorship@mchacks.ca">sponsorship@mchacks.ca</a>.
        Whether you're looking to recruit emerging talent, showcase your
        products, or support student innovation, we'd love to hear from you!
      </p>
    </Text>
  </Content>
)

export default TextContent
