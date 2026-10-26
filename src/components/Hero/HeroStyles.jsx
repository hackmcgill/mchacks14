import styled from "styled-components"
import * as styleVars from "../variable"
import HoverCursor from "../../../static/mchacks13-hover-cursor.png"


export const HeroStyles = styled.section.attrs({ className: "site-hero" })`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .hero__portal {
    width: 20%;
    margin: 120px 0px;
    transform: translateY(7%);

    @media (max-width: 1800px) {
      width: 22%;
      margin: 150px 0px;
    }

    @media (max-width: 1700px) {
      width: 20%;
      margin: 100px 0px;
    }

    @media (max-width: 1550px) {
      width: 18%;
      margin: 50px 0px;
    }

    @media (max-width: 1400px) {
      margin: 10px 0px;
    }
  }

  .hero__challenge-text {
    font-family: "Afacad", sans-serif;
    color: #d9f1ff;
    font-size: 24px;
    max-width: 840px;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    border-radius: 20px;
    padding: 24px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    margin: 0 auto -120px;
    z-index: 2;

    @media (max-width: ${styleVars.lgUp}) {
      font-size: 18px;
      padding: 15px;
      max-width: 90%;
      margin-bottom: -50px;
    }

    @media (max-width: ${styleVars.smUp}) {
      font-size: 16px;
      padding: 10px;
      margin-bottom: -20px;
    }
  }

  .invisible-apply {
    position: absolute;
    transform: translateY(50%);
    height: 420px;
    width: 250px;
    cursor: url(${HoverCursor}) 0 28, auto;
    z-index: 10;

    @media (max-width: ${styleVars.smUp}) {
      transform: translateY(60%);
      width: 50px;
      height: 90px;
    }
  }

  .hero__wrapper {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .hero__images-container {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes shine {
      0%, 100% {
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
      }
      50% {
        filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1));
      }
    }

    @keyframes floatUpDown {
      0% {
        transform: translateY(0); /* Start at original position */
      }
      50% {
        transform: translateY(-10px); /* Move up by 10 pixels */
      }
    }


    .hero__heading-image {
      width: 46vw;
      max-width: 80%;
      height: auto;
      display: block;
      margin: -215px auto 0 auto;
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
      transform: translateY(-8vh);
    }

  }

.hero__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
  width: 100%;
  padding-top: 0;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.hero__grid {
  display: flex;
  gap: 300px;
  max-width: 100%;
  justify-content: space-between;
  margin-top: -50px;
  letter-spacing: 0.5px;
  word-spacing: 5px;
  margin-bottom: 50px;

  & > div {
    font-family: "Afacad", sans-serif;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hero__heading-image {
    grid-column: 1 / span 3;
    width: 100%;
  }

  .hero__grid__shapes {
    grid-column: 1;
    grid-row: 2 / span 2;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .hero__grid__location {
    grid-column: 2;
    grid-row: 2;
  }

  .hero__grid__date {
    grid-column: 3;
    grid-row: 2;
  }

  .hero__grid__subheading {
    font-size: 35px;
    line-height: normal;
    margin: 0;
    font-weight: 400;
    text-align: center;
    color: #d9f1ff;
    letter-spacing: -1.2px;
  }
}

.hero__heading {
  display: none; /* Leave in h1 for SEO */
}

.hero__grass_image {
  width: 100%;
  margin-bottom: -10px;
}

@media screen and (max-width: ${styleVars.lgUp}) {
  .hero__wrapper {
    margin-top: 0 !important;
    padding-top: 0;
    gap: 0;
  }

  .hero__grid {
    display: flex;
    gap: 20px;
    margin-top: -60px;
    margin-bottom: 20px;
  }

  .hero__grid__subheading {
    font-size: 13px !important;
  }
}
`

export default HeroStyles
