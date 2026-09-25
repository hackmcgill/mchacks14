import styled from "styled-components"
import * as styleVars from "../variable"


export const Container = styled.div`
  display: flex;

  .SocialMediaBar__icon {
    margin-left: 14px;
    margin-left: calc(0.4vw + 5px); // NEW

    &:hover .icon {
      color: ${styleVars.m13Orange};
    }

    > a {
      display: flex;
      padding: 5px;
    }
  }

  .icon {
    color: ${styleVars.m13Red};
    transition: color 0.3s ease;
  }
`

export default Container
