const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const url = getUrl('status')
  const meta = {
    originalUrl: url,
    type: 'status'
  }

  callApi(url)
    .then(response => {
      resolve({
        meta,
        data: {
          status: response.State,
          message: response.Message
        }
      })
    })
    .catch(error => reject({ error, meta }))
})
