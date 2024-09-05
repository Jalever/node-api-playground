const http = require('node:http')

let s = ''
for (let i = 0; i < 1024 * 10; i++) {
  s += 'a'
}

const str = s
const bufferStr = Buffer.from(s)

const server = http.createServer(function (req, res) {
  console.log(`req.url: `, req.url)
  if (req.url === '/buffer') {
    res.end(bufferStr)
  } else if (req.url === '/string') {
    res.end(str)
  }
})
server.listen(3000, function () {
  console.log(`the server is listening on port: 3000`)
})
