import styled from "styled-components"
import * as styleVars from "../variable"
import meetTheTeamBackground from "./McHacks14-MeetTheTeamBackground.png"

const Container = styled.section`
  width: 100%;
  margin-top: 4rem;
  padding: 4rem 0 5rem;
  background-color: ${styleVars.m13White};
  background-image: url(${meetTheTeamBackground});
  background-repeat: repeat;
  background-size: 960px auto;
  background-position: center top;

  @media screen and (max-width: ${styleVars.smUp}) {
    margin-top: 2rem;
    padding: 2.5rem 0 3rem;
    background-size: 640px auto;
  }
`

export default Container
