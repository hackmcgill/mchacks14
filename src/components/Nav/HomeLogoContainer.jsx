import styled from "styled-components"
import * as styleVars from "../variable"

export const HomeLogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 1rem 0;
  top: 14px;
  left: calc(40px);
  gap: 2.5vw;
  height: 60px;
  @media only screen and (min-width: ${styleVars.smUp}) {
    display: none;
  }
`

export default HomeLogoContainer