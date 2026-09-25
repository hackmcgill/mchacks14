import styled from "styled-components"
import * as styleVars from "../variable"

export const Button = styled.button`
  font-family: "Afacad", sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  color: #463886;
  background-color: #9ab3e2;
  border-radius: 30px;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 4px 0 rgba(0, 0, 0, 0.25) inset,
    0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 4px 20px;
  display: block;
  margin: 16px 0 auto;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${styleVars.hackGold}AA;
    color: ${styleVars.hackWhite}AA;
  }

  &:hover {
    background-color: #463886;
    color: ${styleVars.hackWhite};
  }


  @media screen and (max-width: ${styleVars.xsUp}) {
    margin: 16px auto 8px;
    padding: 5px 16px;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.65px;
  }
`

export default Button
