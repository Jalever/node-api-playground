const { pipeline } = require('stream')
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const fileName = path.join(__dirname, '/article')

pipeline(
  fs.createReadStream(fileName + '.xmind'),
  zlib.createGzip(),
  fs.createWriteStream(fileName + '.tar.gz'),

  function (err) {
    if (err) {
      console.log('failed ', err)
    } else {
      console.log('success')
    }
  },
)
