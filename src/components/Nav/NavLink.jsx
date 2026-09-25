import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"

export const NavLink = styled.a`
  font-family: 'Afacad', sans-serif;
  font-size: 25px;
  font-weight: 500;
  display: flex;
  cursor: url(${HoverCursor}) 0 28, auto;
  color: ${styleVars.m13Red};
  text-decoration: none;
  transition: color 0.3s ease;

  &.active,
  &:focus,
  &:hover,
  &:active {
    background: transparent;
    color: ${styleVars.m13Orange};
  }

  .home-link {
    font-family: 'Afacad', sans-serif;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    cursor: url(${HoverCursor}) 0 28, auto;
    color: ${styleVars.m13Red};
    text-decoration: none;
    transition: color 0.3s ease;}
  }
`

export default NavLink
