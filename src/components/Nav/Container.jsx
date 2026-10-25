import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"

export const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 199;
  background: rgb(0 0 0 / 0.35);
`

export const Container = styled.nav`
  z-index: 200;
  height: 7.2rem;
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
    height: auto;
    max-height: ${(props) =>
      props.$menuOpen ? "calc(100vh - 34px)" : "7.2rem"};
    padding-bottom: ${(props) => (props.$menuOpen ? "13.5rem" : "0")};
    overflow: hidden;
    transition:
      max-height 350ms ease-in-out,
      padding-bottom 350ms ease-in-out;
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
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: 2.4rem;
      margin-top: ${(props) => (props.$menuOpen ? "8rem" : "0")};
      max-height: ${(props) => (props.$menuOpen ? "30rem" : "0")};
      opacity: ${(props) => (props.$menuOpen ? "1" : "0")};
      overflow: hidden;
      pointer-events: ${(props) => (props.$menuOpen ? "auto" : "none")};
      transition:
        max-height 350ms ease-in-out,
        margin-top 350ms ease-in-out,
        opacity 200ms ease-in-out;
    }

    .Nav__socials {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: ${(props) => (props.$menuOpen ? "4rem" : "0")};
      max-height: ${(props) => (props.$menuOpen ? "10rem" : "0")};
      opacity: ${(props) => (props.$menuOpen ? "1" : "0")};
      overflow: hidden;
      pointer-events: ${(props) => (props.$menuOpen ? "auto" : "none")};
      transition:
        max-height 350ms ease-in-out,
        margin-top 350ms ease-in-out,
        opacity 200ms ease-in-out;
    }
  }
`

export default Container
