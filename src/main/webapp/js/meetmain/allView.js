'use strict'
// 작성: 2017.03.25 김재녕
// 내용: 모아보기 팝업


$('body').on('click', '#allViewBtn', function() {
	getBossYn();
//	getTotalList();
});

// 모아보기 - 총 리스트 가져오기
function getTotalList() {
	
}

// 방장여부 확인 후 확정 버튼 활성화
function getBossYn() {
	
	// 방장여부 결정 변수
	var bossTrue = false;
	
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


try {
	
} catch(e) {
	
}