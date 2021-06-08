
export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// If year is not inserted at the start of username it will be added automatically
export function parseEmail (email) {
  if (email && !/^\d{4,5}_\w+/.test(email)) return `${(new Date().getFullYear())}_${email}`
  return email
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
    const dateDifference = (myDate.getTime() - originDate.getTime())
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

export default {
  install (app) {
    app.mixin({
      methods: {
        capitalizeFirstLetter,
        ticksToString,
        validateErrorResponse,
        valIsArray (val) {
          return val instanceof Array
        }
      }
    })
  }
}
