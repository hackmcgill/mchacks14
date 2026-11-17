import * as styleVars from "../variable"

export const MobileMenu = {
  bmBurgerButton: {
    position: "fixed",
    width: "30px",
    height: "25px",
    top: "58px",
    right: "calc(3% + 24px)",
  },
  bmBurgerBars: {
    background: styleVars.m13Red,
    borderRadius: "30px",
    height: "3.5px",
  },
  bmBurgerBarsHover: {
    background: styleVars.darkYellow,
  },
  bmCrossButton: {
    height: "30px",
    width: "30px",
    top: "22px",
    right: "30px",
    outline: "none",
  },
  bmCross: {
    background: styleVars.m13Red,
    height: "5px",
    width: "30px",
    top: "5px",
    left: "-15px",
    borderRadius: "5px",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0",
    width: "min(100vw, 360px)",
  },
  bmMenu: {
    background: styleVars.m14Navy1000,
    padding: "2.5em 1.5em 0",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: styleVars.yellow,
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginTop: "60px",
  },
  bmItem: {
    lineHeight: "1.5",
    fontSize: "24px",
    padding: "0",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
}

export default MobileMenu
