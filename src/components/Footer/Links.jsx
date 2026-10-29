import styled from "styled-components"
import * as styleVars from "../variable"

export const Links = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  flex-shrink: 0;

  @media only screen and (max-width: ${styleVars.smUp}) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1.6rem;
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    gap: 1.2rem;
  }
`

export default Links
