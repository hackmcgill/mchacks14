import React from "react"
import styled from "styled-components"

import { ReactComponent as LineGreen } from "../../../static/About/line-green.svg"
import { ReactComponent as LineMaroon } from "../../../static/About/line-maroon.svg"
import { ReactComponent as LineOrange } from "../../../static/About/line-orange.svg"
import { ReactComponent as LineRed } from "../../../static/About/line-red.svg"
import { ReactComponent as LineTeal } from "../../../static/About/line-teal.svg"
import { ReactComponent as LineYellow } from "../../../static/About/line-yellow.svg"

const Content = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: inherit;
  height: inherit;
  aspect-ratio: inherit;

  .line {
    position: absolute;
    height: auto;
  }

  #lineRed {
    left: 0%;
    top: 6%;
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
    width: 28vw;
  }

  #lineOrange {
    right: 4%;
    top: 0%;
    width: 15vw;
  }

  #lineTeal {
    right: 0%;
    top: 44%;
    width: 20vw;
  }

  #lineGreen {
    right: 0%;
    top: 72%;
    width: 38vw;
  }

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`

export const LinesContent = () => (
  <Content>
    <LineMaroon className="line" id="lineMaroon" />
    <LineOrange className="line" id="lineOrange" />
    <LineRed className="line" id="lineRed" />
    <LineTeal className="line" id="lineTeal" />
    <LineYellow className="line" id="lineYellow" />
    <LineGreen className="line" id="lineGreen" />
  </Content>
)

export default LinesContent
