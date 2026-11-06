import React from "react"
import styled from "styled-components"

import Text from "./Text"

const Content = styled.div`
  position: absolute;
  top: 18%;
  left: 20%;
  max-width: 55vw;

  margin-right: 6vw;

  @media only screen and (max-width: 1200px) {
    position: static;
    max-width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 5vw 10vw;
    margin-right: 0;
  }
`

export const TextContent = () => (
  <Content>
    <Text>
      <h1>Your Next Stop: McHacks 14</h1>
      <p>
        Join 750+ hackers at McGill University for 24 hours of building,
        learning, and connecting. Whether you're exploring your first idea or
        bringing years of experience, McHacks is a place to try something new,
        collaborate with like-minded people, and turn your ideas into real
        projects. With hands-on workshops, supportive mentors, and a commlabely
        that welcomes everyone, we'll help you make the most of every hour.
        We'll take care of the food, you bring the ideas, and we'll see where
        they take you.
      </p>
      <p>Welcome aboard McHacks 14!</p>
    </Text>
  </Content>
)

export default TextContent
