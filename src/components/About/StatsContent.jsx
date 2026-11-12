import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import { ReactComponent as LineStats } from "../../../static/About/line-stats.svg"
import Text from "./Text"
import Stat from "./Stat"

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 0%;

  #titleStats {
    position: absolute;
    left: 30%;
    top: 14%;
  }

  .line {
    height: auto;
  }

  #lineStats {
    width: 58vw;
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    top: 60%;
  }

  @media only screen and (max-width: 600px) {
    top: 70%;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    top: 60%;

    #lineStats {
      width: 78vw;
    }
  }
`

const stats = [
  { number: "1500+", label: "applicants", top: "22%", left: "6%" },
  { number: "485", label: "projects submitted", top: "50%", left: "26%" },
  { number: "45", label: "schools", top: "50%", left: "62%" },
  { number: "7", label: "yummy meals", top: "66%", left: "90%" },
  { number: "40+", label: "mentors & judges", top: "80%", left: "10%" },
  { number: "12", label: "workshops & events", top: "84%", left: "54%" },
]

export const StatsContent = () => (
  <Content>
    <Text>
      <h1 id="titleStats">Last year, we had ...</h1>
    </Text>

    <LineStats className="line" id="lineStats" />

    {stats.map((s) => (
      <Stat $top={s.top} $left={s.left}>
        <span className="stat_number">{s.number}</span>
        <span className="stat_label">{s.label}</span>
      </Stat>
    ))}
  </Content>
)

export default StatsContent
