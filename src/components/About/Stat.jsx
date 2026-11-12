import styled from "styled-components"
import * as styleVars from "../variable"

export const Stat = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 8vw;
  aspect-ratio: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${styleVars.m14Beige};
  color: ${styleVars.m14Dark};

  font-family: "Schibsted Grotesk";
  text-align: center;
  line-height: 0.99;
  letter-spacing: -1px;

  .stat_number {
    font-size: 34px;
    font-weight: 700;
  }

  .stat_label {
    font-size: 20px;
    padding: 0px 1vw;
  }

  @media only screen and (max-width: ${styleVars.lgUp}) {
    width: 10vw;
    transform: translate(-10%, -10%);

    .stat_number {
      font-size: 28px;
    }

    .stat_label {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: ${styleVars.mdUp}) {
    width: 10vw;
    transform: translate(-15%, -15%);
    letter-spacing: -0.5px;

    .stat_number {
      font-size: 22px;
    }

    .stat_label {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: ${styleVars.smUp}) {
    transform: translate(-15%, -15%);

    .stat_number {
      font-size: 16px;
    }

    .stat_label {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: ${styleVars.xsUp}) {
    width: 12vw;
    transform: translate(-15%, -15%);

    .stat_number {
      font-size: 14px;
    }

    .stat_label {
      font-size: 10px;
    }
  }
`

export default Stat
