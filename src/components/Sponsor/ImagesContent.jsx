import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import * as styleVars from "../variable"

import Image from "./Image"

const Content = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
    height: inherit;
  width: inherit;
  aspect-ratio: inherit;

  @media only screen and (max-width: ${styleVars.lgUp}) {
    right: 10%;
    top: 16%;
    height: max-content;
    width: max-content;

    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    top: 15%;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    display: none;
  }

  @media only screen and (min-width: ${styleVars.lgUp}) and (max-width: 1280px) {
    height: 110vh;
  }
`

export const ImagesContent = () => (
  <Content>
    <Image
      $top="14%"
      $right="10%"
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
      $right="8%"
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
      $top="62%"
      $right="30%"
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
