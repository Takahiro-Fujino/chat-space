$(function(){
  function buildHTML(message){
    if(message.image !== null)
       var image = `<img class="lower-message__image" src="${message.image}" >`
    else
       var image = ``

    var html = `<div class="message" >
      <div class="upper-message" >
        <div class="upper-message__user-name">${message.name}</div>
        <div class="upper-message__date">${message.strftime}</div>
      </div>
      <div class="lowwer-message" >
        <p class="lower-message__content">${message.content}</p>
         ${image}
      </div>
    </div>`
  return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .always(function(){
      $('input').prop("disabled", false);
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
  })
});
