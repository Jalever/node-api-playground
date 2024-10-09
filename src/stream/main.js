// const { truncateSync } = require('node:fs')

// const filePath = __dirname + '/sample.txt'
// try {
//   truncateSync(filePath)
// } catch (error) {
//   throw new Error(error)
// }

const { appendFileSync, statSync } = require('node:fs')
const { Faker, zh_CN } = require('@faker-js/faker')

const customFaker = new Faker({
  locale: [zh_CN],
})

const filePath = __dirname + '/sample.txt'
const bytesByMb = 1024 ** 2
const bytesByKb = 1024
// const writeStream = createWriteStream(filePath)

// let fragments = ''
const count = 20_000

for (let i = count; i > 0; i--) {
  try {
    const content = customFaker.person.fullName()
    const newContent = `[${i}]${content}`
    appendFileSync(filePath, newContent)
  } catch (error) {
    throw new Error(error)
  }
}

const stats = statSync(filePath)
console.log(
  `Write Successfully, size(kb): ${stats.size / bytesByKb}, size(mb): ${
    stats.size / bytesByMb
  }`,
)

// writeStream.write(fragments)
// writeStream.end()
// writeStream.on('finish', function () {
//   console.log(`Write Successfully`)
// })
