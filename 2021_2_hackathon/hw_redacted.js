module.exports = {
    HTML:function(subject, assign){
      return `
      <!DOCTYPE html>
<html>
<head>
    <title>O-DAP Upload</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Staatliches">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
        h2 {
            font-family: "Staatliches", sans-serif;
        }
    </style>

    <script>
        function uploadClick() {
            console.log("CLICKED");
            event.preventDefault();
            var json_org = {
                subject : '${subject}',
                assign : '${assign}',
                answer : document.getElementById('answer').value
            }

            const json = JSON.stringify(json_org);
            console.log(json);

            $.ajax({
                type: 'POST',
                url: '/make_new_answer',
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

    <div class="columns is-centered">
        <div class="column is-one-quarter"></div>
        <div class="column is-half">
            <div class="field">
                <label class="label">Answers</label>
                <div class="control">
                    <textarea class="textarea is-hovered" id="answer" placeholder="Enter Homework Answers"></textarea>
                </div>
            </div>
        </div>
        <div class="column is-one-quarter"></div>
    </div>

    <div class="columns">
        <div class="column is-one-number"></div>
        <div class="column is-half">
            <button class="button is-primary is-rounded" onclick="uploadClick();">UPLOAD</button>
        </div>
    </div>
</body>

</html>
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