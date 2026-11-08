import styled from "styled-components"
import * as styleVars from "../variable"
import wallTile from "../../assets/images/wall-tile.webp"
import { TILE_W, TILE_H, STATIC_MODE_QUERY } from "../FAQ/faqScene.config"

const Container = styled.section`
  width: 100%;
  padding: 4rem 0 5rem;
  background-color: #e4ebf2;
  background-image: url("${wallTile}");
  background-repeat: repeat;
  background-position: 0 0;
  background-size: ${TILE_W}px ${TILE_H}px;

  @media ${STATIC_MODE_QUERY} {
    background-size: ${TILE_W / 2}px ${TILE_H / 2}px;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    padding: 2.5rem 0 3rem;
  }
`

export default Container
