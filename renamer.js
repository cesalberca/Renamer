'use strict'
module.exports = (function () {
  var fs = require('fs-extra')
  var path = require('path')

  function init (src, dest) {
    // Empties de directory
    fs.emptyDir(dest, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log(`${dest} is now empty`)
        // Fires the main function
        renameFiles(src, dest)
      }
    })
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

  // Gets the final name, without spaces and in lower case
  function getNewName (filename) {
    return `${removeExtension(replaceSpaces(filename))}.${getExtension(filename)}`
  }

  // Gets extension given the filename
  function getExtension (filename) {
    var ext = path.extname(filename || '').split('.')
    return ext[ext.length - 1]
  }

  function removeExtension (filename) {
    return filename.replace(/\.[^/.]+$/, '')
  }

  function replaceSpaces (string) {
    return string.replace(/ /g, '-').toLowerCase()
  }

  return {
    init: init
  }
})()
