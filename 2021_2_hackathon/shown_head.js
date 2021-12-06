module.exports = {
    HTML:function(subject, assign){
      return `
      <!DOCTYPE html>
<html>
    <head>
        <title>O-DAP Upload</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Staatliches">
        <script src="https://kit.fontawesome.com/f0a0c88959.js" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
        <style>
            h2 {
                font-family: "Staatliches", sans-serif;
            }

            #msg_text{
                font-size: 16px;;
            }
        </style>

        <script>
          function likeClick(num){
            console.log("TEST");
            event.preventDefault();
            var json_org = {
              id : document.getElementById('uploader' + num.toString()).textContent
            }
            const json = JSON.stringify(json_org);
            console.log(json);
            $.ajax({
              type: 'POST',
              url: '/Like',
              dataType: 'json',
              data: json,
              contentType: 'application/json',
              success: function(data){
                alert(data)
              }
            });
          }

          function dislikeClick(num){
            console.log("TEST");
            event.preventDefault();
            var json_org = {
              id : document.getElementById('uploader' + num.toString()).textContent
            }
            const json = JSON.stringify(json_org);
            console.log(json);
            $.ajax({
              type: 'POST',
              url: '/Dislike',
              dataType: 'json',
              data: json,
              contentType: 'application/json',
              success: function(data){
                alert(data)
              }
            });
          }
        </script>
    </head>
    <body>
        <section class="hero is-info">
            <div class="container">
                <h1 class="title" id="title_div">O-DAP</h1>
                <h2 class="subtitle">Postechian Homework Service</h2>
            </div>
        </section>
    
        <div style="height: 30px;"></div>

        <div class="columns is-centered is-vcentered">
            <div class="column is-2 has-text-centered"></div>
            <div class="column is-8">
                <h1 class="title">${subject} ${assign}</h1> 
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