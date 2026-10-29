import React, { useCallback, useRef } from "react"
import Container from "./Container"
import TeamMarquee from "./TeamMarquee"

const MeetTheTeam = ({ scrollRef }) => {
  const sectionRef = useRef(null)

  const setSectionRef = useCallback(
    (node) => {
      sectionRef.current = node
      if (typeof scrollRef === "function") scrollRef(node)
      else if (scrollRef) scrollRef.current = node
    },
    [scrollRef]
  )

  return (
    <Container ref={setSectionRef}>
      <TeamMarquee active backgroundRef={sectionRef} />
    </Container>
  )
}

export default MeetTheTeam
