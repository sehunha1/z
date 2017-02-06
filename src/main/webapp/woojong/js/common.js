$( function() {
	// header.html을 가져와서 붙인다.
	$.get('../header.html', function(result) {
      $('#header').html(result);
	});
    
	$.get('../schedule/header-sc.html', function(result) {
	      $('#header-sc').html(result);
		});
	
	// sidebar.html을 가져와서 붙인다.
	$.get('../sidebar.html', function(result) {
	  $('#sidebar').html(result);
	});
	
	// footer.html을 가져와서 붙인다.
	$.get('../footer.html', function(result) {
	  $('#footer').html(result);
	});
	
	$.get('../meet/maplist.html', function(result) {
	  $('#maplist').html(result);
	});
});





