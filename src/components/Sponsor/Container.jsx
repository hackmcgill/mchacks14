import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styleVars.m14Dark};

  @media (max-width: 1500px) {
  }
  @media (max-width: ${styleVars.lgUp}) {
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    width: 80%;
  }
`

export default Container
