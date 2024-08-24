const http = require('http')
const server = http.createServer(function (req, res) {
  console.log(`Request Headers: >> `, req.headers)
  console.log(`Request Method: >> `, req.method)
  console.log(`Request URL: >> `, req.url)
  res.end('Hello World!')
})
server.listen(3000, function () {
  console.log(`Server started on localhost:3000`)
})
