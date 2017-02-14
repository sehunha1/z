$(function() {
    //헤더와 풋터 갖다붙이기
  $.get("../../html/header.html", function(result) {
    $("#header").html(result);
  })
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  })
  
    //헤더안의 유저프로필 클릭이벤트 발생
  $("body").on("click", "#logout", function() {
    if($("#userpopup").css("display") == "none") {
      $("#userpopup").show();
    }
  })
  $("body").on("click", function(e) {
    var target = $(e.target);
    if(target.parents("#logout").attr("id") !== "logout" && target.attr("class") !== "_layer") {
      $("#userpopup").hide();
    }
  })
  $("body").on("click", "#login", function(e) {
    e.preventDefault();
    $('#popup').bPopup();
  })
  $("body").on("click", "#login_btn", function(e) {
    location.href = "main.html";
  })
  
  $("body").on("click", "#href_mylist", function(e) {
    e.preventDefault();
    location.href = "../mylist/mylist.html";
  })
  $("body").on("click", "#href_out", function(e) {
    e.preventDefault();
    location.href = "../main/main_not_login.html";
  })
  $("body").on("click", "#new-btn", function(e) {
    e.preventDefault();
    location.href = "write2.html";
  });
})
