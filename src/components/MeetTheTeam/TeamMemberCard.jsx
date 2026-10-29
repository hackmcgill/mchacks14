import React, { memo, useState } from "react"
import styled from "styled-components"

export const CARD_WIDTH = "clamp(105px, 8.5vw, 155px)"
export const CARD_HEIGHT = "min(36vh, 280px)"

const memberShellStyles = `
  flex: 0 0 auto;
  position: relative;
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  display: block;
  text-decoration: none;
  color: inherit;
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

const TeamMemberCard = memo(({ name, src, hoverSrc, profileUrl, eagerLoad }) => {
  const [hovered, setHovered] = useState(false)
  const [hoverReady, setHoverReady] = useState(false)

  const onEnter = () => {
    if (!hoverReady && hoverSrc !== src) setHoverReady(true)
    setHovered(true)
  }
  const onLeave = () => setHovered(false)

  const handleProfileClick = (event) => {
    if (!profileUrl) return
    openProfile(event, profileUrl)
    setHovered(false)
  }

  const image = (
    <MemberImg
      src={hovered && hoverReady ? hoverSrc : src}
      alt={name}
      loading={eagerLoad ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  )

  if (profileUrl) {
    const network = profileNetworkLabel(profileUrl)
    return (
      <MemberLink
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on ${network}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleProfileClick}
      >
        {image}
      </MemberLink>
    )
  }

  return (
    <MemberWrap onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {image}
    </MemberWrap>
  )
})

export default TeamMemberCard
