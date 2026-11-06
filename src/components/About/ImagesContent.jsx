import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

import Image from "./Image"

const Content = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  height: 100vh;
  width: 50vw;

  @media only screen and (max-width: 1200px) {
    right: 10%;
    top: 40%;
    height: max-content;
    width: max-content;

    display: flex;
    flex-direction: row;
  }

  @media only screen and (max-width: 800px) {
    right: 10%;
    top: 46%;
  }

  @media only screen and (max-width: 400px) {
    right: 10%;
    top: 50%;
  }

  @media only screen and (max-width: 1280px) {
    height: 110vh;
  }
`

export const ImagesContent = () => (
  <Content>
    <Image
      $top="24%"
      $right="18%"
      $width="12vw"
      $initrotation="10deg"
      $hovrotation="4deg"
    >
      <StaticImage
        src="../../../static/About/about-image-1.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="56%"
      $right="26%"
      $width="11vw"
      $initrotation="-4deg"
      $hovrotation="-10deg"
    >
      <StaticImage
        src="../../../static/About/about-image-2.png"
        placeholder="blurred"
        alt="Image of hackathon speaker"
      />
    </Image>
    <Image
      $top="62%"
      $right="56%"
      $width="13vw"
      $initrotation="0deg"
      $hovrotation="8deg"
    >
      <StaticImage
        src="../../../static/About/about-image-3.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="84%"
      $right="22%"
      $width="10vw"
      $initrotation="-6deg"
      $hovrotation="-14deg"
    >
      <StaticImage
        src="../../../static/About/about-image-4.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
  </Content>
)

export default ImagesContent
