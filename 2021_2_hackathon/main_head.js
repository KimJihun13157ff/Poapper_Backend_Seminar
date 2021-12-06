module.exports = {
    HTML:function(subject, assign, count){
      return `
      <!DOCTYPE html>

      <html>
      
      <head>
          <title>O-Dap Main Page</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Staatliches">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      
          <style>
              #title_div {
                  font-family: "Staatliches", sans-serif;
              }
      
              #answered_hw {
                  /*background-color: #71DFE7;*/
                  background-color: hsl(204, 60%, 71%);
              }
      
              #answered_hw:hover {
                  /*background-color: #C2FFF9;*/
                  background-color: hsl(204, 60%, 86%);
              }
      
              #buffer_div {
                  height:5px;
              }
          </style>
      
          <script>
              function hwClick(num){
                console.log("TEST");
                event.preventDefault();
    
                var subject = document.getElementById('subject' + num.toString()).textContent;
                var assign = document.getElementById('assign' + num.toString()).textContent;
    
                location.href = "/HW" + "/" + subject + "/" + assign;
            }
              
      
              
          </script>
      </head>
      
      <body>
          <section class="hero is-info">
              <div class="container">
                  <h1 class="title">O-DAP</h1>
                  <h2 class="subtitle" id="title_div">Postechian Homework Service</h2>
              </div>
          </section>
      
          <div style="height: 30px;"></div>
      
          <div class="columns is-centered is-vcentered">
              <div class="column is-2 has-text-centered">
                  <button class="button is-primary is-rounded" onclick="location.href = '/makeAssign';">new assign</button>
              </div>
              <div class="column is-8 box" id="answered_hw">
                  <h1 class="title" id="subject1">SUBJECT</h1> <h1 class="title" id="assign1">ASSIGNMENT NAME</h1>
                  <h2 class="subtitle"></h2>
              </div>
              <div class="column is-2"></div>
          </div>
      `;
    },list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    }
  }