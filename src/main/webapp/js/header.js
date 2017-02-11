$(function() {
  $("#logout").click(function() {
    if($("#userpopup").css("display") == "none") {
      $("#userpopup").show();
    } else {
      $("#userpopup").hide();
    }
  });
})
