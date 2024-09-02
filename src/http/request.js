const http = require('node:http')

const requestArgs = {
  host: '127.0.0.1',
  port: 3000,
  path: '/',
}
const req = http.request(requestArgs)
req.end()

req.on('information', function (info) {
  console.log('Got information prior to main response: ' + info.statusCode)
})
