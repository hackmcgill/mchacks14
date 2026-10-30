import styled from "styled-components"
import * as styleVars from "../variable"
import WallTile from "../../../static/GetInvolvedDesign/wall-tile-white-blue 1.jpg"

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 76px;
  padding: 165px 24px 130px;
  background: #d5dfea url("${WallTile}") center / cover no-repeat;

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media screen and (max-width: ${styleVars.mdUp}) {
    gap: 40px;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 110px 16px 72px;
  }
`

export default Container
