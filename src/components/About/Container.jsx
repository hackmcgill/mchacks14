import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 10 / 9;
  
  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: ${styleVars.lgUp}) {
    aspect-ratio: 9 / 10;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    aspect-ratio: 8 / 10;
  }

  @media only screen and (max-width: 600px) {
    aspect-ratio: 7 / 10;
  }
`

export default Container
