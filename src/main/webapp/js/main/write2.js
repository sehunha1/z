"use strict";
// 모임 생성시 설정화면 javaScript
// 작성: 2017.02.19 김재녕

// 모임명 확인
try {
	var preTitle = decodeURIComponent(location.href.split('?')[1].split('=')[1]);
} catch (error) {
	var preTitle = "";
}

if (preTitle != "") {
	$('#play-title').val(preTitle);
}

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
		"title" : $('#play-title').val(),
		"category" : $('#meeting-desc').val(),
		"deadline" : $('#limit-date').val(),
		"sdate" : dateList[0],
		"edate" : dateList[1],
		"content" : $('#meeting-content').val(),
		"photo" : $('#photo-path').val()
	}

	$.post(serverRoot + '/html/meeting/add.json', param,function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		location.href = '../meetmain/meetmain.html'
				+ '?memberNo='
				+ JSON.parse(meeting).meetBossNo
				+ '&meetingNo='
				+ JSON.parse(meeting).meetingNo;
	}, 'json');

});

// 이미지 선택 시 파일 업로드
$('#photo').fileupload({
	url : serverRoot + '/common/fileupload.json',
	dataType : 'json',
	sequentialUploads : true,
	singleFileUploads : false,
	autoUpload : true,
	disableImageResize : /Android(?!.*Chrome)|Opera/
			.test(window.navigator && navigator.userAgent),
	previewMaxWidth : 60,
	previewMaxHeight : 60,
	previewCrop : true,
	done : function(e, data) {
		$('#photo-path').val(data.result.data[0]);
	},
	processalways : function(e, data) {
/*		console.log('fileuploadprocessalways()...', data.files.length,
				data.index);*/
		var img = $('#photo-img');
		if (data.index == 0) {
			var canvas = data.files[0].preview;
			var dataURL = canvas.toDataURL();
			/*console.log(canvas);*/
			img.attr('src', dataURL).css('width', '100px');
			$('#photo-label').css('display', '');
		}
	}
});
