import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import Image from "./Image"
import image1 from "../../../static/Sponsor/sponsor-image-1.webp"
import image2 from "../../../static/Sponsor/sponsor-image-2.webp"
import image3 from "../../../static/Sponsor/sponsor-image-3.webp"

const Content = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  height: inherit;
  width: inherit;
  aspect-ratio: inherit;

  @media only screen and (max-width: ${styleVars.lgUp}) {
    top: 4%;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    top: 8%;
  }

  /* On small screens, lay the photos out as a wrapping flex band so they
     can never overlap each other regardless of device width. */
  @media only screen and (max-width: ${styleVars.smUp}) {
    position: static;
    top: auto;
    right: auto;
    width: 100%;
    height: auto;
    aspect-ratio: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px 6%;
    padding: 0 8%;
    box-sizing: border-box;
  }
`

const images = [
  {
    src: image1,
    top: "14%",
    right: "10%",
    mobiletop: "50%",
    mobileright: "10%",
    width: "13vw",
    mobilewidth: "44%",
    initrotation: "-4deg",
    hovrotation: "-12deg",
    alt: "Image of hackathon speaker",
  },
  {
    src: image2,
    top: "50%",
    right: "8%",
    mobiletop: "60%",
    mobileright: "60%",
    width: "10vw",
    mobilewidth: "42%",
    initrotation: "-2deg",
    hovrotation: "-10deg",
    alt: "Image of hackathon participants",
  },
  {
    src: image3,
    top: "62%",
    right: "30%",
    mobiletop: "74%",
    mobileright: "20%",
    width: "14vw",
    mobilewidth: "44%",
    initrotation: "4deg",
    hovrotation: "12deg",
    alt: "Image of hackathon participants",
  },
]

export const ImagesContent = () => (
  <Content>
    {images.map((image) => (
      <Image
        key={image.src}
        $top={image.top}
        $right={image.right}
        $mobiletop={image.mobiletop}
        $mobileright={image.mobileright}
        $width={image.width}
        $mobilewidth={image.mobilewidth}
        $initrotation={image.initrotation}
        $hovrotation={image.hovrotation}
        src={image.src}
        alt={image.alt}
      />
    ))}
  </Content>
)

export default ImagesContent
