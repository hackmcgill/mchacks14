import styled from "styled-components"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"

export const IconContainer = styled.div`
  cursor: url(${HoverCursor}) 0 28, auto;
  // margin: 8px 0 0 34px;
  margin: 8px 0 0 calc(1.7vw); // NEW
`

export default IconContainer
