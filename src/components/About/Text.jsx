import styled from "styled-components"
import * as styleVars from "../variable"

export const Text = styled.div`
  font-size: 22px;

  h1 {
    color: ${styleVars.m14OffWhite};
    font-family: "Schibsted Grotesk";
    font-size: 40px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }

  p {
    color: ${styleVars.m14OffWhite};
    font-family: "Instrument Sans", sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {

    h1 {
      font-size: 17px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.85px;
    }
    p {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`

export default Text
