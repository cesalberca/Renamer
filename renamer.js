'use strict'
module.exports = (function () {
  var fs = require('fs-extra')
  var path = require('path')

  function init (src, dest) {
    // Empties the directory and after it fires the rename files function
    removeFiles(dest, src, renameFiles)
  }

  // Rename the files inside src and puts them on dest
  function renameFiles (src, dest) {
    fs.readdir(src, function (err, files) {
      if (err) {
        console.log(err)
      } else {
        files.forEach(function (file) {
          fs.copy(path.resolve(__dirname, src, file), path.resolve(__dirname, dest, getNewName(file)), function (err) {
            if (err) {
              throw err
            } else {
              console.log(`${file} - ${getNewName(file)}`)
            }
          })
        })
      }
    })
  }

  function removeFiles (directory, src, callback) {
    fs.emptyDir(directory, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log(`${directory} is now empty`)
        callback(src, directory)
      }
    })
  }

  // Gets the final name, without spaces and in lower case
  function getNewName (string) {
    return replaceSpaces(removeExtraSpaces(string)).toLowerCase()
  }

  // Gets extension given the filename
  // function getExtension (filename) {
  //   var ext = path.extname(filename || '').split('.')
  //   return ext[ext.length - 1]
  // }
  //
  // function removeExtension (filename) {
  //   return filename.replace(/\.[^/.]+$/, '')
  // }

  function removeExtraSpaces (string) {
    return string.replace(/\s{2,}/g, ' ')
  }

  function replaceSpaces (string) {
    return string.replace(/ /g, '-')
  }

  return {
    init: init
  }
})()
