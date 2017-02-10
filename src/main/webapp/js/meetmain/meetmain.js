$(function() {
  $.get("../../html/header-login.html", function(result) {
	    $("#header-login").html(result);
  });
  
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  });
  
  $.get("../../html/sidebar.html", function(result) {
	    $("#sidebar").html(result);
  });
})
