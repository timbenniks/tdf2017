const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const url = getUrl('currentStage')
  const meta = {
    originalUrl: url,
    type: 'state'
  }

  callApi(url)
    .then(response => {
      resolve({
        meta,
        data: {
          stage: response.StageId,
          stageDate: response.StageDate,
          startTime: response.StageStartTime,
          stageNumber: response.StageNumber,
          stageType: response.StageType,
          start: response.DepartingTown,
          finish: response.ArrivingTown,
          distance: response.TotalDistance,
          distanceFromStart: response.TotalDistanceFromRaceStart
        }
      })
    })
    .catch(error => reject({ error, meta }))
})
