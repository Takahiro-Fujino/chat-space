$(function() {

var search_list = $("#user-search-result");
var chat_member_list = $("#chat-group-users");

function appendUser(user) {
  var html =`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html =`<li>
              <div class='chat-group-user clearfix'>${ user }</div>
             </li>`
  search_list.append(html);
}

function appendChatMemberUser(name, id) {
  var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    chat_member_list.append(html);
}

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    if(input !== ""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })

      .fail(function() {
      alert('ユーザー検索に失敗しました');
      });
    };
  });

  $(document).on("click", ".user-search-add",function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    appendChatMemberUser(name, id)
  })

  $(document).on("click", ".js-remove-btn",function(){
    $("#chat-group-user-8").remove()
  })
});
