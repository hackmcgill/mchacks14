import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import Image from "./Image"
import image1 from "../../../static/About/about-image-1.png"
import image2 from "../../../static/About/about-image-2.png"
import image3 from "../../../static/About/about-image-3.png"
import image4 from "../../../static/About/about-image-4.png"

const Content = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  height: inherit;
  width: inherit;
  aspect-ratio: inherit;

  @media only screen and (max-width: 500px) {
    img:nth-child(-n + 2) {
      top: 47%;
    }

    img:nth-child(n + 3) {
      top: 58%;
    }
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
    mobilewidth: "30vw",
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
    mobilewidth: "26vw",
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
    mobilewidth: "26vw",
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
    mobilewidth: "30vw",
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
