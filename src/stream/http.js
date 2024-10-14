const http = require('node:http')
const fs = require('node:fs')
const path = require('path')
const { Transform } = require('node:stream')

const PORT = 8000

const getFilePath = (fileName = '') => path.join(__dirname, fileName)

function upperCaseTransform() {
  return new Transform({
    transform(chunk, encoding, next) {
      this.push(chunk.toString().toUpperCase())
      next()
    },
  })
}

const server = http.createServer(function (req, res) {
  const stream = fs.createReadStream(getFilePath('sample.txt'))
  stream.pipe(upperCaseTransform()).pipe(res)
  stream.on('end', function () {
    res.end()
  })
})
server.listen(PORT, function () {
  console.log(`Server is listening at the port: ${PORT}`)
})

// const { pipeline } = require('node:stream/promises')
// const fs = require('node:fs')
// const zlib = require('node:zlib')
// const path = require('path')
// const getSize = require('./utils/getSize')

// const getFilePath = (fileName = '') => path.join(__dirname, fileName)

// const rr = fs.createReadStream(getFilePath('sample.txt'))
// rr.on('readable', () => {
//   console.log(`readable: ${rr.read()}`)
// })
// rr.on('done', () => {
//   console.log('end')
// })
