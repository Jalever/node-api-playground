const { statSync, createReadStream, createWriteStream } = require('node:fs')
const { pipeline } = require('node:stream/promises')
const zlib = require('node:zlib')
const path = require('node:path')

const bookPath = getFilePath(
  '../../private-assets/linux-cpp-first-line-development-practice.pdf',
)
const bookCompressedPath = getFilePath(
  '../../private-assets/linux-cpp-first-line-development-practice.pdf.tar.gz',
)

function getFilePath(fileName = '') {
  return path.join(__dirname, fileName)
}

async function compress() {
  await pipeline(
    createReadStream(bookPath),
    zlib.createGzip(),
    createWriteStream(bookCompressedPath),
  )
  console.log(`Pipeline Succeeded.`)
  getSize()
}
compress().catch(console.error)

function getSize() {
  const sizeInKb = 1024
  const sizeInMb = sizeInKb * 1024
  const { size } = statSync(bookPath)
  console.log(`size(kb): ${size / sizeInKb}, size(mb): ${size / sizeInMb}`)
  const { size: sizeAfterCompressed } = statSync(bookCompressedPath)
  console.log(` -> compressed:`)
  console.log(
    `size(kb): ${sizeAfterCompressed / sizeInKb}, size(mb): ${
      sizeAfterCompressed / sizeInMb
    }`,
  )
}
