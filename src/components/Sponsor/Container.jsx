import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  margin-top: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 280px;

  @media (max-width: 1500px) {
    margin-top: 300px;

  @media (max-width: ${styleVars.lgUp}) {
    margin-top: 200px;
    padding-left: 140px;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    margin-top: 20px;
    width: 80%;
  }
`

export default Container
