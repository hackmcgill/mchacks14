import styled from "styled-components"
import * as styleVars from "../variable"

export const Text = styled.div`
  line-height: normal;

  h1 {
    color: ${styleVars.m14OffWhite};
    font-family: "Schibsted Grotesk";
    font-weight: 700;
    font-size: clamp(17px, calc(9.333px + 2.1296vw), 40px);
    letter-spacing: -5%;
  }

  p {
    color: ${styleVars.m14OffWhite};
    font-family: "Instrument Sans", sans-serif;
    font-weight: 400;
    font-size: clamp(14px, calc(11.333px + 0.7407vw), 22px);
  }
`

export default Text
