/**
 * Paginated GET
 * @param {string} url API suffix url
 * @param {object} params Object with query params
 */
const search = $app =>
  async function (url, parameters) {
    const results = await $app.$http({
      method: 'GET',
      url,
      parameters
    })

    console.log(results)

    return results
  }

/**
 * Get a specific entity through ID
 * @param {string} url API suffix url
 * @param {integer} entityID Entity integer ID
 */
const getOne = $app =>
  async function (url, entityID) {
    return $app.$http({
      method: 'GET',
      url: url + '/' + entityID
    })
  }

/**
 * Add a specific entity
 * @param {string} url API suffix url
 * @param {object} payload Payload with data
 */
const addOne = $app =>
  async function (url, payload) {
    return $app.$http({
      method: 'POST',
      url,
      body: payload
    })
  }

export { search, getOne, addOne }

// export function search (url, params, jwt) {
//   return window
//     .fetch(API_URL + url + '?' + formattedParams, {
//       headers: getHeaders(jwt),
//       method: 'GET'
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json()
//       } else {
//         throw res
//       }
//     })
//     .catch(err => {
//       throw err
//     })
// }
