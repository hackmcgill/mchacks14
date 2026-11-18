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

  /* Every stop breathes slowly so it reads as clickable; the selected stop
     turns green. Sized to the ~20px stop dot in the 461px board export. */
  .glow {
    position: absolute;
    width: 4.4%;
    aspect-ratio: 1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: background-color 0.3s ease;

    /* the halo pulses on its own layer so the green centre stays solid */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      box-shadow:
        0 0 6px 2px rgba(255, 248, 232, 0.85),
        0 0 16px 6px rgba(255, 244, 214, 0.4);
      animation: stop-pulse 4s ease-in-out infinite;
      transition: box-shadow 0.3s ease;
    }

    &.is-active {
      background-color: #4fc760;
    }

    &.is-active::before {
      box-shadow:
        0 0 6px 2px rgba(79, 199, 96, 0.9),
        0 0 18px 7px rgba(79, 199, 96, 0.45);
    }
  }

  @keyframes stop-pulse {
    0%,
    100% {
      opacity: 0.15;
    }
    50% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glow::before {
      animation: none;
      opacity: 0.6;
    }
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    flex-basis: auto;
    width: min(100%, 450px);
  }
`

export default Board
