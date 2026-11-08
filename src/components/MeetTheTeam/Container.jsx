import styled from "styled-components"
import * as styleVars from "../variable"
import meetTheTeamBackground from "./McHacks14-MeetTheTeamBackground.png"
import meetTheTeamPlatform from "../../assets/images/designs/mchacks14-platform.webp"

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

export default Container
