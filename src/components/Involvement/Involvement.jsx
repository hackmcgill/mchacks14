import React from "react"
import Container from "./Container"
import QuestionGroup from "./QuestionGroup"
import Question from "./Question"
import WindowStyles from "./WindowStyles"
import Button from "./Button"
import mushroom from "../../assets/images/designs/mchacks13-mushroom.png"

const applyMentorJudge = () => {
  window.location =
    "https://docs.google.com/forms/d/e/1FAIpQLSeBDT2TCbXlj47mLSM6HCzDLgQe6ZD1cYwvjv6m4-8GbL8XWA/viewform"
}

const applyVolunteer = () => {
  window.location =
    "https://docs.google.com/forms/d/e/1FAIpQLScV7bk5yhAMqyI25r6ubHDoz5hlbG5UKZR9cf5NKgW2upCz4Q/viewform"
}

const Involvement = ({ scrollRef }) => (
  <Container ref={scrollRef}>
    <img className="mchacks13-mushroom" src={mushroom} alt="Mushroom" />
    <WindowStyles>
      <div className="content">
        <h2>Other ways to get involved</h2>
        <div className="questions">
          <QuestionGroup>
            <Question question="Become a Judge">
              Help us celebrate innovation! Judges review projects, meet
              brilliant student teams, and decide which hacks shine the
              brightest. You’ll get a front-row seat to creativity in action,
              and help recognize the ideas that push boundaries!
              <Button disabled={false} onClick={applyMentorJudge}>
                Become a Judge
              </Button>
            </Question>
            <Question question="Become a Mentor">
              Every great hacker needs a guide. Mentors guide hackers through
              technical challenges, brainstorm solutions, and inspire teams to
              come up with their next Big Idea. Whether you’re a developer,
              designer, or entrepreneur, your insight makes a huge impact.
              <Button disabled={false} onClick={applyMentorJudge}>
                Become a Mentor
              </Button>
            </Question>
            <Question question="Volunteer with Us">
              Help keep the magic alive behind the scenes! Volunteers support
              logistics, registration, workshops, and more – keeping the event
              running smoothly. It’s a fun, fast-paced weekend full of
              collaboration, energy, and community spirit.
              <Button disabled={false} onClick={applyVolunteer}>
                Become a Volunteer
              </Button>
            </Question>
          </QuestionGroup>
        </div>
      </div>
    </WindowStyles>
  </Container>
)

export default Involvement
