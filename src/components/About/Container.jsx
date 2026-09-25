import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;

  @media only screen and (max-width: 1250px) {
    margin-top: 100px;
  }

  @media only screen and (max-width: 1158px) {
    margin-top: 50px;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    margin-top: 20px;
    width: 80%;
  }

`

export default Container
