import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"

export const Container = styled.nav`
  z-index: 200;
  height: 7.2rem;
  width: 94%;
  border-radius: 24px;
  padding: 2rem 2.4rem;
  background-color: ${styleVars.m14Navy1000};
  position: fixed;
  top: 34px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .home-link {
    font-family: "ArcadeClassic", sans-serif;
    font-size: 24px;
    cursor:
      url(${HoverCursor}) 0 28,
      auto;
    color: ${styleVars.m12Maroon};
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .home-link:hover {
    color: white;
  }

  .Nav__links {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .Nav__socials {
  }

  .Nav__mlh-banner {
    position: fixed;
    top: 0;
    right: 4.5rem;
    right: calc(3rem + 0.9vw); // NEW
    width: 90px;
    height: auto;
    transition: opacity 0.15s ease-in-out;
    opacity: ${(props) => (props.$hasBorder ? "0" : "1")};
    pointer-events: ${(props) => (props.$hasBorder ? "none" : "")};
    z-index: 0;

    img {
      filter: drop-shadow(2px 4px 2px rgb(0 0 0 / 0.15));
      width: 10rem;
    }
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    display: none;
  }

  @media only screen and (max-width: ${(props) =>
      props.$hasBorder ? "1160px" : "1300px"}) {
    .Nav__socials {
      top: 75px;
    }
  }
`

export default Container
