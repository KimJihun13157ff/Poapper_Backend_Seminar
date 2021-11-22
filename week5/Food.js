const http = require('http')
const mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'It's not my password',
    database:'poapper_backend'
});


//

const server = http.createServer((req, res) => {
 
  console.log(req.url)
  const url_parsed = req.url.split('/');
  const method = req.method;
  
  req.on('data', data =>{const body = JSON.parse(data)
    console.log(body);
  });

  console.log(method)
  console.log(url_parsed);
  console.log('database before:' ,database)

  if(method == 'POST'){
    db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}', '${body.isVegan}')`, (err, results) => {
      if(err) throw err;
      res.end();
    });
  }else if(method == 'GET'){
    if(url_parsed[1] == ''){ // 전체 조회
      db.query(`SELECT * FROM foods`, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }else if(url_parsed[1] == 'isVegan'){ // 비건 조회
      db.query('SELECT * FROM foods WHERE isVegan=1', (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }else{ // id로 조회 
      var idstring = url_parsed[2]
      var regex = /[^0-9]/g
      const id = Number(idstring.replace(regex, ""));
      db.query('SELECT * FROM foods WHERE id='+ id, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });

    }
  }
  res.end();
});
server.listen(8080)

server.on('listening', () => {
  console.log("server is running on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
  })
