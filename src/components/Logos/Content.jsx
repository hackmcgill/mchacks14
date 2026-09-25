import styled from "styled-components"
import * as styleVars from "../variable"

export const Content = styled.section`
  padding-bottom: 15rem;
  display:flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 40px;
    text-align: center;
    color: ${styleVars.m13White};
    margin: 7rem 0 2rem 0;
    font-family: "Averia Serif Libre";
    font-style: italic;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    h1 {
      font-size: 17px;
      font-style: italic;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.85px;
    }
  }
`

export default Content
