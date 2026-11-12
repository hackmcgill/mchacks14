import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 2 / 1;

  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: ${styleVars.lgUp}) {
    aspect-ratio: 3 / 2;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    aspect-ratio: 4 / 3;
  }

  @media only screen and (max-width: 600px) {
    aspect-ratio: 4 / 5;
  }
`

export default Container
