$(function() {
  $.get("../../html/header.html", function(result) {
    $("#header").html(result);
  })
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  });
})

function view(opt) {
  var timer;
  
  if (opt) {
    userpopup.style.display = "block";
    clearTimeout(timer);
    
  } else {
    timer = setTimeout(function() {
      userpopup.style.display = "none";
    }, 3000);
  }
}


int a;

if (c == 2) {
  a = b();
}