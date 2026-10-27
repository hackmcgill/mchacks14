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
  max-width: 2550px;
  border-radius: 24px;
  padding: 0 2.4rem;
  background-color: ${styleVars.m14Navy1000};
  position: fixed;
  top: 34px;
  left: 40px;
  right: 40px;
  margin: 0 auto;
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

  .Nav__mlh_banner {
    position: fixed;
    top: 0;
    right: 25px;
    width: 90px;
    transition: opacity 0.15s ease-in-out;
    opacity: ${(props) => (props.$scrolled ? "0" : "1")};
    pointer-events: ${(props) => (props.$scrolled ? "none" : "")};
    z-index: 1000;

    img {
      filter: drop-shadow(2px 4px 2px rgb(0 0 0 / 0.15));
      width: 10rem;
    }
  }

  .Nav__socials {
    margin-right: ${(props) => (props.$scrolled ? "0" : "65px")};
    transition: margin-right 0.25s ease-in-out;
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    right: 20px;
    left: 20px;
  }

  @media only screen and (max-width: 1150px) {
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
      margin-right: 0;
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

    .Nav__mlh_banner {
      display: none;
    }
  }
`

export default Container
