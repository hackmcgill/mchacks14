import styled from "styled-components"
import * as styleVars from "../variable"

export const WindowStyles = styled.div`
  --scaling-factor: 1 / 1442 * 100vw;
  position: relative;
  margin: auto;

  max-width: 900px;
  text-align: center;
  background-color: rgba(170, 170, 170, 0.3);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 16px 56px 32px;

  h2 {
    font-family: "Averia Serif Libre";
    color: ${styleVars.m13White};
    font-style: italic;
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 10px;
  }

  .content {
    position: relative;
  }

  .question {
    font-family: "Afacad";
    font-size: 16px;
    color: ${styleVars.m12White};
  }

  @media screen and (max-width: ${styleVars.lgUp}) {
    width: 70%;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    width: 80%;
    padding: 20px;

    h2 {
      font-size: 17px;
      font-style: italic;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.85px;
    }
  }
`
export default WindowStyles
