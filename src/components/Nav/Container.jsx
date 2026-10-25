import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"

export const Container = styled.nav`
  z-index: 200;
  height: ${(props) => (props.$menuOpen ? "90vh" : "7.2rem")};
  width: 94%;
  border-radius: 24px;
  padding: 0 2.4rem;
  background-color: ${styleVars.m14Navy1000};
  position: fixed;
  top: 34px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .Nav__left_group {
    display: flex;
  }

  .Nav__mchacks_logo {
    margin-right: 2.4rem;
  }

  .Nav__links {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  // TODO: better naming for this
  .Nav__hamburger_menu {
    font-size: 2.4rem;
    color: ${styleVars.m14GlowAmber300};
    stroke: ${styleVars.m14Navy1000};
    stroke-width: 30px;
  }

  .Nav__hamburger_menu_button {
    display: none;
    border: 0;
    padding: 0;
    background: transparent;
    color: ${styleVars.m14GlowAmber300};
    cursor:
      url(${HoverCursor}) 0 28,
      auto;
  }

  @media only screen and (max-width: 1100px) {
    align-items: flex-start;
    justify-content: start;
    flex-direction: column;

    .Nav__hamburger_menu_button {
      display: block;
      position: absolute;
      top: 2rem;
      right: 2.4rem;
    }

    .Nav__left_group {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    .Nav__mchacks_logo {
      display: flex;
      align-items: center;
      height: 7.2rem;
      margin-right: 0;
    }

    .Nav__links {
      display: ${(props) => (props.$menuOpen ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: 2.4rem;
      margin-top: 8rem;
    }

    .Nav__socials {
      display: ${(props) => (props.$menuOpen ? "flex" : "none")};
      justify-content: center;
      width: 100%;
      margin-top: 4rem;
    }
  }
`

export default Container
