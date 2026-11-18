import React, { useState } from "react"
import Container from "./Container"
import Board from "./Board"
import InfoCard from "./InfoCard"
// The board export with its station names painted out; the names are drawn
// on top from masks so they can change colour with the selected role
import BoardImage from "../../assets/images/get-involved/board/get-involved-board-clean.png"
import MentorLabel from "../../assets/images/get-involved/board/label-mentor.png"
import JudgeLabel from "../../assets/images/get-involved/board/label-judge.png"
import VolunteerLabel from "../../assets/images/get-involved/board/label-volunteer.png"

const MENTOR_JUDGE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBDT2TCbXlj47mLSM6HCzDLgQe6ZD1cYwvjv6m4-8GbL8XWA/viewform"
const VOLUNTEER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScV7bk5yhAMqyI25r6ubHDoz5hlbG5UKZR9cf5NKgW2upCz4Q/viewform"

// Loop length scales with the number of photos so the strip moves at the
// same speed no matter how many are in a folder
const SECONDS_PER_PHOTO = 5

// Every image in a role's folder is picked up automatically
const loadPhotos = (context) => [
  ...new Set(
    context
      .keys()
      .sort()
      .map((id) => {
        const mod = context(id)
        return mod?.default ?? mod
      })
  ),
]

const mentorPhotos = loadPhotos(
  require.context(
    "../../assets/images/get-involved/mentor-pics",
    false,
    /\.(png|jpe?g|webp)$/
  )
)
const judgePhotos = loadPhotos(
  require.context(
    "../../assets/images/get-involved/judge-pics",
    false,
    /\.(png|jpe?g|webp)$/
  )
)
const volunteerPhotos = loadPhotos(
  require.context(
    "../../assets/images/get-involved/volunteer-pics",
    false,
    /\.(png|jpe?g|webp)$/
  )
)

// hotspot (label + station), station centre and label box are percentages
// of the 461x574 board export, so they scale with the image
const roles = [
  {
    id: "mentor",
    photos: mentorPhotos,
    title: "Mentor",
    cta: "Become a Mentor",
    form: MENTOR_JUDGE_FORM,
    hotspot: { left: 17, top: 36.5, width: 23, height: 9 },
    station: { x: 36.89, y: 39.34 },
    label: {
      mask: MentorLabel,
      left: 18.66,
      top: 40.24,
      width: 13.88,
      height: 3.66,
    },
    description:
      "Every great hacker needs a guide. Mentors guide hackers through technical challenges, brainstorm solutions, and inspire teams to come up with their next Big Idea. Whether you’re a developer, designer, or entrepreneur, your insight makes a huge impact.",
  },
  {
    id: "judge",
    photos: judgePhotos,
    title: "Judge",
    cta: "Become a Judge",
    form: MENTOR_JUDGE_FORM,
    hotspot: { left: 54, top: 41, width: 22, height: 8 },
    station: { x: 57.82, y: 45.52 },
    label: {
      mask: JudgeLabel,
      left: 63.34,
      top: 41.99,
      width: 11.28,
      height: 3.83,
    },
    description:
      "Help us celebrate innovation! Judges review projects, meet brilliant student teams, and decide which hacks shine the brightest. You’ll get a front-row seat to creativity in action, and help recognize the ideas that push boundaries!",
  },
  {
    id: "volunteer",
    photos: volunteerPhotos,
    title: "Volunteer",
    cta: "Become a Volunteer",
    form: VOLUNTEER_FORM,
    hotspot: { left: 59, top: 68, width: 27, height: 9 },
    station: { x: 62.27, y: 74.01 },
    label: {
      mask: VolunteerLabel,
      left: 68.55,
      top: 69.34,
      width: 17.57,
      height: 3.83,
    },
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
          <span
            key={`${role.id}-label`}
            className={`label${role.id === activeId ? " is-active" : ""}`}
            aria-hidden="true"
            style={{
              "--mask": `url("${role.label.mask}")`,
              left: `${role.label.left}%`,
              top: `${role.label.top}%`,
              width: `${role.label.width}%`,
              height: `${role.label.height}%`,
            }}
          />
        ))}
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
        {roles.map((role) => (
          <span
            key={`${role.id}-glow`}
            className={`glow${role.id === activeId ? " is-active" : ""}`}
            aria-hidden="true"
            style={{ left: `${role.station.x}%`, top: `${role.station.y}%` }}
          />
        ))}
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
          <div
            className="photo-window"
            role="img"
            aria-label={`Photos of ${active.title.toLowerCase()}s at past McHacks events`}
          >
            {/* Two copies of the set so the strip can loop without a gap;
                keyed by role so switching restarts it from the first photo */}
            <div
              key={active.id}
              className="photo-track"
              style={{
                animationDuration: `${active.photos.length * SECONDS_PER_PHOTO}s`,
              }}
            >
              {[...active.photos, ...active.photos].map((src, i) => (
                <img key={i} src={src} alt="" />
              ))}
            </div>
          </div>
        </div>
      </InfoCard>
    </Container>
  )
}

export default GetInvolved
