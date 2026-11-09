// Raise or lower one person on the Meet the Team platform.
// Not the most ideal way but it works...

const teamAltitudes = {
  Jimmy: -25,
  Mona: -25,
  Amy: 25,
  Doaa: -5
}

export const getAltitudeRoom = () => {
  let lift = 0
  let drop = 0

  Object.values(teamAltitudes).forEach((value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return
    if (value > lift) lift = value
    if (-value > drop) drop = -value
  })

  return { lift, drop }
}

export default teamAltitudes
