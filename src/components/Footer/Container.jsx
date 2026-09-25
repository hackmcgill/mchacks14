import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.footer`

  ${props => props.$isHomePage ? `
    background: rgba(170, 170, 170, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  ` : `
    background: ${styleVars.hackWhite};
    border-top: 1px solid ${styleVars.m13Red};
  `}

  

  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 80px;
  margin-top: 0;
  padding: 20px;
  gap: 32px;
  font-family: Afacad, sans-serif;
  font-size: 20px;

  @media only screen and (max-width: ${styleVars.lgUp}) {
    padding: 16px;
    gap: 24px;
    font-size: 1.125rem;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    gap: 16px;
    font-size: 1rem; 
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    font-size: 0.875rem;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    font-size: 0.75rem; 
    gap: 8px;

    .footer__social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
`

export default Container
