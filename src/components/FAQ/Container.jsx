import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"



const Container = styled.section`
  position: relative;
  margin-top: 360px;
  padding-right: 400px;
  height: 1200px;

  .QuestionBox {
    padding: 14px 24px;
    border-radius: 24px;
    text-align: left;
    font-size: 1em;
    cursor: url(${HoverCursor}) 0 28, auto;
    transition: background 0.5s ease;
    margin-bottom: 29px;
    box-sizing: border-box;
    background-color: white;

    .questionRow {
      display: flex;
      position: relative;
      justify-content: space-between;

      .question {
        color: ${styleVars.hackBlack80};
      }

      .expandButton {
        position: absolute;
        right: 0;
      }

      .expandButton > img {
        opacity: 90%;
        position: relative;
        top: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
    }

    .answer {
      font-family: "Afacad";
      color: ${styleVars.m12DarkestGrey};
      margin-top: 10px;
      font-size: 0.9em;
      display: none;
    }

    &.expanded {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      align-self: stretch;

      .answer {
        display: block;
      }

      .expandButton > img {
        transform: rotate(-180deg);
      }

      .question {
        color: ${styleVars.m12DarkestTeal};
      }
    }
  }

  &.hidden {
    display: none !important;
  }

  @media screen and (max-width: ${styleVars.lgUp}) {
    margin-top: 120px;
    padding-right: 0;
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    margin-top: 20px;
    padding-right: 0;
    height: 650px;
    
    .QuestionBox {
      padding: 6px 24px;
      margin-bottom: 10px;
    }
  }
`

export default Container
