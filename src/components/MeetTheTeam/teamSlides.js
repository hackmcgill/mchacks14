import { resolveTeamSocialUrl } from "./teamSocialLinks"

const parseMemberName = (filePath) => {
  const base = filePath.replace(/^\.\//, "").replace(/\.(webp|svg)$/i, "")
  const memberMatch = base.match(/^Member=([^,]+)/)
  if (memberMatch) return memberMatch[1].trim()
  return base
    .replace(/-Default(\s*\(\d+\))?$/i, "")
    .replace(/-Hover(\s*\(\d+\))?$/i, "")
    .trim()
}

const formatRank = (id) => {
  const lower = id.toLowerCase()
  if (lower.endsWith(".webp")) return 2
  if (lower.endsWith(".svg")) return 1
  return 0
}

const loadSlidesFromContext = (context) => {
  const byName = new Map()

  context.keys().forEach((id) => {
    const name = parseMemberName(id)
    const mod = context(id)
    const src = mod?.default ?? mod
    const existing = byName.get(name)

    if (!existing || formatRank(id) > formatRank(existing.id)) {
      byName.set(name, { id, name, src })
    }
  })

  return byName
}

const defaultContext = require.context(
  "../../assets/images/TeamDefault",
  false,
  /\.(webp|svg)$/
)

const hoverContext = require.context(
  "../../assets/images/TeamHover",
  false,
  /\.(webp|svg)$/
)

const defaults = loadSlidesFromContext(defaultContext)
const hovers = loadSlidesFromContext(hoverContext)

export default [...defaults.values()]
  .map((slide) => ({
    ...slide,
    hoverSrc: hovers.get(slide.name)?.src ?? slide.src,
    profileUrl: resolveTeamSocialUrl(slide.name),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
