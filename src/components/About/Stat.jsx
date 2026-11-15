import styled from "styled-components"
import * as styleVars from "../variable"

export const Stat = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transform: translate(-50%, -50%);
  width: clamp(62px, calc(38.667px + 6.4815vw), 132px);
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
  letter-spacing: -2%;

  .stat_number {
    font-size: clamp(16px, calc(10.667px + 1.4815vw), 32px);
    font-weight: 700;
  }

  .stat_label {
    font-size: clamp(12px, calc(9.333px + 0.7407vw), 20px);
    padding: 0px 1vw;
  }
`

export default Stat
