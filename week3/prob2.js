
const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url)
  if(req.url == '/') {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server!</p>');
    res.end()
  }else if(req.url.substr(0,4) == '/add'){
    var numstring = req.url.substr(5)
    var split_str = numstring.split("/");
    var num1 = Number(split_str[0])
    var num2 = Number(split_str[1])
    var answer = String(num1 + num2)
    res.write(answer)
    res.end()
  }
  else if(req.url.substr(0,4) == '/sub'){
    var numstring = req.url.substr(5)
    var split_str = numstring.split("/");
    var num1 = Number(split_str[0])
    var num2 = Number(split_str[1])
    var answer = String(num1 - num2)
    res.write(answer)
    res.end()
  }
  else if(req.url.substr(0,4) == '/mul'){
    var numstring = req.url.substr(5)
    var split_str = numstring.split("/");
    var num1 = Number(split_str[0])
    var num2 = Number(split_str[1])
    var answer = String(num1 * num2)
    res.write(answer)
    res.end()
  }
  else if(req.url.substr(0,4) == '/div'){
    var numstring = req.url.substr(5)
    var split_str = numstring.split("/");
    var num1 = Number(split_str[0])
    var num2 = Number(split_str[1])
    var answer = String(num1 / num2)
    res.write(answer)
    res.end()
  }
});
// process exited with code 1이 뜨는데 이유를 모르겠음, 근데 잘 작동함...
server.listen(8080)

server.on('listening', () => {
  console.log("server is running on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
  })
