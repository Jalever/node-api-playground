const http = require('node:http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    }),
  )
})
server.listen(3000, function () {
  console.log('server is listening on port 3000')
})
