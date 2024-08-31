const http = require('http')
const https = require('https')
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

const httpServer = http.createServer(function (req, res) {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` })
  res.end()
})

httpServer.listen(80, function () {
  console.log(`HTTP server listening on port 80`)
})

const credentials = {
  key: privateKey,
  cert: certificate,
}

const httpsServer = https.createServer(credentials, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Secure Hello World!')
})

httpsServer.listen(443, function () {
  console.log('HTTPS server listening on port 443')
})
