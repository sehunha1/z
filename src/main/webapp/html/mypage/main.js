// 회원 정보 가져옴
$.getJSON('../auth/loginUser.json', function(ajaxResult) {
	var status = ajaxResult.status;

	var member = ajaxResult.data;
	
	$('#memberNo').val(member.memberNo);
	$('#email').val(member.email);
	$('#username1').val(member.name);
	
	$('#now-photo').attr('src', '../upload/' + member.photo);
});

