import styled from "styled-components"
import * as styleVars from "../variable"
import wallTile from "../../assets/images/wall-tile.webp"
import { TILE_W, TILE_H, STATIC_MODE_QUERY } from "../FAQ/faqScene.config"

const Container = styled.section`
  position: relative;
  height: 795px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 76px;
  padding: 165px 24px 130px;
  background-color: #e4ebf2;
  background-image: url("${wallTile}");
  background-repeat: repeat;
  background-position: 0 0;
  background-size: ${TILE_W}px ${TILE_H}px;

  @media ${STATIC_MODE_QUERY} {
    background-size: ${TILE_W / 2}px ${TILE_H / 2}px;
    height: 1370px;
  }

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
