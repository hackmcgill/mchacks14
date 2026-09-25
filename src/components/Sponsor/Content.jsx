import styled from "styled-components"
import * as styleVars from "../variable"

export default styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.3);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 16px 36px;
  gap: 40px;

  @media only screen and (max-width: ${styleVars.mdUp}) {
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 40px;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    padding: 0;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    padding: 10px;
    gap: 30px;
  }
`
