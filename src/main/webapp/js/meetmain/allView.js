'use strict'
// 작성: 2017.03.25 김재녕
// 내용: 모아보기 팝업

// 모임 번호
var meetingNo = location.href.split('?')[1].split('&')[1].split('=')[1].replace('#','');
// 선택 날짜 목록
var selectDateList = new Array();
// 선택 장소 목록
var selectLocList = new Array();
// 방장여부 결정 변수
var bossTrue = false;

// 모아보기 버튼 클릭 이벤트
$('body').on('click', '#allViewBtn', function() {
	$.ajaxSetup({ async:false }); // 동기처리
	getBossYn(); // 버튼 활성화
	getTotalList(); // 날짜, 장소 목록 가져오기
});

// 확정 버튼 클릭 이벤트
$('body').on('click', '#allViewConfirm-btn', function(e) {
	e.preventDefault();
	if (dateSend() == false) {
		return false;
	} else if (locSend() == false) {
		return false;
	}
	
	finalDataUpdate(); // 최종 확정 처리
});

// 날짜 처리
function dateSend() {
	var $dateOK = $('input[name=dateSelector]:checked').val();
	if ($dateOK == undefined) {
		sweetAlert("실패", "확정 날짜를 선택하세요.", "error");
		return false;
	}
	return true;
}
// 장소 처리
function locSend() {
	var $locOk = $('input[name=locSelector]:checked').val();
	if ($locOk == undefined) {
		sweetAlert("실패", "확정 장소를 선택하세요.", "error");
		return false;
	}
	return true;
}

// 최종 모임 확정
function finalDataUpdate() {
	// 날짜, 시간, 주소, 상호명
	var $finalDate = $('input[name=dateSelector]:checked').parents().children('.calDate').text();
	var $finalTime = $('input[name=dateSelector]:checked').parents().children('.calTime').text();
	var $finalLocAddr = $('input[name=locSelector]:checked').parents().children('.address').text();
	var $finalLocPlace = $('input[name=locSelector]:checked').parents().children('.place').text();
	var loc = '[' + $finalLocPlace + '] ' + $finalLocAddr; // 상호명 + 주소
	
    var param = {
        "cal" : $finalDate,
        "time" : $finalTime,
        "loc" : loc
    };
	
	// 모임일정 최종 확정 처리 html/detail/updateMstatFin
    $.post("../detail/updateMstatFin.json?meetingNo=" + meetingNo, param, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
        swal("성공!", "확정되었습니다.", "success")
		location.href = serverRoot + '/html/mylist/mylist.html';
	}, 'json');
}

// 모아보기 - 총 리스트 가져오기
function getTotalList() {
	
	// 선택 날짜 목록
	$.getJSON(serverRoot + '/html/meetmain/getSelectDate.json?meetingNo=' + meetingNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		selectDateList = ajaxResult.data.selectedDateInfo;

		var $dateUl = $("#dateUl");
		$dateUl.empty();
		var dateTemplate = Handlebars.compile($("#dateListTemple").html());
		$dateUl.append(dateTemplate({"selectDateList" : selectDateList}));
	});
	
	// 선택 장소 목록
	$.getJSON('placelist.json?meetingNo=' + meetingNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		selectLocList = ajaxResult.data;
		
		var $locUl = $("#locUl");
		$locUl.empty();
		var locTemplate = Handlebars.compile($("#locListTemple").html());
		$locUl.append(locTemplate({"selectLocList" : selectLocList}));
	});
	
	if (bossTrue == true) {
		$('.check').show();
		$(".bossView").attr('disabled', false);
	}
}

// 방장여부 확인 후 확정 버튼 활성화
function getBossYn() {
	
	$.getJSON("listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") return;

        var listMeetingMembBoss = ajaxResult.data;
        
        // 로그인 유저 == 방장
        var sessionMemb = window.sessionStorage.getItem("member");
        if (listMeetingMembBoss[0].memberNo == JSON.parse(sessionMemb).memberNo) {
        	bossTrue = true;
        }
        
        // 확정 버튼 활성화
        if (bossTrue == true) {
        	$('#allViewConfirm-btn').show();
        }
    });
}
