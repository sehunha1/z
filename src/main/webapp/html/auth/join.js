$('#add-btn').click(function() {
	var param = {
			"email": $('#email').val(),
			"name": $('#names').val(),
			"password": $('#password').val(),
			"photo": $('#photo').val()
	};

	$.post('add.json', param, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		sweetAlert("회원가입 완료!", "......", "success")
		//sweetAlert("회원가입 완료!", "로그인창으로 이동합니다.", "success");
		//alert('회원가입이 완료되었습니다. 로그인창으로 이동합니다.');
		//location.href = 'login.html';
	}, 'json'); // post();

}); // click() 



