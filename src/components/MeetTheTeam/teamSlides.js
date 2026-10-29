import { resolveTeamSocialUrl } from "./teamSocialLinks"

const teamOrder = [

/* 
Legend: 
 +: More than one role 
 (H): Real person (not a stick...?)
*/

//Co-Directors
  "Shirley", // (H)

//Dev
  "Jane", // Lead
  "Muhammad",
  "Jamie",
  "Mona", // (H)
  "Jongmin",

//Experience
  "Jeffrey", // Lead
  "Alex",
  "Aidan", // (H)
  "Jen",
  "Clara",
  "Arnav", // + Design

// Design
  "Amy", // Lead (H)
  "Ashley",

// Communication
  "Lyland", // Lead + Design
  "Janelle",

// Logistic
  "Qian", // Co-Lead (H)
  "Remi", // Co-Lead (H)
  "Emily", 

// Finance
  "Ikram", // Lead (H)
  "Doaa",

// Sponsorship
  "Julia", // Co-Lead
  "Jimmy", // (H)
  "Jaanya",
  "Carolyn",
  "Daniel"

]

const teamOrderIndex = new Map(teamOrder.map((name, index) => [name, index]))

const byTeamOrder = (a, b) => {
  const aIndex = teamOrderIndex.has(a.name)
    ? teamOrderIndex.get(a.name)
    : Number.POSITIVE_INFINITY
  const bIndex = teamOrderIndex.has(b.name)
    ? teamOrderIndex.get(b.name)
    : Number.POSITIVE_INFINITY
  if (aIndex !== bIndex) return aIndex - bIndex
  return a.name.localeCompare(b.name)
}

const parseMemberName = (filePath) => {
  return filePath
    .replace(/^\.\//, "")
    .replace(/\.(webp)$/i, "")
    .replace(/-Default(\s*\(\d+\))?$/i, "")
    .replace(/-Hover(\s*\(\d+\))?$/i, "")
    .trim()
}

const loadSlidesFromContext = (context) => {
  const byName = new Map()

  context.keys().forEach((id) => {
    const name = parseMemberName(id)
    if (!byName.has(name)) {
      const mod = context(id)
      const src = mod?.default ?? mod
      byName.set(name, { id, name, src })
    }
  })

  return byName
}

const defaultContext = require.context(
  "../../assets/images/TeamDefault",
  false,
  /\.(webp)$/
)

const hoverContext = require.context(
  "../../assets/images/TeamHover",
  false,
  /\.(webp)$/
)

const defaults = loadSlidesFromContext(defaultContext)
const hovers = loadSlidesFromContext(hoverContext)

export default [...defaults.values()]
  .map((slide) => ({
    ...slide,
    hoverSrc: hovers.get(slide.name)?.src ?? slide.src,
    profileUrl: resolveTeamSocialUrl(slide.name),
  }))
  .sort(byTeamOrder)
