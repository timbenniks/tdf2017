module.exports = (groups, riders) => new Promise((resolve) => {
  const cleanedGroups = groups.data.groups.map(group => ({
    key: group.key,
    name: group.name,
    lat: group.lat,
    lon: group.lon,
    size: group.size,
    position: group.position,
    speed: group.speed,
    avgSpeed: group.avgSpeed,
    maxSpeed: group.maxSpeed,
    hasYellowJersey: group.hasYellowJersey,
    hasGreenJersey: group.hasGreenJersey,
    hasWhiteJersey: group.hasWhiteJersey,
    hasPolkaJersey: group.hasPolkaJersey,
    hasRedNumber: group.hasRedNumber,
    gapFromNextGroup: group.gapFromNextGroup,
    gapToNextGroup: group.gapToNextGroup,
    gapToPrevGroup: group.gapToPrevGroup,
    gapDiffFromNextGroup: group.gapDiffFromNextGroup,
    gapToLeadingGroup: group.gapToLeadingGroup,
    distToFinish: group.distToFinish,
    distFromStart: group.distFromStart,
    riders: group.riders.map(rider => riders.data.riders.find(r => r.id === rider.id))
  }))

  const meta = {
    speed: riders.data.speed,
    maxSpeed: riders.data.maxSpeed,
    distToFinish: riders.data.distToFinish,
    distFromStart: riders.data.distFromStart
  }

  let result

  if (!groups || groups.data === 'NO_RESPONSE' || !riders) {
    result = 'NO_RESPONSE'
  }
  else {
    result = cleanedGroups
  }

  resolve({
    meta,
    groups: result
  })
})
