'use strict'
var fs = require('fs-extra')
var path = require('path')

var directory = './pdfs/'
var newDirectory = './renamed-pdfs/'

fs.emptyDir(newDirectory, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log(`${newDirectory} is now empty`)
    renameFiles(directory)
  }
})

function renameFiles (directory) {
  fs.readdir(directory, function (err, files) {
    if (err) {
      console.log(err)
    } else {
      files.forEach(function (file) {
        fs.copy(path.resolve(__dirname, directory, file), path.resolve(__dirname, newDirectory, getNewName(file)), function (err) {
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

function getNewName (filename) {
  return `${removeExtension(replaceSpaces(filename))}-ficha.pdf`
}

function replaceSpaces (filename) {
  return filename.replace(/ /g, '-').toLowerCase()
}

function removeExtension (filename) {
  return filename.replace(/\.[^/.]+$/, '')
}
