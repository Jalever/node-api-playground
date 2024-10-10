const { pipeline } = require('node:stream/promises')
const fs = require('node:fs')
const zlib = require('node:zlib')
const path = require('path')
const getSize = require('./utils/getSize')

const getFilePath = (fileName = '') => path.join(__dirname, fileName)

const rr = fs.createReadStream(getFilePath('sample.txt'))
rr.on('readable', () => {
  console.log(`readable: ${rr.read()}`)
})
rr.on('done', () => {
  console.log('end')
})
