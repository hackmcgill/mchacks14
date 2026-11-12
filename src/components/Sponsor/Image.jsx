import styled from "styled-components"
import * as styleVars from "../variable"

export const Image = styled.div`
  position: absolute;
  top: ${props => props.$top};
  right: ${props => props.$right};
  width: ${props => props.$width};
  transform: rotate(${(props) => props.$initrotation});
  transform-origin: top center;
  transition: transform 0.3s ease-in-out; 
  
  &:hover {
    transform: rotate(${(props) => props.$hovrotation});
  } 

  @media only screen and (max-width: ${styleVars.lgUp}) {
    position: static;
    width: 12vw;
  }
`

export default Image
