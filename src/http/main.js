const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const bodyStream = []

  if (req.url === '/') {
    const responseData = JSON.stringify({ greeting: 'Hello World!' })
    res.write(responseData)
    res.end()
  } else if (req.url === '/profile') {
    const responseData = JSON.stringify({ data: 'Profile Page!' })
    res.write(responseData)
    res.end()
  } else if (
    req.url === '/create' &&
    req.method === 'POST' &&
    req.headers['content-type'] === 'application/json'
  ) {
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
  } else {
    res.statusCode = 404
    res.write('Page not found!')
    res.end()
  }
})
server.listen(3000, function () {
  console.log('Server started on localhost:3000')
})
