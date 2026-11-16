import styled from "styled-components"
import * as styleVars from "../variable"
import wallTile from "../../assets/images/wall-tile.webp"
import { TILE_W, TILE_H, STATIC_MODE_QUERY } from "../FAQ/faqScene.config"
import meetTheTeamPlatform from "../../assets/images/designs/mchacks14-platform.webp"
import meetTheTeamBlackLine from "../../assets/images/designs/mchacks14-platform-black-line.webp"
import meetTheTeamHeading from "../../assets/images/designs/mchacks14-team-heading.webp"

export const HeadingImage = styled.img.attrs({
  src: meetTheTeamHeading,
  alt: "Meet the Team",
})`
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  max-width: 70%;
  height: auto;
  pointer-events: none;
  @media screen and (max-width: ${styleVars.smUp}) {
    max-width: 110%;
    top: 33%;
  }
`

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  /* The heading is 110% wide on phones (its edges are transparent padding):
     clip what sticks out so the page doesn't scroll sideways. */
  overflow-x: clip;
  /* Same wall tile (and tile scale) as the FAQ and Get Involved sections. */
  background-color: #e4ebf2;
  background-image: url("${wallTile}");
  background-repeat: repeat;
  /* The FAQ publishes where its tile pattern ends so the tiles run on unbroken. */
  background-position: var(--faq-tile-x, 0px) var(--faq-tile-y, 0px);
  background-size: ${TILE_W}px ${TILE_H}px;

  @media ${STATIC_MODE_QUERY} {
    background-size: ${TILE_W / 2}px ${TILE_H / 2}px;
  }
`

export const Platform = styled.img.attrs({
  src: meetTheTeamPlatform,
  alt: "The Metro Platform",
})`
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  pointer-events: none;
`

export const BlackLine = styled.img.attrs({
  src: meetTheTeamBlackLine,
  alt: "",
})`
  position: absolute;
  display: block;
  width: 100%;
  height: auto;
  bottom: calc(100vw * 924 / 5760 + 280px * 0.34);
`

export default Container
