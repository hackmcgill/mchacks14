import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Container from "./Container"
import Text from "./Text"
import Image from "./Image"

const Sponsor = ({ scrollRef }) => (
  <Container ref={scrollRef}>
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
    <Image
      $top="20%"
      $right="12%"
      $width="13vw"
      $initrotation="-4deg"
      $hovrotation="-11deg"
    >
      <StaticImage
        src="../../../static/About/about-image-5.png"
        placeholder="blurred"
        alt="Image of hackathon speaker"
      />
    </Image>
    <Image
      $top="55%"
      $right="10%"
      $width="10vw"
      $initrotation="-3deg"
      $hovrotation="-10deg"
    >
      <StaticImage
        src="../../../static/About/about-image-6.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="55%"
      $right="35%"
      $width="14vw"
      $initrotation="4deg"
      $hovrotation="11deg"
    >
      <StaticImage
        src="../../../static/About/about-image-7.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
  </Container>
)

export default Sponsor
