"use strict";
// 모임 생성시 설정화면 javaScript
// 작성: 2017.02.19 김재녕

// GO 버튼 클릭시 데이터 저장 후 페이지 이동
$("#Go-btn").click(function(e) {
	e.preventDefault();
	
	// 데이터 입력 여부 확인
	if ($('#play-title').val().trim() == "") {
		alert('모임명을 입력하세요.');
		return;
	} else if ($('#meeting-desc').val().trim() == "") {
		alert('모임 분류를 선택하세요.');
		return;
	} else if ($('#limit-date').val().trim() == "") {
		alert('투표 마감일을 선택하세요.');
		return;
	} else if ($('#possible-date').val().trim() == "") {
		alert('투표 가능 기간을 선택하세요.');
		return;
	}
	
	var dateList = $('#possible-date').val().split(" to ");
	
    var param = {
        "title": $('#play-title').val(),
	    "category": $('#meeting-desc').val(),
	    "deadline": $('#limit-date').val(),
	    "sdate": dateList[0],
	    "edate": dateList[1],
	    "content": $('#meeting-content').val(),
	    "photo": $('#photo-path').val()
    }
    
    /*console.log(param);*/
    $.post(serverRoot + '/meeting/add.json', param, function(ajaxResult) {
        if (ajaxResult.status != "success") {
          alert(ajaxResult.data);
          return;
        }
        location.href = '../meetmain/meetmain.html';
    }, 'json');

});

/*
// 이미지 선택 시 파일 업로드
$('#meet-photo').fileupload({
    url: serverRoot + '/common/fileupload.json' // 서버에 요청할 URL
    
    dataType: 'json',
    sequentialUploads: true,
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,
    previewMaxHeight: 800, 
    previewCrop: true, 
    done: function (e, data) {
		console.log('done()...');
		console.log(data.result);
	    $('#photo-path').val(data.result.data[0]);
    },
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '100px');
	        $('#photo-label').css('display', '');
        }
    }
});*/

// 모임 이미지 업로드
/*$(document).ready(function(){
    var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        if(window.FileReader){
            // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 
        else {
            // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload-name').val(filename);
    });

	var imgTarget = $('.preview-image .upload-hidden');
	
	imgTarget.on('change', function(){
		var parent = $(this).parent();
		parent.children('.upload-display').remove();
		
		if(window.FileReader){ //image 파일만 
			
			if (!$(this)[0].files[0].type.match(/image\//)) return;
			
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				parent.prepend(
						'<div class="upload-display">'
					  + '<div class="upload-thumb-wrap">'
					  + '<img src="'+src+'" class="upload-thumb">'
					  + '</div></div>'); 
				} 
			reader.readAsDataURL($(this)[0].files[0]);
		} 
		else { 
			$(this)[0].select();
			$(this)[0].blur();
			var imgSrc = document.selection.createRange().text;
			parent.prepend(
					'<div class="upload-display">'
					+ '<div class="upload-thumb-wrap">'
					+ '<img class="upload-thumb">'
					+ '</div></div>');
			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
	    }
	});
});*/
