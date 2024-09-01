const http2 = require('http2')

const client = http2.connect('http://localhost:3000')
const req = client.request({
  path: '/',
})
let str = ''
req.on('data', function (data) {
  str += data
})
req.on('end', function () {
  console.log(`str: `, str)
})
req.end()
