import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  min-width: 360px;
  aspect-ratio: 10 / 9;

  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: ${styleVars.lgUp}) {
    aspect-ratio: 10 / 9.6;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    aspect-ratio: 10 / 10;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    aspect-ratio: 10 / 19;
  }

  @media only screen and (max-width: 500px) {
    aspect-ratio: 10 / 24;
  }
`

export default Container
