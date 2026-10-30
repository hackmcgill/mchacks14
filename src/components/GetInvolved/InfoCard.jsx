import styled from "styled-components"
import * as styleVars from "../variable"

// Film-grain texture over the chalkboard, matching the design export
const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E")`

const cream = "#F9EDDF"
const orange = "#F0A04B"

export const InfoCard = styled.article`
  flex: 0 1 470px;
  min-width: 0;
  min-height: 560px;
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  background: ${grain}, #25232a;
  border: 14px solid #5d5d5d;
  border-top-color: #6e6e6e;
  border-bottom-color: #4a4a4a;
  border-radius: 10px;
  box-shadow:
    inset 0 0 0 3px #161518,
    inset 0 8px 18px rgba(0, 0, 0, 0.55),
    5px 8px 0 rgba(10, 20, 35, 0.22);
  transform: rotate(2deg);
  overflow: hidden;

  .content {
    padding: 52px 36px 24px;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0 0 30px;
    font-family: "Brown", sans-serif;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.1;
    color: ${cream};
  }

  .dot {
    flex: none;
    width: 26px;
    height: 28px;
    border-radius: 50%;
    background: ${cream};
    box-shadow: 0 0 10px 3px rgba(249, 237, 223, 0.45);
  }

  p {
    margin: 0;
    font-family: "Brown", sans-serif;
    font-size: 17px;
    line-height: 1.55;
    color: ${cream};
  }

  .cta {
    display: inline-block;
    margin-top: 20px;
    font-family: "Brown", sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: ${orange};
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: ${cream};
      text-decoration: underline;
    }
  }

  .photos {
    display: grid;
    grid-template-columns: 133fr 200fr 97fr;
    gap: 6px;
    margin-top: auto;
    border-bottom: 56px solid #1b1a1d;

    img {
      display: block;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }

    img:nth-child(2) {
      aspect-ratio: 200 / 133;
    }

    img:nth-child(3) {
      aspect-ratio: 97 / 133;
    }
  }

  @media screen and (max-width: ${styleVars.mdUp}) {
    .content {
      padding: 40px 28px 20px;
    }

    h3 {
      font-size: 30px;
      margin-bottom: 22px;
    }

    p,
    .cta {
      font-size: 16px;
    }
  }

  @media screen and (max-width: ${styleVars.smUp}) {
    flex-basis: auto;
    width: min(100%, 450px);
    min-height: 0;
    margin-top: 0;
    border-width: 10px;
    transform: rotate(1deg);

    .content {
      padding: 32px 22px 24px;
    }

    h3 {
      font-size: 26px;
      gap: 14px;
      margin-bottom: 16px;
    }

    .dot {
      width: 20px;
      height: 22px;
    }

    p,
    .cta {
      font-size: 15px;
    }

    .photos {
      border-bottom-width: 32px;
    }
  }
`

export default InfoCard
