$('#submit-btn').click(function() {
	var param = {
		email: $('#email').val(),
		password: $('#password').val()
		//userType: $('input[name=user-type]:checked').val()
	};
	
	$.post('login.json', param, function(ajaxResult) {
		if (ajaxResult.status == "success") {
			location.href = "../main/main.html";	
			return;
		}
		alert(ajaxResult.data);
	}, 'json');
	
}); // click()

/*
$('#submit-btn').click(function() {
	var param = {
		email: $('#email').val(),
		password: $('#password').val()
		//userType: $('input[name=user-type]:checked').val()
	};
	
	$.post('login.json', param, function(ajaxResult) {
		if (ajaxResult.status == "success") {
			location.href = "afterlogin.html";	
			return;
		}
		alert(ajaxResult.data);
	}, 'json');
	
}); // click()
*/








