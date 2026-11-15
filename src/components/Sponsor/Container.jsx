import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
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

  @media only screen and (max-width: 450px) {
    aspect-ratio: 2 / 2.8;
  }

  @media only screen and (max-width: 380px) {
    aspect-ratio: 2 / 3.6;
  }

`

export default Container
