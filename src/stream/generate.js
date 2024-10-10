const { appendFileSync, statSync } = require('node:fs')
const { fakerZH_CN } = require('@faker-js/faker')
const faker = fakerZH_CN
const filePath = __dirname + '/sample.txt'
const bytesByMb = 1024 ** 2
const bytesByKb = 1024
const count = 2_000 * 10

for (let i = count; i > 0; i--) {
  try {
    const content = faker.lorem.paragraphs()
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
