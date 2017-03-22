$("#email").keypress(function(event) {
	if(event.which==13) {
		$('#btn').click();
		return false;
	}
});

$("#password").keypress(function(event) {
	if(event.which==13) {
		$('#btn').click();
		return false;
	}
});

$('#btn').click(function() {
	var param = {
		email: $('#email').val(),
		password: $('#password').val()
		//userType: $('input[name=user-type]:checked').val()
	};
	
	$.post('login.json', param, function(ajaxResult) {
		if (ajaxResult.status == "success") {
			location.href = "../main/main.html";
			 $.cookie('check', 'n', {path : '/'});
			 window.sessionStorage.setItem("member", JSON.stringify(ajaxResult.data));
			return;
		}
		sweetAlert("로그인 실패", ajaxResult.data, "error");
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








