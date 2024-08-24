const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
  const bodyStream = []
  req
    .on('data', function (chunk) {
      bodyStream.push(chunk)
    })
    .on('end', function () {
      const bufferData = Buffer.concat(bodyStream)
      const requestBody = JSON.parse(bufferData)
      console.log('request body :>>', requestBody)
      res.end('end')
    })

  console.log('hello world!')
})
server.listen(3000, function () {
  console.log('Server started on localhost:3000')
})
