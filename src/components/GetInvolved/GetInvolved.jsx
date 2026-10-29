import React, { useState } from "react"
import Container from "./Container"
import Board from "./Board"
import InfoCard from "./InfoCard"
import BoardImage from "../../../static/GetInvolvedDesign/get-involved-board.png"
import PianoPhoto from "../../../static/GetInvolvedDesign/DSCF0483 1.png"
import CrowdPhoto from "../../../static/GetInvolvedDesign/DSCF0445 1.png"
import DemoPhoto from "../../../static/GetInvolvedDesign/DSCF0459 1.png"

const MENTOR_JUDGE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBDT2TCbXlj47mLSM6HCzDLgQe6ZD1cYwvjv6m4-8GbL8XWA/viewform"
const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScV7bk5yhAMqyI25r6ubHDoz5hlbG5UKZR9cf5NKgW2upCz4Q/viewform"

// hotspot (label + station) and station centre are percentages of the
// 461x574 board export, so they scale with the image
const roles = [
  {
    id: "mentor",
    title: "Mentor",
    cta: "Become a Mentor",
    form: MENTOR_JUDGE_FORM,
    hotspot: { left: 17, top: 36.5, width: 23, height: 9 },
    station: { x: 36.9, y: 39.4 },
    description:
      "Every great hacker needs a guide. Mentors guide hackers through technical challenges, brainstorm solutions, and inspire teams to come up with their next Big Idea. Whether you’re a developer, designer, or entrepreneur, your insight makes a huge impact.",
  },
  {
    id: "judge",
    title: "Judge",
    cta: "Become a Judge",
    form: MENTOR_JUDGE_FORM,
    hotspot: { left: 54, top: 41, width: 22, height: 8 },
    station: { x: 57.7, y: 45.8 },
    description:
      "Help us celebrate innovation! Judges review projects, meet brilliant student teams, and decide which hacks shine the brightest. You’ll get a front-row seat to creativity in action, and help recognize the ideas that push boundaries!",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    cta: "Become a Volunteer",
    form: VOLUNTEER_FORM,
    hotspot: { left: 59, top: 68, width: 27, height: 9 },
    station: { x: 62.3, y: 74.2 },
    description:
      "Help keep the magic alive behind the scenes! Volunteers support logistics, registration, workshops, and more – keeping the event running smoothly. It’s a fun, fast-paced weekend full of collaboration, energy, and community spirit.",
  },
]

const GetInvolved = ({ scrollRef }) => {
  const [activeId, setActiveId] = useState("judge")
  const active = roles.find((role) => role.id === activeId)

  return (
    <Container ref={scrollRef} aria-labelledby="get-involved-title">
      <h2 id="get-involved-title" className="visually-hidden">
        Get Involved
      </h2>

      <Board>
        <img
          className="board-image"
          src={BoardImage}
          alt="Transit map with three lines meeting at the Mentor, Judge, and Volunteer stations"
        />
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            className="station"
            aria-label={role.title}
            aria-pressed={role.id === activeId}
            aria-controls="get-involved-details"
            onClick={() => setActiveId(role.id)}
            style={{
              left: `${role.hotspot.left}%`,
              top: `${role.hotspot.top}%`,
              width: `${role.hotspot.width}%`,
              height: `${role.hotspot.height}%`,
            }}
          />
        ))}
        <span
          className="glow"
          aria-hidden="true"
          style={{ left: `${active.station.x}%`, top: `${active.station.y}%` }}
        />
      </Board>

      <InfoCard id="get-involved-details" aria-live="polite">
        <div className="content">
          <h3>
            <span className="dot" aria-hidden="true" />
            {active.title}
          </h3>
          <p>{active.description}</p>
          <a
            className="cta"
            href={active.form}
            target="_blank"
            rel="noopener noreferrer"
          >
            {active.cta} →
          </a>
        </div>
        <div className="photos">
          <img src={PianoPhoto} alt="Hacker playing a keyboard project" />
          <img src={CrowdPhoto} alt="Students gathered around a project demo" />
          <img src={DemoPhoto} alt="Hackers presenting at their table" />
        </div>
      </InfoCard>
    </Container>
  )
}

export default GetInvolved
