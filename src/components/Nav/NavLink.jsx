import styled from "styled-components"
import * as styleVars from "../variable"

export const NavLink = styled.a`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  width: fit-content;
  cursor: pointer;
  color: ${styleVars.m14GlowAmber300};
  text-decoration: none;
  transition: color 0.3s ease;

  &.active,
  &:focus,
  &:hover,
  &:active {
    color: ${styleVars.m14GlowAmber200};
  }

  .home-link {
    font-family: 'Afacad', sans-serif;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    cursor: pointer;
    color: ${styleVars.m13Red};
    text-decoration: none;
    transition: color 0.3s ease;}
  }
`

export default NavLink
