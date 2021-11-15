const http = require('http')
const fs = require('fs');

function homework()
{
    var subject
    var assignName
    var duedateM
    var duedateDD 
}

let database = new Array();
let idx = 0;
// 과제목록 관리 서버
// post, put: 8080/subject/assinment name/M/DD
// get : 8008/subjectname/subject or 8080/duebefore/M/DD
// delete : 8080/subject/assinment name or 8080/duebefore/M/DD
const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = req.method;
  console.log(req.url)
  console.log(method)
  console.log(url_parsed);
  res.write('<h1>Your Assignment List</h1>');


  if(method == 'POST'){
    
    
    
    var is_exist = 0;
    for(var i =0; i < idx ; i++){
        if(url_parsed[1] == database[i].subject && url_parsed[2] == database[i].assignName){
            is_exist = 1;
            break;
        }
    }
    if(is_exist){
        console.log("this assignment is already exist, if you want to change duedate, pleas use PUT")
    }
    else{
    database[idx] = new homework();
    database[idx].subject = url_parsed[1];
    database[idx].assignName = url_parsed[2];
    database[idx].duedateM = Number(url_parsed[3]);
    database[idx].duedateDD = Number(url_parsed[4]);
    idx += 1;
    }
    // 조건문으로 ERROR 1 해결

  }else if(method == 'GET'){
    if(url_parsed[1] == ''){ // 전체 조회
      for(var i =0; i <idx ; i++){
        res.write(database[i].subject + " "+ database[i].assignName + "    "+ database[i].duedateM+ "/"+ database[i].duedateDD + '<br/>');
      }
    }else if(url_parsed[1] == 'subjectname'){ // 과목 조회
        for(var i =0; i < idx ; i++){
            if(url_parsed[2] == database[i].subject )
            res.write(database[i].subject + " "+ database[i].assignName + "    "+ database[i].duedateM+ "/"+ database[i].duedateDD + '<br/>');
          }
    }else if(url_parsed[1] == 'duebefore'){ // duedate 조회
        const due = Number(url_parsed[2]) * 100 +  Number(url_parsed[3])
        for(var i =0; i < idx ; i++){
            if(due >= (database[i].duedateM * 100 +  database[i].duedateDD))
            res.write(database[i].subject + " "+ database[i].assignName + "    "+ database[i].duedateM+ "/"+ database[i].duedateDD + '<br/>');
          }
    }
  }else if(method == 'PUT'){ // duedate 수정만 받음
    var url_idx = -1;
    for(var i =0; i < idx ; i++){
        if(url_parsed[1] == database[i].subject && url_parsed[2] == database[i].assignName){
            url_idx = i;
            break;
        }
    }
    if(url_idx == -1){
        console.log("This task does not exist.");
    }else{
    database[url_idx].duedateM = Number(url_parsed[3]);
    database[url_idx].duedateDD = Number(url_parsed[4]);
    }  
    // 해당 과제가 존재하는지 찾는 조건문을 만들어 해결

    }else if(method == 'DELETE'){
    if(url_parsed[1] == 'duebefore'){
        var delcount = 0;
        const due = Number(url_parsed[2]) * 100 +  Number(url_parsed[3])
        for(var i =0; i < idx ; i++){
            if(due >= (database[i].duedateM * 100 +  database[i].duedateDD)){
                database[i] = undefined;
                delcount++;
            }

        }
        database = database.filter(
          (element, i) => element !== undefined
        );
        idx = idx - delcount;
    }else{
    for(var i =0; i < idx ; i++){
        if(url_parsed[1] == database[i].subject && url_parsed[2] == database[i].assignName){
            database[i] = undefined;
            idx--;
        }
    }
    database = database.filter(
      (element, i) => element !== undefined
    );
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

 
