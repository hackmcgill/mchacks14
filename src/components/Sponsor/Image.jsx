import styled from "styled-components"

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

  @media only screen and (max-width: 1200px) {
    position: static;
    width: 15vw;
    margin: 0 2vw; 
  }
`

export default Image
