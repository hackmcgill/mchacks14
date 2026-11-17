import styled from "styled-components"
import * as styleVars from "../variable"

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  .icon {
    color: ${styleVars.m14GlowAmber300};
    transition: stroke 0.3s ease;

    &.active,
    &:focus,
    &:hover,
    &:active {
      color: ${styleVars.m14GlowAmber200};
    }
  }
`

export default Container
