const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const filePath = path.join(__dirname, '/article.xmind')
fs.createReadStream(filePath)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(filePath + '.gz'))
