import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 10 / 9;
  
  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: 1200px) {
    aspect-ratio: 3 / 4;
  }

  @media only screen and (max-width: 600px) {
    aspect-ratio: 2 / 3;
  }
    
  @media only screen and (max-width: 400px) {
    aspect-ratio: 3 / 5;
  }
`

export default Container
