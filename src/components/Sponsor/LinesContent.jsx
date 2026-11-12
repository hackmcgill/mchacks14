import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import { ReactComponent as LineBlue } from "../../../static/Sponsor/line-blue.svg"
import { ReactComponent as LineGreen } from "../../../static/Sponsor/line-green.svg"
import { ReactComponent as LineOrange } from "../../../static/Sponsor/line-orange.svg"

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

  #lineOrange {
    left: 0%;
    bottom: 0%;
    width: 50vw;
  }

  #lineBlue {
    left: 0%;
    bottom: 0%;
    width: 12vw;
  }

  #lineGreen {
    left: 0%;
    bottom: 0%;
    width: 45vw;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    display: none;
  }
`

export const LinesContent = () => (
  <Content>
    <LineBlue className="line" id="lineBlue" />
    <LineGreen className="line" id="lineGreen" />
    <LineOrange className="line" id="lineOrange" />
  </Content>
)

export default LinesContent
