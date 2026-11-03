import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Container from "./Container"
import Text from "./Text"
import Image from "./Image"

const About = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
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
      <p>Welcome aboard McHacks 14!</p>
    </Text>

    <Image
      $top="10%"
      $right="10%"
      $width="12vw"
      $initrotation="11deg"
      $hovrotation="4deg"
    >
      <StaticImage
        src="../../../static/About/about-image-1.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="30%"
      $right="12%"
      $width="11vw"
      $initrotation="-2deg"
      $hovrotation="-9deg"
    >
      <StaticImage
        src="../../../static/About/about-image-2.png"
        placeholder="blurred"
        alt="Image of hackathon speaker"
      />
    </Image>
    <Image
      $top="35%"
      $right="30%"
      $width="13vw"
      $initrotation="0deg"
      $hovrotation="-8deg"
    >
      <StaticImage
        src="../../../static/About/about-image-3.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="47%"
      $right="8%"
      $width="10vw"
      $initrotation="10deg"
      $hovrotation="18deg"
    >
      <StaticImage
        src="../../../static/About/about-image-4.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
  </Container>
)

export default About
