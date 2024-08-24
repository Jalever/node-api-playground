const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
  const urlData = url.parse(req.url, true)
  console.log(`url data: >> `, urlData)
  res.end('Hello World!')
})
server.listen(3000, function () {
  console.log(`Server started on localhost:3000`)
})
