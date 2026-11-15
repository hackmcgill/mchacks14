import React from "react"

/**
 * FAQ content + where each card sits on the wall.
 *
 * Array order = importance order = reading / Tab order. It follows the design
 * mock (faq.png): columns left to right, top to bottom within a column.
 *
 * layouts – where the card sits on the wall, one [x, v] pair per width range
 *          (the ranges, and each range's pan angle / travel / escalator size,
 *          live in WALL_RANGES in components/FAQ/faqScene.config.js; the
 *          boundaries come from components/variable.jsx):
 *            base  1440px and wider
 *            lg    1024px to 1439px
 *          Below 1024px the FAQ is a static list (no escalator) and these are
 *          unused.
 *          x is the card's left edge on the wall in vw. v is its "lane": the
 *          top edge's vertical offset in vh from the pan line. The pan has
 *          three legs (see faqScene.config.js): diagonal, horizontal while the
 *          escalator leaves, then vertical. A card at (x, v) is placed at wall
 *          y = v vh + min(x, knee) vw * tan(angle), so while the wall pans
 *          diagonally every card slides along its own line parallel to the
 *          pan, and past the knee v is a plain vertical offset (cards for the
 *          vertical leg use large v, stacked below one another).
 *
 *          Values come from a simulator (exact rotated card boxes with EVERY
 *          card open, the escalator's real position at each scroll step,
 *          several typical window sizes per range) that enforces: no two open
 *          cards overlap; no card touches the escalator at all (it is drawn
 *          above the cards) and none gets within ~32px of its black band; every
 *          card is fully on screen below the navbar at some scroll position;
 *          the last two cards are still on screen when the pin ends; cards are
 *          spread evenly over the scroll. Window HEIGHT is only sampled at a few
 *          typical sizes. If you move a card or change a range's geometry,
 *          re-run that check.
 * rotate – small tilt in degrees (-4 … 4).
 */
const faqItems = [
  {
    id: "what-is-a-hackathon",
    question: "What is a hackathon?",
    answer: (
      <>
        A hackathon is an event where people come together to turn ideas into
        projects. At McHacks, you'll have 24 hours to collaborate with other
        students, experiment with new technologies, and build something of your
        own. Along the way, you can attend workshops, get feedback from mentors,
        meet our sponsors, and learn something new — no matter your experience
        level.
      </>
    ),
    layouts: {
      base: [5.3, 14.6],
      lg: [5.4, 17.4],
    },
    rotate: -2.5,
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer: (
      <>
        Any high school, college/CEGEP and university students can join! Whether
        you’re a beginner or a pro, designer or a developer, from Montreal or
        New York, McHacks welcomes hackers of all kinds.
      </>
    ),
    layouts: {
      base: [76.6, -8.5],
      lg: [81.5, -19.3],
    },
    rotate: -1.5,
  },
  {
    id: "what-skills",
    question: "What skills do I need to participate?",
    answer: (
      <>
        None in particular! Whether you're writing your first line of code,
        designing a prototype, or exploring machine learning, there's room to
        learn and experiment. You can also contribute through design,
        brainstorming, project planning, and other skills beyond coding.
      </>
    ),
    layouts: {
      base: [44.2, 5.0],
      lg: [45.4, 4.3],
    },
    rotate: 1.5,
  },
  {
    id: "how-can-i-participate",
    question: "How can I participate in McHacks?",
    answer: (
      <>
        Applications will open soon! In the meantime, fill out our interest form
        to stay updated on applications and event announcements.
      </>
    ),
    layouts: {
      base: [114.4, -24.2],
      lg: [77.4, 20.5],
    },
    rotate: 0.5,
  },
  {
    id: "do-i-need-a-team",
    question: "Do I need a team?",
    answer: (
      <>
        Not at all! You can work on a project individually, but collaborating
        with others is encouraged. If you're looking for teammates, try asking
        friends, connecting with other hackers in our Discord server, or joining
        our team formation session at the start of the event.
      </>
    ),
    layouts: {
      base: [121.2, -0.3],
      lg: [118.7, -21.5],
    },
    rotate: 3.5,
  },
  {
    id: "team-size",
    question: "How big can my team be?",
    answer: <>Teams can have up to 4 people.</>,
    layouts: {
      base: [186.3, 46.8],
      lg: [115.6, 26.5],
    },
    rotate: 2,
  },
  {
    id: "when-and-where",
    question: "When and where is McHacks?",
    answer: (
      <>
        McHacks 14 will take place on <strong>January 16-17, 2027</strong>{" "}
        in-person at McGill University’s downtown campus in Montreal, QC.
      </>
    ),
    layouts: {
      base: [150.2, 12.1],
      lg: [150.1, -19.7],
    },
    rotate: 0,
  },
  {
    id: "never-been-to-a-hackathon",
    question: "What if I've never been to a hackathon before?",
    answer: (
      <>
        Don't even worry! McHacks is a great place to try your first hackathon.
        You'll have access to workshops, mentors, and other participants who can
        help you get started. You don't need to arrive with a fully formed idea
        or a finished project — just bring your curiosity and willingness to
        learn!
      </>
    ),
    layouts: {
      base: [184.8, -3.4],
      lg: [164.1, 8.8],
    },
    rotate: 0.5,
  },
  {
    id: "travel-reimbursements",
    question: "Will you be offering travel reimbursements?",
    answer: (
      <>
        Unfortunately, at this time we are not able to provide travel
        reimbursements, however we will have sleeping areas available at the
        venue itself so you don't need to pay for lodging.
      </>
    ),
    layouts: {
      base: [191.5, 147.6],
      lg: [151.8, 61.4],
    },
    rotate: -2,
  },
  {
    id: "is-the-food-good",
    question: "Okay, but is the food actually good?",
    answer: (
      <>
        Heck, yeah! We take our food seriously — nobody wants to survive a
        24-hour hackathon on mediocre food… Past McHackers have enjoyed Spice
        Bros, Boustan shawarma, CoCo bubble tea, and plenty of drinks from
        Gutsy, Celsius, Red Bull, Poppy, and more to keep everyone fueled
        throughout the weekend. We make sure the food and drinks are worth
        looking forward to, too :pp
      </>
    ),
    layouts: {
      base: [140.2, 102.6],
      lg: [196.9, -3.8],
    },
    rotate: 1.5,
  },
  {
    id: "workshops-and-activities",
    question: "What workshops and activities will there be?",
    answer: (
      <>
        McHacks will feature workshops, mentorship opportunities, and activities
        throughout the event to help you learn new skills and develop your
        project. We'll share more details about the schedule closer to the
        event.
      </>
    ),
    layouts: {
      base: [144.5, 159.3],
      lg: [199.1, 57.4],
    },
    rotate: -1,
  },
  {
    id: "does-it-cost-anything",
    question: "Does it cost anything to attend?",
    answer: <>Admission to McHacks is completely free!</>,
    layouts: {
      base: [177.6, 258.2],
      lg: [155.3, 103.3],
    },
    rotate: -0.5,
  },
  {
    id: "more-questions",
    question: "I have more questions!",
    answer: (
      <>
        We have answers! Feel free to send us a DM on Facebook, Instagram, or
        Twitter, or email us at{" "}
        <a href="mailto:contact@mchacks.ca">contact@mchacks.ca</a> if you have
        any questions or concerns.
      </>
    ),
    layouts: {
      base: [135.1, 258.6],
      lg: [195.8, 116.7],
    },
    rotate: 1,
  },
]

export default faqItems
