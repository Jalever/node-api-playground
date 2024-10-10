const { truncateSync } = require('node:fs')

const filePath = __dirname + '/sample.txt'
try {
  truncateSync(filePath)
} catch (error) {
  throw new Error(error)
}
