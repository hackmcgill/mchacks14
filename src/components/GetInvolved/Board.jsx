import styled from "styled-components"
import * as styleVars from "../variable"

export const Board = styled.div`
  position: relative;
  flex: 0 1 450px;
  min-width: 0;

  .board-image {
    display: block;
    width: 100%;
    height: auto;
  }

  /* Station names: orange by default, white for the selected role */
  .label {
    position: absolute;
    pointer-events: none;
    background-color: #e49832;
    -webkit-mask: var(--mask) center / 100% 100% no-repeat;
    mask: var(--mask) center / 100% 100% no-repeat;
    transition: background-color 0.2s ease;

    &.is-active {
      background-color: #fbf4e6;
      filter: drop-shadow(0 0 2px rgba(255, 238, 205, 0.75));
    }
  }

  .station {
    position: absolute;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 999px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(249, 237, 223, 0.1);
    }

    &:focus-visible {
      outline: 2px solid ${styleVars.m13White};
      outline-offset: 2px;
    }
  }

  .glow {
    position: absolute;
    width: 5.5%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    box-shadow:
      0 0 8px 3px rgba(255, 255, 255, 0.85),
      0 0 22px 8px rgba(255, 244, 214, 0.45);
    animation: station-pulse 2.4s ease-in-out infinite;
  }

  @keyframes station-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.65;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glow {
      animation: none;
    }
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    flex-basis: auto;
    width: min(100%, 450px);
  }
`

export default Board
