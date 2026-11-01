import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${styleVars.m14Dark};

  @media only screen and (max-width: 1250px) {
  }

  @media only screen and (max-width: 1158px) {
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
