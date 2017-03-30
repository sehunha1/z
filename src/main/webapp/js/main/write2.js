"use strict";
// 모임 생성시 설정화면
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
$('body').on('click', '#Go-btn', function(e) {
	e.preventDefault();

	// 데이터 입력 여부 확인
	if ($('#play-title').val().trim() == "") {
		sweetAlert("실패", "모임명을 입력하세요.", "error");
		return;
	} else if ($('#meeting-desc').val().trim() == "") {
		sweetAlert("실패", "모임 분류를 선택하세요.", "error");
		return;
	} else if ($('#limit-date').val().trim() == "") {
		sweetAlert("실패", "투표 종료일을 선택하세요.", "error");
		return;
	} else if ($('#possible-date').val().trim() == "") {
		sweetAlert("실패", "모임일정 선택가능 기간을 선택하세요.", "error");
		return;
	}
	
	// 모임일정 선택가능 기간
	var dateList = $('#possible-date').val().split(" to ");
	// 사진
	var $photoImgData = $('#photo-path').val();
	if($('#photo-path').val() == "") {
		if ($('#meeting-desc').val() == "스터디") {
			console.log('스터디');
			$('#photo-path').val('study.jpg');
		} else if ($('#meeting-desc').val() == "친목") {
			console.log('친목');
			$('#photo-path').val('friendship.jpg');
		} else if ($('#meeting-desc').val() == "회식") {
			console.log('회식');
			$('#photo-path').val('alcohol.jpg');
		} else if ($('#meeting-desc').val() == "동창회") {
			console.log('동창회');
			$('#photo-path').val('alumni.jpg');
		} else {
			console.log('기타');
			$('#photo-path').val('etc.jpg');
		}
	}

	var param = {
		"title" : $('#play-title').val(),
		"category" : $('#meeting-desc').val(),
		"deadline" : $('#limit-date').val(),
		"sdate" : dateList[0],
		"edate" : dateList[1],
		"content" : $('#meeting-content').val(),
		"photo" : $('#photo-path').val()
	}
	
	// 모임 개설 및 데이터 삽입
	$.post(serverRoot + '/html/meeting/add.json', param,function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		
		swal({
			title: "성공",
			text: "개설하였습니다",
			type: "success",
		},
		function(){
				location.href = '../meetmain/meetmain.html'
					+ '?memberNo='
					+ JSON.parse(meeting).meetBossNo
					+ '&meetingNo='
					+ JSON.parse(meeting).meetingNo;
			}, 'json');
		});
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
		var img = $('#photo-img');
		if (data.index == 0) {
			var canvas = data.files[0].preview;
			var dataURL = canvas.toDataURL();
			img.attr('src', dataURL).css('width', '100px');
			$('#photo-label').css('display', '');
		}
	}
});
