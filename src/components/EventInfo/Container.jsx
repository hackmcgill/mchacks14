import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: 1345px) {
  }

  @media only screen and (max-width: 1118px) {
    flex-direction: column;
    justify-content: center;
  }
`

export default Container
