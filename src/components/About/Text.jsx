import styled from "styled-components"
import * as styleVars from "../variable"

export const Text = styled.div`
  max-width: 575px;
  font-size: 16px;
  height: min-content;


  h1 {
    color: ${styleVars.m13White};
    font-family: "Averia Serif Libre";
    text-align: center;
    font-size: 40px;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }

  p {
    color: ${styleVars.m13White};
    font-family: Afacad, sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    padding: 40px;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    padding: 0px;

    h1 {
      font-size: 17px;
      font-style: italic;
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
