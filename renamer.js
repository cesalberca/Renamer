'use strict'
module.exports = (function () {
  var fs = require('fs-extra')
  var path = require('path')

  function init (src, dest) {
    // Empties the directory and after it fires the rename files function
    removeFiles(dest, src, dest, renameFiles)
  }

  // Removes files inside a directory. Makes a callback to renameFiles function, thats why we need src and dest arguments on removeFiles, to pass them to the callback.
  function removeFiles (directory, src, dest, renameFiles) {
    fs.emptyDir(directory, function (err) {
      if (err) {
        throw err
      } else {
        console.log(`${directory} is now empty`)
        // Renaming should start after the directory is emptied, this makes a callback function.
        renameFiles(src, dest)
      }
    })
  }

  // Rename the files inside src and puts them on dest
  function renameFiles (src, dest) {
    fs.readdir(src, function (err, files) {
      if (err) {
        throw err
      } else {
        files.forEach(function (file) {
          copyFile(file, getNewName(file), src, dest)
        })
      }
    })
  }

  // Copies a file given a filename a new filename a source and a destination.
  function copyFile (filename, newFilename, src, dest) {
    fs.copy(path.resolve(__dirname, src, filename), path.resolve(__dirname, dest, newFilename), function (err) {
      if (err) {
        throw err
      } else {
        console.log(`${filename} - ${newFilename}`)
      }
    })
  }

  // Gets the final name, without spaces, without special characters and in lower case
  function getNewName (string) {
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
    init: init
  }
})()
