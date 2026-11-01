import styled from "styled-components"
import * as styleVars from "../variable"

export const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1440px;

  @media only screen and (max-width: ${styleVars.mdUp}) {
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {

  }
`
