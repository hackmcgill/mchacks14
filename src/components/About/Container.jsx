import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 1 / 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10%;
  padding-bottom: 10%;
  
  background-color: ${styleVars.m14Dark};

  .line {
    position: absolute;
    height: auto;
  }

  #lineStats {
    left: 0%;
    top: 43%;
    width: 60vw;
  }

  #lineRed {
    left: 0%;
    top: 5%;
    width: 100vw;
  }

  #lineYellow {
    left: 0%;
    top: 0%;
    width: 100vw;
  }

  #lineMaroon {
    left: 0%;
    top: 0%;
    width: 29vw;
  }

  #lineOrange {
    right: 4%;
    top: 0%;
    width: 13vw;
  }

  #lineTeal {
    right: 0%;
    top: 34%;
    width: 18vw;
  }

  #lineGreen {
    right: 0%;
    top: 58%;
    width: 32vw;
  }
`

export default Container
