const {createReadStream} = require('node:fs')

const filePath = './sample.txt'
const readStream = createReadStream(filePath)

let acculator = ''
readStream.on('data', function (data) {
  acculator += data
})
readStream.on('end', function () {
  console.log('read completely\n')
  console.log('acculator: \n', acculator)
})
readStream.on('error', function () {
  console.log(`read errors.`)
})
