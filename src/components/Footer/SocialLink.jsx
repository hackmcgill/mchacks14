import styled from "styled-components"
import * as styleVars from "../variable"

export const SocialLink = styled.a`
  ${props => props.$isHomePage ? `
    color: ${styleVars.hackWhite};
    &:focus,
    &:hover {
      color: ${styleVars.colorHackRed};
    }
  ` : `
    color: ${styleVars.m13Red};
    &:focus,
    &:hover {
      color: ${styleVars.m12Maroon};
    } 
  `}
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
`;

export default SocialLink;
