import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import * as styleVars from "../variable"

const MOBILE_QUERY = `(max-width: ${styleVars.smUp}), (pointer: coarse)`

const useHoverLocked = () => {
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setLocked(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return locked
}

export const CARD_WIDTH = "clamp(155px, 10vw, 155px)"
export const CARD_HEIGHT = "300px"

const memberShellStyles = `
  flex: 0 0 auto;
  position: relative;
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  display: block;
  text-decoration: none;
  color: inherit;
  transform: translate3d(0, calc(var(--member-altitude, 0) * -1px), 0);
`

export const MemberWrap = styled.div`
  ${memberShellStyles}
`

export const MemberLink = styled.a`
  ${memberShellStyles}
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  z-index: 1;
`

export const MemberImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  pointer-events: none;
  user-select: none;
`

const openProfile = (event, profileUrl) => {
  event.preventDefault()
  event.stopPropagation()
  window.open(profileUrl, "_blank", "noopener,noreferrer")
}

const profileNetworkLabel = (profileUrl) => {
  if (/instagram\.com/i.test(profileUrl)) return "Instagram"
  if (/linkedin\.com/i.test(profileUrl)) return "LinkedIn"
  return "profile"
}

const TeamMemberCard = memo(({ name, src, hoverSrc, profileUrl, altitude = 0 }) => {
  const hoverLocked = useHoverLocked()
  const [hovered, setHovered] = useState(false)
  const [hoverReady, setHoverReady] = useState(false)
  const showHover = hoverLocked || (hovered && hoverReady)

  const onEnter = () => {
    if (hoverLocked) return
    if (!hoverReady && hoverSrc !== src) setHoverReady(true)
    setHovered(true)
  }
  const onLeave = () => {
    if (!hoverLocked) setHovered(false)
  }

  const handleProfileClick = (event) => {
    if (!profileUrl) return
    openProfile(event, profileUrl)
    if (!hoverLocked) setHovered(false)
  }

  const image = (
    <MemberImg
      src={showHover ? hoverSrc : src}
      alt={name}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )

  const altitudeStyle = { "--member-altitude": altitude }

  if (profileUrl) {
    const network = profileNetworkLabel(profileUrl)
    return (
      <MemberLink
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on ${network}`}
        style={altitudeStyle}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleProfileClick}
      >
        {image}
      </MemberLink>
    )
  }

  return (
    <MemberWrap style={altitudeStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {image}
    </MemberWrap>
  )
})

export default TeamMemberCard
