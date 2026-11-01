import styled from "styled-components"
import * as styleVars from "../variable"

const Text = styled.div`
  font-size: 22px;
  max-width: 682px;

  h1 {
    color: ${styleVars.m14OffWhite};
    font-family: "Schibsted Grotesk";
    font-size: 40px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {

    h1 {
      font-size: 17px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.85px;
    }
  }
`

export default Text
