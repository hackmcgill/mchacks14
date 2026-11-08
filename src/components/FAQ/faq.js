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
 *            md    768px to 1023px
 *          Below 768px the FAQ is a static stacked list and these are unused.
 *          x is the card's left edge on the wall in vw. v is its "lane": the
 *          top edge's vertical offset in vh from the pan line. The wall pans
 *          up-left at the range's angle, and a card at (x, v) is placed at
 *          wall y = v vh + x vw * tan(angle), so on screen its top edge is
 *          always at y = v vh + tan(angle) * screenX: every card slides along
 *          its own line parallel to the pan.
 *
 *          Values come from a simulator (exact rotated card boxes with EVERY
 *          card open, the escalator's real position at each scroll step,
 *          several typical window sizes per range) that enforces: no two open
 *          cards overlap; no card gets within ~32px of the escalator's black
 *          band (cards may pass over the figures; they render above them);
 *          every card is fully on screen below the navbar at some scroll
 *          position, in reading order, with the right-hand side kept in use.
 *          Window HEIGHT is not part of the check: very short windows can
 *          still overlap. If you move a card or change a range's angle /
 *          travel, re-run that check.
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
      base: [10.2, 17.4],
      lg: [4.3, 25.6],
      md: [16.9, 23.4],
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
      base: [77.6, 0.9],
      lg: [72.9, 3.7],
      md: [93.1, -19.4],
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
      base: [46.8, 20.6],
      lg: [40.9, 22.3],
      md: [57.1, 3.6],
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
      base: [105.2, 9.1],
      lg: [88.9, 31.2],
      md: [70.6, 40.8],
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
      base: [129.3, 15.7],
      lg: [121.5, 16.8],
      md: [109.1, 19.7],
    },
    rotate: 3.5,
  },
  {
    id: "team-size",
    question: "How big can my team be?",
    answer: <>Teams can have up to 4 people.</>,
    layouts: {
      base: [147.2, 35.4],
      lg: [153.8, 14.9],
      md: [135.8, 47.9],
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
      base: [159.6, -1.2],
      lg: [191, -14.7],
      md: [146.3, 9.2],
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
      base: [178.5, 9.1],
      lg: [178.9, 25.6],
      md: [172.1, 23.9],
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
      base: [242.3, -15.7],
      lg: [251.2, -17.5],
      md: [207.3, -20.7],
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
      base: [208.8, 15],
      lg: [211, 15.5],
      md: [209.1, 17.6],
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
      base: [238.7, 20.2],
      lg: [242.1, 28.6],
      md: [244.3, 21.3],
    },
    rotate: -1,
  },
  {
    id: "does-it-cost-anything",
    question: "Does it cost anything to attend?",
    answer: <>Admission to McHacks is completely free!</>,
    layouts: {
      base: [269.2, -4.6],
      lg: [273.8, 5.8],
      md: [280.7, -7.2],
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
      base: [270.6, 15.7],
      lg: [278.4, 27.8],
      md: [281.3, 21.8],
    },
    rotate: 1,
  },
]

export default faqItems
