import styled from "styled-components"
import * as styleVars from "../variable"
import { Link } from "gatsby"

export const PageLink = styled(Link)`
  font-family: "Instrument Sans", sans-serif;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 1px;
  word-spacing: 3px;
  color: ${styleVars.m14GlowAmber300};

  &:focus,
  &:hover {
    color: ${styleVars.m14GlowAmber200};
  }
`

export default PageLink
