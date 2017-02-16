$('#add-btn').click(function() {
	var param = {
			"email": $('#email').val(),
			"name": $('#name').val(),
			"password": $('#password').val()
	};

	$.post('add.json', param, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		//location.href = 'main.html';
	}, 'json'); // post();

}); // click() 



