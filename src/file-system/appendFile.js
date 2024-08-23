const {appendFile} = require('node:fs')

const filePath = __dirname + '/sample.txt'
const content = 'This is Content that was built for normal usage.'

for (let i = 10;i < 20;i++) {
  appendFile(
    filePath,
    `[${i}]${content}\n`,
    function (err) {
      if (err) throw err
      console.log(`success: `, err)
    }
  )
}
