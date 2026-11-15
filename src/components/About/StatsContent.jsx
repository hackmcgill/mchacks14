import React from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

import { ReactComponent as LineStats } from "../../../static/About/line-stats.svg"
import Text from "./Text"
import Stat from "./Stat"

const Content = styled.div`
  position: absolute;
  bottom: 10%;
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

  @media only screen and (max-width: ${styleVars.smUp}) {
    bottom: 6%;

    #lineStats {
      width: 78vw;
    }
  }
`

const stats = [
  { number: "1500+", label: "applicants", top: "32%", left: "12%" },
  { number: "485", label: "projects submitted", top: "60%", left: "32%" },
  { number: "45", label: "schools", top: "60%", left: "68%" },
  { number: "7", label: "yummy meals", top: "76%", left: "98%" },
  { number: "40+", label: "mentors & judges", top: "90%", left: "16%" },
  { number: "12", label: "workshops & events", top: "94%", left: "60%" },
]

export const StatsContent = () => (
  <Content>
    <Text>
      <h1 id="titleStats">Last year, we had ...</h1>
    </Text>

    <LineStats className="line" id="lineStats" />

    {stats.map((s) => (
      <Stat $top={s.top} $left={s.left} key={s.label}>
        <span className="stat_number">{s.number}</span>
        <span className="stat_label">{s.label}</span>
      </Stat>
    ))}
  </Content>
)

export default StatsContent
