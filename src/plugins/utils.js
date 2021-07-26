export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Convert from VBA/C# timestamp to javascript timestamp
 * @param {Number} timestamp Timestamp to convert to user-readable format
 *
 * Reference:
 * https://www.codeproject.com/Questions/859061/How-do-I-convert-Csharp-DateTime-Ticks-to-javascri
 */
export function ticksToString (timestamp) {
  try {
    const myDate = new Date(timestamp / 10000)
    const originDate = new Date(3939, 0, 1)
    const dateDifference = myDate.getTime() - originDate.getTime()
    const date = new Date(dateDifference)

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  } catch (e) {
    console.warn('Cannot convert timestamp', timestamp)
  }
}

// If backend respond with invalid error length or type it will return empty string in order to avoid undesired UX
// If will return a json we must parse it in order to have the error description
export function validateErrorResponse (response) {
  // First response type: A page with html inside, we cannot use it
  if (!response || response.length > 200 || /[<>]/.test(response)) return ''
  // Second response type: an array with errors
  else if (response.constructor === Array) {
    if (!response.length) return ''
    return response[0].description
  }
  // Third response type: A string with the error
  return response.trim() || ''
}

/**
 * Function to check if app is played in web or mobile device
 * @param {object} platforms the CapacitorPlatforms object
 * @returns boolean
 */
export function checkIsApp (platforms) {
  if (
    !platforms ||
    !platforms.currentPlatform ||
    platforms.currentPlatform.name !== 'web'
  ) {
    return true
  }
  return false
}

export default {
  install (app) {
    app.mixin({
      methods: {
        capitalizeFirstLetter,
        ticksToString,
        checkIsApp,
        validateErrorResponse,
        valIsArray (val) {
          return val instanceof Array
        }
      }
    })
  }
}
