import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import Image from "./Image"
import image1 from "../../../static/About/about-image-1.webp"
import image2 from "../../../static/About/about-image-2.webp"
import image3 from "../../../static/About/about-image-3.webp"
import image4 from "../../../static/About/about-image-4.webp"

const Content = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  height: inherit;
  width: inherit;
  aspect-ratio: inherit;

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
    mobiletop: "40%",
    mobileright: "50%",
    width: "12vw",
    mobilewidth: "44%",
    initrotation: "10deg",
    hovrotation: "4deg",
    alt: "Image of hackathon participants",
  },
  {
    src: image2,
    top: "42%",
    right: "10%",
    mobiletop: "40%",
    mobileright: "20%",
    width: "11vw",
    mobilewidth: "40%",
    initrotation: "-4deg",
    hovrotation: "-10deg",
    alt: "Image of hackathon speaker",
  },
  {
    src: image3,
    top: "46%",
    right: "34%",
    mobiletop: "54%",
    mobileright: "60%",
    width: "13vw",
    mobilewidth: "40%",
    initrotation: "0deg",
    hovrotation: "8deg",
    alt: "Image of hackathon participants",
  },
  {
    src: image4,
    top: "60%",
    right: "14%",
    mobiletop: "54%",
    mobileright: "20%",
    width: "10vw",
    mobilewidth: "44%",
    initrotation: "-6deg",
    hovrotation: "-14deg",
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
