import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.footer`
  background: ${styleVars.m14Grey900};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: start;
  height: 15.2rem;
  padding: 4rem 2.4rem;
  gap: 3.2rem;
  font-family: "Instrument Sans", sans-serif;
  font-size: 1.8rem;

  .footer__logo {
    flex-shrink: 0;
  }

  .footer__social-links {
    margin-left: auto;
  }

  a {
    color: ${styleVars.m14GlowAmber300};

    &:focus,
    &:hover {
      color: ${styleVars.m14GlowAmber200};
    }
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    gap: 3rem;
    padding: 4rem 7vw;
    font-size: 1.6rem;

    .footer__social-links {
      margin-left: auto;
    }
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
  }
`

export default Container
