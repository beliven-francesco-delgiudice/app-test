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
export function checkIsApp (platform) {
  if (!platform || platform !== 'web') {
    return true
  }
  return false
}

export function cleanParagraphs () {
  const elements = document.getElementsByTagName('p')
  const arrayOfEls = Array.from(elements)
  const filteredEls = arrayOfEls.filter(
    item => item.textContent.trim().length === 0
  )
  filteredEls.map(element => element.remove())
  console.debug('Empty paragraphs have been cleaned. See you next Wednesday!')
}

export function sanitizeManageText (text) {
  if (text && text.length) {
    let sanitizedText = text.replace(
      /(<br><\/p>|<\/br><\/p>|<br\/><\/p>)/gm,
      '</p>'
    )
    sanitizedText = sanitizedText.replace(/(<br>|<\/br>|<br\/>)/gm, '\n')
    sanitizedText = sanitizedText.replace(/^\s/gm, '')
    sanitizedText = sanitizedText.replace(/\n/gm, '<br>')
    return sanitizedText
  }
  return ''
}

export function sortActions (arrayOfActions) {
  const correctOrder = [
    'open',
    'rename',
    'download',
    'internal_share',
    'external_share',
    'save_to_mydocs',
    'move_to_mydocs',
    'move',
    'delete'
  ]
  if (!arrayOfActions || !arrayOfActions.length) {
    return []
  }

  return arrayOfActions.sort((a, b) => {
    return correctOrder.indexOf(a) - correctOrder.indexOf(b)
  })
}

export default {
  install (app) {
    app.mixin({
      methods: {
        capitalizeFirstLetter,
        ticksToString,
        checkIsApp,
        cleanParagraphs,
        sanitizeManageText,
        sortActions,
        validateErrorResponse,
        valIsArray (val) {
          return val instanceof Array
        }
      }
    })
  }
}
