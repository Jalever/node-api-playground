const http2 = require('http2')
const fs = require('fs')
const path = require('path')

const getPath = function (p = '') {
  return path.join(__dirname, p)
}

const privateKey = fs.readFileSync(
  getPath('/ssl-certificate/private-key.pem'),
  'utf8',
)
const certificate = fs.readFileSync(
  getPath('/ssl-certificate/certificate.pem'),
  'utf8',
)

const credentials = {
  key: privateKey,
  cert: certificate,
}

const http2Server = http2.createServer(credentials)
http2Server.on('stream', function (stream, requestHeaders) {
  stream.respond({
    status: 200,
    'content-type': 'text/plain',
  })
  stream.write('Hello World!')
  stream.end()
})
http2Server.listen(3000, function () {
  console.log(`Started server on port 3000`)
})
