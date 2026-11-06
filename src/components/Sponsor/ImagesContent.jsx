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
    display: none;
  }
    
  @media only screen and (max-width: 1280px) {
    height: 110vh;
  }
`

export const ImagesContent = () => (
  <Content>
    <Image
      $top="14%"
      $right="16%"
      $width="13vw"
      $initrotation="-4deg"
      $hovrotation="-12deg"
    >
      <StaticImage
        src="../../../static/Sponsor/sponsor-image-1.png"
        placeholder="blurred"
        alt="Image of hackathon speaker"
      />
    </Image>
    <Image
      $top="50%"
      $right="12%"
      $width="10vw"
      $initrotation="-2deg"
      $hovrotation="-10deg"
    >
      <StaticImage
        src="../../../static/Sponsor/sponsor-image-2.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
    <Image
      $top="50%"
      $right="60%"
      $width="14vw"
      $initrotation="4deg"
      $hovrotation="12deg"
    >
      <StaticImage
        src="../../../static/Sponsor/sponsor-image-3.png"
        placeholder="blurred"
        alt="Image of hackathon participants"
      />
    </Image>
  </Content>
)

export default ImagesContent
