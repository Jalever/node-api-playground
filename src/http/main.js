const http = require('http')
const server = http.createServer(function (req, res) {
  res.end('Hello World!')
})
server.listen(3000, function () {
  console.log(`Server started on localhost:3000`)
})
