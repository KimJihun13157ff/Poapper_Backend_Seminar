
const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url)
  if(req.url == '/') {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server!</p>');
    res.end()
  }else if(req.url == '/timer'){
    var moment = require('moment');
    res.write(moment().format('YYYY-MM-DD HH:mm:ss'))
    res.end()
    //접속한 순간의 시간이 출력됨, 시계처럼 매초 마다 res.write를 실행하게 할 방법...?
  }
});
server.listen(8080)

server.on('listening', () => {
  console.log("server is running on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
  })
