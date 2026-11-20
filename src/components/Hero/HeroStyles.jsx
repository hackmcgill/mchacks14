import styled from "styled-components"

import HeroBgNoLamp from "../../assets/images/designs/mchacks14-bg-no-lamp.webp"
import HeroLamp from "../../assets/images/designs/mchacks14-lamp.webp"
import HeroLampMobile from "../../assets/images/designs/mchacks14-lamp-mobile.webp"
import HeroBgMobile from "../../assets/images/designs/mchacks14-bg-mobile.webp"
/*
  Hero "parallax zoom" stage.

  The section is a tall scroll "stage". Inside it a sticky viewport stays pinned
  while the page scrolls past it. A small scroll handler (see Hero.jsx) writes
  three custom properties that this stylesheet reacts to:

    --hero-zoom   scene scale              (1 -> ~8, zooming into the metro doors)
    --hero-lamp   foreground lamp scale    (scales faster than the scene = parallax)
    --hero-fade   hero content opacity     (1 -> 0 as we dive in)
    --hero-veil   vignette "hole" radius   (vmax; large = open, 0 = full black)

  When the effect is disabled (reduced motion, touch / small screens, or no JS)
  the stage collapses to a normal 100vh hero and every custom property sits at
  its rest value, so the scene renders exactly as a static hero.
*/

export const HeroStyles = styled.section.attrs({ className: "hero-stage" })`
  --hero-x: 0.88;
  --hero-zoom: 1;
  --hero-lamp: 1;
  --hero-fade: 1;
  --hero-veil: 70; /* vmax: >~55 is fully open, 0 is fully black */

  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #121947;

  /* Animated (desktop + motion allowed): become a tall scroll stage. */
  &[data-anim="on"] {
    height: var(--hero-stage-height, 260vh);
  }

  .hero-sticky {
    position: relative;
    top: 0;
    width: 100%;
    height: 100vh;
    min-height: max(100vh, 800px);
    overflow: hidden;
    container-type: size;
    background-color: #121947;
  }

  &[data-anim="on"] .hero-sticky {
    position: sticky;
    min-height: 100vh;
  }

  .hero-layer {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: calc(var(--hero-x) * 100%) center;
  }

  /* Only promote layers to the GPU while the effect is actually running */
  &[data-anim="on"] .hero-layer {
    will-change: transform;
    backface-visibility: hidden;
  }

  &[data-anim="on"] .hero-content {
    will-change: transform, opacity;
  }

  .hero-scene {
    background-image: url(${HeroBgNoLamp});
    transform: scale(var(--hero-zoom));
    transform-origin: var(--hero-focus-x, 10%) var(--hero-focus-y, 90%);
  }

  .hero-lamp {
    background-image: url(${HeroLamp});
    transform: scale(var(--hero-lamp));
    transform-origin: var(--hero-focus-x, 10%) var(--hero-focus-y, 90%);

    @media (max-width: 460px) {
      background-image: url(${HeroLampMobile});
    }
  }

  /* Fixed full-screen vignette used for the fade-to-black / iris-open hand-off
     to the next section. Transparent (and inert) except during the transition. */
  .hero-veil {
    position: fixed;
    inset: 0;
    z-index: 1400;
    pointer-events: none;
    background: radial-gradient(
      circle at 50% 52%,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) calc(var(--hero-veil) * 1vmax - 7vmax),
      #000 calc(var(--hero-veil) * 1vmax)
    );
  }

  /* No veil needed when the effect is off. */
  &[data-anim="off"] .hero-veil {
    display: none;
  }

  /* On small screens the mobile artwork already contains the lamp. */
  @media screen and (max-width: 460px) {
    .hero-scene {
      background-image: url(${HeroBgMobile});
    }
    .hero-lamp {
      display: none;
    }
  }

  .hero__hit-frame {
    position: absolute;
    top: 50%;
    width: max(100cqw, calc(100cqh * 5760 / 3648));
    aspect-ratio: 5760 / 3648;
    left: calc((100cqw - max(100cqw, 100cqh * 5760 / 3648)) * var(--hero-x));
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 100;
    opacity: var(--hero-fade);
  }

  .invisible-apply {
    position: absolute;
    left: 79.31%;
    top: 22.37%;
    width: 9.93%;
    height: 18.97%;
    padding: 0;
    border: none;
    background: transparent;
    pointer-events: auto;
    cursor: pointer;
  }

  .hero-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    opacity: var(--hero-fade);
    transform: scale(calc(1 + (var(--hero-zoom) - 1) * 0.35));
    transform-origin: var(--hero-focus-x, 22%) var(--hero-focus-y, 80%);
  }

  .hero__images-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero__heading {
    display: none; /* Leave in h1 for SEO */
  }

  @media screen and (max-width: 460px) {
    .hero__hit-frame {
      width: max(100cqw, calc(100cqh * 1560 / 3376));
      aspect-ratio: 1560 / 3376;
      left: calc((100cqw - max(100cqw, 100cqh * 1560 / 3376)) * var(--hero-x));
    }

    .invisible-apply {
      left: 48.27%;
      top: 34.51%;
      width: 36.79%;
      height: 21.27%;
    }
  }
`

export default HeroStyles
