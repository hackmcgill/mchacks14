import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  min-width: 360px;
  aspect-ratio: 10 / 9;
  /* Clip the decorative 100vw lines and any non-wrapping text so this section
     can't push the page wider than the viewport (which would expose the navy
     body background on very narrow screens). Only clips the horizontal axis,
     so nothing is cut vertically. */
  overflow-x: clip;

  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: ${styleVars.lgUp}) {
    aspect-ratio: 10 / 9.6;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    aspect-ratio: 10 / 10;
  }

  /* On small screens, stop using a fixed aspect-ratio canvas with absolutely
     positioned children. Flow the sections as a vertical column so nothing
     can overlap regardless of how tall the text wraps. */
  @media only screen and (max-width: ${styleVars.smUp}) {
    aspect-ratio: auto;
    height: auto;
    min-width: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(28px, 8vw, 64px);
    padding: clamp(36px, 12vw, 80px) 0;
  }
`

export default Container
