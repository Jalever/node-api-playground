const { appendFile } = require('node:fs')

const filePath = __dirname + '/sample.txt'
const content = 'This is Content that was built for normal usage.'

for (let i = 10; i < 20; i++) {
  appendFile(filePath, `[${i}]${content}\n`, function (err) {
    if (err) throw err
    console.log(`success: `, err)
  })
}

/**
 * Best Practice:
  const { appendFile, truncate } = require('fs/promises')
  const { join } = require('path')

  async function generateFile(targetPath = '', content = '') {
    try {
      await appendFile(targetPath, content)
      console.log(`content inserted successfully!`)
    } catch (error) {
      console.error(`something wrong has happended.`, error.message)
    }
  }

  async function invoke(name = '/sample.txt') {
    const targetPath = join(__dirname, name)
    await truncate(targetPath)

    const count = 10
    const tpl = `This is content that was written by fs.appendFile`
    for (let i = 0; i < count; i++) {
      await generateFile(targetPath, `${tpl} ${i}.\n`)
    }
  }

  invoke()
 */
