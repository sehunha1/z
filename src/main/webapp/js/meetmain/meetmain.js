$(function() {
  $.get("../../html/header.html", function(result) {
    $("#header").html(result);
  })
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  });
  
  $.get("../../html/sidebar.html", function(result) {
	    $("#sidebar").html(result);
  });
})
