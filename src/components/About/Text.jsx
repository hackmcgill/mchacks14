import styled from "styled-components"
import * as styleVars from "../variable"

export const Text = styled.div`
  font-size: 22px;
  line-height: normal;

  h1 {
    color: ${styleVars.m14OffWhite};
    font-family: "Schibsted Grotesk";
    font-weight: 700;
    font-size: 40px;
    letter-spacing: -2px;
  }

  p {
    color: ${styleVars.m14OffWhite};
    font-family: "Instrument Sans", sans-serif;
    font-weight: 400;
    font-size: 22px;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    h1 {
      font-size: 32px;
      letter-spacing: -1.6px;
    }
    p {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    h1 {
      font-size: 24px;
      letter-spacing: -1.2px;
    }
    p {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    h1 {
      font-size: 17px;
      letter-spacing: -0.85px;
    }
    p {
      font-size: 14px;
    }
  }
`

export default Text
