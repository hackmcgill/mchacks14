import styled from "styled-components"
import * as styleVars from "../variable"
import meetTheTeamBackground from "./McHacks14-MeetTheTeamBackground.png"
import meetTheTeamPlatform from "../../assets/images/designs/mchacks14-platform.webp"
import meetTheTeamBlackLine from "../../assets/images/designs/mchacks14-platform-black-line.webp"
import meetTheTeamHeading from "../../assets/images/designs/mchacks14-team-heading.webp"

export const HeadingImage = styled.img.attrs({ src: meetTheTeamHeading, alt: "Meet the Team" })`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  max-width: 55%;
  height: auto;
  pointer-events: none;
  @media screen and (max-width: ${styleVars.smUp}) {
    max-width: 80%;
    top: 52%;
  }
`;

const Container = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${styleVars.m13White} url(${meetTheTeamBackground});

  @media screen and (max-width: ${styleVars.smUp}) {
    background-size: 640px auto;
  }
`;

export const Platform = styled.img.attrs({ src: meetTheTeamPlatform, alt: "The Metro Platform" })`
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  pointer-events: none;
`;

export const BlackLine = styled.img.attrs({ src: meetTheTeamBlackLine, alt: "" })`
  position: absolute;
  display: block;
  width: 100%;
  height: auto;
  bottom: calc(100vw * 924 / 5760 + min(36vh, 280px) * 0.34);
`;

export default Container
