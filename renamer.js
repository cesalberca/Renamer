'use strict'
var fs = require('fs-extra')
var path = require('path')

var rename = './rename/'
var renamed = './renamed/'

// Empties de directory
fs.emptyDir(renamed, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log(`${renamed} is now empty`)
    renameFiles(rename)
  }
})

// Rename the files inside rename and puts them on renamed
function renameFiles (directory) {
  fs.readdir(directory, function (err, files) {
    if (err) {
      console.log(err)
    } else {
      files.forEach(function (file) {
        fs.copy(path.resolve(__dirname, directory, file), path.resolve(__dirname, renamed, getNewName(file)), function (err) {
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
