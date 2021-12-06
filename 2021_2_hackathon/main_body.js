module.exports = {
    HTML:function(subject, assign, count, number){
      return `
      <div class="columns is-centered">
      <div class="column is-2"></div>
      <div class="column is-8 box" id="answered_hw" onclick="hwClick(${number})">
          <h1 class="title" id="subject${number}">${subject}</h1>  <h1 class="title" id="assign${number}">${assign}</h1>
          <h2 class="subtitle">Entered Answers: ${count}</h2>
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