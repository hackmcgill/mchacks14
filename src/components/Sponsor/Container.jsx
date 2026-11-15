import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  min-width: 360px;
  aspect-ratio: 2 / 1;

  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: ${styleVars.lgUp}) {
    aspect-ratio: 2 / 1.1;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    aspect-ratio: 2 / 1.2;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    aspect-ratio: 2 / 2.4;
  }
`

export default Container
