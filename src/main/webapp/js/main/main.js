$.getJSON(serverRoot + '/meetmain/meetmain.json', function(ajaxResult) {
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
