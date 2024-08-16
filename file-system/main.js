const {truncateSync, appendFileSync, createReadStream, statSync} = require('node:fs')

const target = __dirname + '/sample.txt'

truncateSync(target)

const count = 10
for (let i = 0;i < count;i++) {
  const options = {encoding: 'utf-8'}
  appendFileSync(target, i % 2 === 0 ? '双' : '单', options)
}

const options = {
  encoding: 'utf-8',
  start: 27,
  end: 29
}
const readStream = createReadStream(target, options)
readStream.on('data', function (res) {
  console.log(`readStream - data: `, res)
})
readStream.on('end', function () {
  console.log(`read stream completely`)
  const stats = statSync(target)
  const sizeInByte = stats.size
  console.log(`content size: ${sizeInByte}, per: ${sizeInByte/count}`)
})
readStream.on('error', function () {})
