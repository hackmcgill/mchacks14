import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 3 / 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10%;
  padding-bottom: 10%;
  
  background-color: ${styleVars.m14Dark};
`

export default Container
