const { Transform } = require('stream')

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  },
})

upperCaseTransform.on('data', function (data) {
  return process.stdout.write(data)
})
upperCaseTransform.write('Hello, ')
upperCaseTransform.write('world')
upperCaseTransform.end()
