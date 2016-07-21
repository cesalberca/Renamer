'use strict'
module.exports = (function () {
  // Gets the final name, without spaces, without special characters and in lower case
  function getSafeName (string) {
    var withoutSpecialCharacters = replaceSpecialCharacters(replaceSpanishN(string))
    return replaceSpacesWithDashes(removeExtraSpaces(withoutSpecialCharacters)).toLowerCase()
  }

  function replaceSpecialCharacters (string) {
    var regex = /[^a-zA-Z0-9_\-\.\s]/g
    return string.replace(regex, '')
  }

  function replaceSpanishN (string) {
    return string.replace(/[ñ]/g, 'n')
  }

  function removeExtraSpaces (string) {
    return string.replace(/\s{2,}/g, ' ')
  }

  function replaceSpacesWithDashes (string) {
    return string.replace(/ /g, '-')
  }

  return {
    getSafeName: getSafeName
  }
})()
