const { pipeline } = require('node:stream/promises')
const fs = require('node:fs')
const zlib = require('node:zlib')
const path = require('path')
const getSize = require('./utils/getSize')

const getFilePath = (fileName = '') => path.join(__dirname, fileName)

async function run() {
  await pipeline(
    fs.createReadStream(getFilePath('sample.txt')),
    zlib.createGzip(),
    fs.createWriteStream(getFilePath('sample.tar.gz')),
  )
  getSize(getFilePath('sample.txt'), 'Before')
  getSize(getFilePath('sample.tar.gz'), 'Compressed')
  console.log(`Pipeline Succeeded.`)
}
run().catch(console.error)
