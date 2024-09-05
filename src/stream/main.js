const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const { Transform } = require('stream')

const fileName = path.join(__dirname, '/article.xmind')

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.')
    callback(null, chunk)
  },
})

fs.createReadStream(fileName)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(fileName + '.zz'))
  .on('finish', function () {
    console.log('Done')
  })
