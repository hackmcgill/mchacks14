import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.footer`
  background: ${styleVars.m14Grey900};
  display: flex;
  width: 100%;
  /* Keep the social-icon row from pushing the page wider than the viewport on
     very narrow screens (which would expose the navy body background). */
  overflow-x: clip;
  justify-content: center;
  align-items: start;
  height: 15.2rem;
  padding: 4rem 2.4rem;
  gap: 3.2rem;
  font-size: 1.6rem;

  .footer__logo {
    flex-shrink: 0;
  }

  .footer__social-links {
    margin-left: auto;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    height: 20rem;
    padding: 4rem 7vw;

    .footer__logo {
      width: 4.8rem;
      grid-row: span 2;
    }

    .footer__social-links > div {
      justify-content: flex-end;
      gap: 1.8rem;
    }
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    padding: 3.5rem 8vw;
    gap: 2rem;
    font-size: 1.5rem;

    /* The icon row sits beside the logo and only gets ~84vw - 68px; at full
       gap (1.8rem) it needs ~255px, which doesn't fit below ~360px. Shrink the
       gap with the screen, and wrap rather than overflow as a last resort. */
    .footer__social-links > div {
      flex-wrap: wrap;
      gap: 1.2rem clamp(0.6rem, 14vw - 3.8rem, 1.8rem);
    }
  }
`

export default Container
