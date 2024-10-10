const { statSync } = require('node:fs')

const bytesByMb = 1024 ** 2
const bytesByKb = 1024

module.exports = function (filePath, tags = '') {
  const stats = statSync(filePath)
  console.log(
    `[${tags}] Size(kb): ${stats.size / bytesByKb}, size(mb): ${
      stats.size / bytesByMb
    }`,
  )
}
