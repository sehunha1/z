$(function() {
  $.get("../../html/header.html", function(result) {
    $("#header").html(result);
  })
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  });
})