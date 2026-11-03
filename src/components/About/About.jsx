import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Container from "./Container"
import Text from "./Text"
import Image from "./Image"
import Stat from "./Stat"

const stats = [
  { number: "1500+", label: "applicants", top: "52%", left: "5%" },
  { number: "485", label: "projects submitted", top: "62%", left: "20%" },
  { number: "45", label: "schools", top: "62%", left: "40%" },
  { number: "7", label: "yummy meals", top: "70%", left: "53%" },
  { number: "40+", label: "mentors & judges", top: "75%", left: "10%" },
  { number: "12", label: "workshops & events", top: "77%", left: "30%" },
]

const About = ({ scrollRef }) => (
  <Container ref={scrollRef} style={{}}>
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

    <Text>
      <h1 id="stats_title">Last year, we had ...</h1>
    </Text>
    {stats.map((s) => (
      <Stat $top={s.top} $left={s.left}>
        <span className="stat_number">{s.number}</span>
        <span className="stat_label">{s.label}</span>
      </Stat>
    ))}
  </Container>
)

export default About
