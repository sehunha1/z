$('#photo').fileupload({
    url: '../../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#photo-path').val(data.result.data[0]);
    }
});

$('#add-btn').click(function() {
	
	var param = {
			"email": $('#email').val(),
			"name": $('#names').val(),
			"password": $('#password').val(),
			"photo": $('#photo-path').val()
			//"photo": $("#photo").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]))
			//"photo": $("#photo").attr('src', 'html/upload/' + val())
	
	};

	$.post('add.json', param, function(ajaxResult) {
		if (ajaxResult.status == "fail") {
			sweetAlert("회원가입 실패", ajaxResult.data, 'error');
			return;
		}
		//sweetAlert("회원가입 완료!", "......", "success")
		//sweetAlert("회원가입 완료!", "로그인창으로 이동합니다.", "success");
		//alert('회원가입이 완료되었습니다. 로그인창으로 이동합니다.');
		//location.href = 'login.html';
		
		swal({
			  title: "회원가입 완료!",
			  text: "로그인 창으로 이동합니다.",
			  type: "success",
			},
			function(){
			  location.href ='login.html'
			});
		
		
		
	}, 'json'); // post();

}); // click() 
