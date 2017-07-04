const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const cleanCheckPoints = checkPoints => checkPoints.map(point => ({
    id: point.CheckPointId,
    ridersPassed: point.NumberOfRidersPassed,
    distFromStart: point.DistanceFromStart,
    distToFinish: point.DistanceToFinish,
    name: point.CheckpointName,
    type: point.CheckpointType
  }))

  const cleanRiderInfo = riders => riders.map(rider => ({
    scheduledStartTime: rider.ScheduledStartTime,
    actualStartTime: rider.ActualStartTime,
    localTime: rider.LocalTime,
    timeFromStart: rider.TimeFromStart,
    gapFromBestRider: rider.GapFromBestRider,
    position: rider.Position,
    checkpointId: rider.CheckPointId,
    status: rider.ClassificationStatus,
    rider: peloton.data.find(r => r.id === rider.RiderBibNumber)
  }))

  const url = getUrl('trial', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'trial'
  }

  callApi(url)
    .then(response => {
      resolve({
        meta,
        data: {
          checkPoints: cleanCheckPoints(response.CheckPoints),
          ridersToStart: cleanRiderInfo(response.RidersStillToStart),
          ridersStarted: cleanRiderInfo(response.RidersStarted),
          ridersCompleted: cleanRiderInfo(response.RidersCompleted),
          numberOfRidersRacing: response.NumberOfRidersRacing
        }
      })
    })
    .catch(error => reject({ error, meta }))
})
