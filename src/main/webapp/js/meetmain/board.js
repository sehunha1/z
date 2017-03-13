$.getJSON('list.json', function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success")
	  return;
  
  var list = ajaxResult.data;
  var tbody = $('#list-table > tbody');
  
  for (var board of list) {
	  $("<tr>")
	  	.html("<td>" + 
		    board.memberNo + "</td><td><a class='name-link' href='#' data-no='" + 
		    board.title + "'>" + 
		    board.content + "</a></td><td>" )
		.appendTo(tbody);
  }
  
	$.getJSON('html/meetmain/list.json', function(ajaxResult) {
	  var status = ajaxResult.status;
	    
	  if (status != "success")
	      return;
	  
	  var list = ajaxResult.data;
	  console.log(list);
	  var parent = $('#nextlist');
	  var template = Handlebars.compile($('#trTemplate').html());
	  var div
	  for(var i = 0; i < list.length; i++){
	    if(i % 3 == 0) {
	      div = $("<div>").addClass('row')
	      parent.append(div);
	    }
	    div.append(template(list[i]));
	  }
	});
});
