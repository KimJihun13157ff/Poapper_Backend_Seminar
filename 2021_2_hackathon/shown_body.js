module.exports = {
    HTML:function(user_id, answer, num){
      return `
      <div class="columns is-centered is-vcentered">
      <div class="column is-2 has-text-centered"></div>
      <div class="column is-8" id="answered_hw">
          <article class="message is-dark">
              <div class="message-header">
                <p id="uploader1">${user_id}</p>
                <div>
                <button class="button is-success" onclick="likeClick(${num});">
                  <span class="icon is-small">
                    <i class="fas fa-thumbs-up"></i>
                  </span>
                </button>
                <button class="button is-danger" onclick="dislikeClick(${num});">
                  <span class="icon is-small">
                    <i class="fas fa-thumbs-down"></i>
                  </span>
                </button>
                </div>
              </div>
              <div class="message-body" id="msg_text">
                  ${answer}
              </div>
          </article>
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