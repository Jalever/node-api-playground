const {truncate} = require('node:fs')

const filePath = './sample.txt'
truncate(
  filePath,
  function (err) {
    if (err) {
      throw err
    }
    console.log(`${filePath} was truncated.`)
  }
)
