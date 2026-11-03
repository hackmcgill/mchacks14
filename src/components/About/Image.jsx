import styled from "styled-components"

export const Image = styled.div`
  position: absolute;
  top: ${props => props.$top};
  right: ${props => props.$right};
  width: ${props => props.$width};
  transform: rotate(${(props) => props.$initrotation});
  transition: transform 0.3s ease-in-out; 
  
  &:hover {
    transform: rotate(${(props) => props.$hovrotation});
  } 
`
export default Image
