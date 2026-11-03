import styled from "styled-components"
import * as styleVars from "../variable"

export const Text = styled.div`
  max-width: 50vw;
  font-size: 22px;
  height: min-content;

  margin-right: 15vw;

  h2 {
    color: ${styleVars.m14OffWhite};
    font-family: "Schibsted Grotesk";
    font-size: 40px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }

  p {
    color: ${styleVars.m14OffWhite};
    font-family: "Instrument Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {

    h2 {
      font-size: 17px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.85px;
    }
    p {
      padding: 0px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`

export default Text
