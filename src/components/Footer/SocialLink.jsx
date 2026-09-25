import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"


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
  cursor: url(${HoverCursor}) 0 28, auto;
  text-decoration: none;
  font-size: 16px;
`;

export default SocialLink;
