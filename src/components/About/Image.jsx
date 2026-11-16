import styled from "styled-components"
import * as styleVars from "../variable"

export const Image = styled.img`
  position: absolute;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  width: ${(props) => props.$width};
  transform: rotate(${(props) => props.$initrotation});
  transform-origin: top center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(${(props) => props.$hovrotation});
  }
    
  @media only screen and (max-width: ${styleVars.smUp}) {
    /* flow inside the flex band instead of absolute positioning */
    position: static;
    top: auto;
    right: auto;
    width: ${(props) => props.$mobilewidth};
    height: auto;
  }
`
export default Image
