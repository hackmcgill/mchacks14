import styled from "styled-components"
import * as styleVars from "../variable"

export const Button = styled.button`
  font-family: "Afacad", sans-serif;
  font-weight: 600;
  font-size: 25px;
  letter-spacing: -1.5px;
  text-transform: none;
  color: #463886;
  background-color: #9ab3e2;
  border-radius: 30px;
  border: none;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 4px 0 rgba(0, 0, 0, 0.25) inset,
    0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 8px 30px;
  display: block;
  margin: auto;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${styleVars.hackGold}AA;
    color: ${styleVars.hackWhite}AA;
  }

  &:hover {
    background-color: ${styleVars.hackWhite}ee;
    color: ${styleVars.hackBlack};
  }

  @media only screen and (min-width: 1077px) {
    display: flex;
    margin-left: 0;
    margin-right: 0;
    align-items: left;
  }

  @media screen and (max-width: ${styleVars.xsUp}) {
    font-size: 16px;
    margin: 0px;
    padding: 5px 16px;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.65px;
  }
`

export default Button
