const { unlink } = require('fs/promises')
const { join } = require('path')

async function deleteFile(traget = '') {
  const filename = join(__dirname, traget)
  try {
    await unlink(filename)
    console.log(`deleted ${filename}`)
  } catch (error) {
    console.error(`got an error trying to delete the file: ${error.message}`)
  }
}

deleteFile(`/sample.txt`)
