import styled from "styled-components"
import * as styleVars from "../variable"

export const Stat = styled.div`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: clamp(75px, 11vw, 110px);
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
    font-size: clamp(36px, 2.5vw, 28px);
    font-weight: 700;
  }

  .stat_label {
    font-size: clamp(20px, 1.2vw, 14px);
    padding: 0px 1vw;
  }
`;

export default Stat