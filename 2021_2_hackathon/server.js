const express = require('express')
const mysql = require('mysql')
const fs = require('fs');
const crypto = require('crypto');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
const main_htmlbody =require('./main_body.js')
const main_htmlhead =require('./main_head.js');
const shown = require('./hw_redacted.js');
const shown_htmlbody =require('./shown_body.js')
const shown_htmlhead =require('./shown_head.js');

const app = express();
app.use(express.json())
app.use(session({
  secret: '3.14159265358979',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))

const db = mysql.createConnection({
  host:'localhost',
  user:'root',  
  password:'JH13157ff!',
  database:'poapper_odap'
});
db.connect();


function IsOwner(request, response) {
  if (request.session.is_logined) {
    return true;
  } else {
    return false;
  }
}
function getID(request, response) {
  if (request.session.is_logined) {
    return request.session.user_id;
  } else {
    return false;
  }
}


app.get('/login_page', function(req, res) {
  if(!IsOwner(req,res)){
  fs.readFile('./sign_in_up.html', (err,data) => {
    if(err) throw err
    res.write(data)
    res.end()
  });
}
else
{
  res.redirect('/main');
  res.end();
}

})

app.post('/Login', function (req, res) {
  
  const body = req.body;
  const inputPassword = body.passwd;
  db.query(
    `SELECT * FROM user_table WHERE user_id='${body.id}'`,
    function (err, results) {
      if (err) 
      {
        console.log('id serch error', err); //error
        res.redirect('/main');
        res.end();
      } 
      else if(results == 0)
      {// login fall, no id
        console.log("no id")
        res.send(false)
      }
      else
      {
        const salt = results[0].user_salt
        const database_hP = results[0].user_passwd
        const hashPassword = crypto
        .createHash('sha512')
        .update(inputPassword + salt)
        .digest('hex');
        if(hashPassword == database_hP )
        { // login success
          console.log("same")
          req.session.is_logined = true;
          req.session.user_id = body.id;
          req.session.save(function() {
            console.log("login_success!!!!!!!!!!")
            //res.redirect(307, '/main');
            res.send(true)
          });
        }
        else
        {// login fail
          res.send(false)
          console.log("diff")
        }
      }
    },
  );


});

app.post('/Signup', async function (req, res) {
  const body = req.body;
  const inputPassword = body.passwd;
  const salt = crypto.randomBytes(128).toString('base64');
  const hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');
    db.query(
    'INSERT INTO user_table (user_id, user_salt, user_passwd) values (?,?,?)',
    [body.id, salt, hashPassword],
    function (err, rows, fields) {
      if (err) {
        console.log('sign_up error', err); //error, or already exist id
        res.send(false);
      } else {
        res.send(true); // display success
      }
    },
  );
});

/////////////////////////////////////////////////////////////////////////////////// main part//////////////////////////////
// display main page with assignment list
app.get('', function(req, res) {
    res.redirect("/main");
})


app.get('/main', function(req, res) {
  if(IsOwner(req,res)){
    db.query(
      `SELECT * FROM  Assign_list`,
      function (err, results) {
        if (err) 
        {
          console.log('list error', err); //error
          res.end();
        } 
        else
        {
          var html = main_htmlhead.HTML();
          res.write(html);
          var i = 0;
          while(results[i] != undefined)
          {
            html = main_htmlbody.HTML( results[i].Subject, results[i].Assign, results[i].Submit_count, i);
            res.write(html);
            i++;
          }
          console.log(results) // result[i].Assign, result[i].Subject, result[i].submit_num 으로 각 원소에 접근가능
          res.end()
        }
      },
    );
  }
  else
  {
    res.redirect('/login_page');
    res.end();
  }

})

// view shown, upload page.
app.get('/HW/:subject/:assign', function(req, res) {
  if(IsOwner(req,res))
  {
    const ID = getID(req,res)
    const tablename = req.params.subject + req.params.assign
    console.log(tablename)
    db.query(
      `SELECT * FROM ${tablename}_answer WHERE UserID='${ID}'`,
      function (err, results) {
        if (err) 
        {
          console.log('ID serch error', err); //error
          res.send(false);
        } 
        else if(Array.isArray(results) && results.length === 0)
        {
          console.log("no string!");
          // display redacted.html, this is upload page
          var html = shown.HTML(req.params.subject,req.params.assign)
          res.write(html);
          res.end();
        }
        else
        {
          //display shown.html, this is answer page
          db.query(
            `SELECT * FROM ${tablename}_answer`,
            function(err, results)
            {
              if (err) 
              {
                console.log('display answer error', err); //error
                res.send(false);
              } 
              else
              {
                var html = shown_htmlhead.HTML(req.params.subject,req.params.assign)
                res.write(html);
                var i = 0;
                console.log(results);
                while(results[i] != undefined)
                {
                  html = shown_htmlbody.HTML( results[i].UserID, results[i].Answer, i);
                  res.write(html);
                  i++;
                }
                res.end();

              }
            });
        }
      });


  }
  else
  {
    res.send(false)
  }

})


// upload your assinment!
/*
{
  "subject" : "MATH"
  "assign"  : "HW10"
  "answer" : " "}
*/
app.post('/make_new_answer', function (req, res) {
  const body = req.body;
  console.log(body);
  if(IsOwner(req, res))
  {
  const ID = getID(req, res);
  
  const tablename = body.subject + body.assign
  db.query(
    `INSERT INTO ${tablename}_answer (UserID, Answer, Good, Wrong) values (?,?,?,?)`,
    [ID, body.answer, 0,0],
    function (err) {
      if (err) {
        console.log('answer insert error', err);
        res.send(false);
      } 
      else
      {
        db.query(
          `UPDATE Assign_list SET Submit_count=Submit_count+ 1 WHERE Subject='${body.subject}' AND Assign='${body.assign}'`,
          function (err) {
            if (err) {
              console.log('update count error', err);
              res.send(false);
            } 
            else
            { 
              console.log("success")
              res.send(true); // 생성성공
            }
          });
      }
    });
  }
  else
  {
    res.send(false);
  }
});


//add GOOD for assignment
// /Like
/*
app.post('/Like', function (req, res) {
  const body = req.body;
  const uploader = body.id;
    db.query(
      `UPDATE ${tablename} SET Answer='${body.answer}'WHERE UserID='${uploader}'`,
    function (err) {
      if (err) {
        console.log('sign_up error', err); //error, or already exist id
        res.send(false);
      } else {
        res.send(true); // display success
      }
    },
  );
});
*/


//add bad for assignemnt


////////////////////////////////////make new assign part////////////////////////////
app.get('/makeAssign', async function (req, res) {
  fs.readFile('./makeAssign.html', (err, data) => {
    if(err) throw err
    res.write(data)
    res.end()
  });
});



// make new list, post assign list, make new assign, from upload page.
/*
body : { 
  "subject" : "MATH"
  "assign"  : "HW10"
}
header : local8080/make_new_assin/
*/
app.post('/make_new_assign', function (req, res) {
  const body = req.body;  
    db.query(
    'INSERT INTO Assign_list (Subject, Assign, submit_count) values (?,?,?)',
    [body.subject, body.assign, 0],
    function (err) {
      if (err) {
        console.log(body)
        console.log('adding assign list error', err); //이미 존재하는 과목-과제 쌍 인경우
        res.send(false);
      } 
      else 
      {
        //make new table for assign
        const tablename = body.subject + body.assign
        db.query(
          `CREATE TABLE ${tablename}_answer(
            id INT(11) NOT NULL AUTO_INCREMENT,
            UserID VARCHAR(100) NOT NULL,
            Answer VARCHAR(10000) NOT NULL,
            Good INT(11),
            Wrong INT(11),
            PRIMARY KEY(id)
        );`,
          function (err) {
            if (err) {
              console.log('making answer table error', err);
              res.send("critical error!!!!!!!!!!");
              //이게 에러가 뜨면 assign_list에는 추가가 되는데 table은 안만들어져서 매우 위험함, 
              //assign name으로 # 같은 특수문자를 넣을 시에 오류가 발생하는걸 확인함. 여기서 query로 다시 list를 수정해주는 과정이 필요하나, 시간 부족으로 생략
            } 
            else
            {
              console.log("success")
              res.send(true);
              // 생성 성공
            }
          }
        );
      }
    }
  );
});



app.listen(8080, () => console.log("Server is listening on 8080 port..."));

/*
app.use(express.json())

app.use("/main", bookRouter)

app.get("", (req, res) => {
  res.send("Hello Express!");
})

*/