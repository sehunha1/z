"use strict"
// 작성: 2017.03.06 김재녕

// Initialize Swiper - 멤버
var swiper = new Swiper('.member .swiper-container', {
	pagination : '.member .swiper-pagination',
	slidesPerView : 6,
	centeredSlides : false,
	paginationClickable : true,
	spaceBetween : 30
});

// Initialize Swiper - 게시글
var swiper = new Swiper('.board .swiper-container', {
	pagination : '.board .swiper-pagination',
	slidesPerView : 4,
	centeredSlides : false,
	paginationClickable : true,
	spaceBetween : 10
});

try {
	var mtNo = location.href.split('?')[1].split('=')[1];
	
	$.getJSON(serverRoot + '/html/detail/detailMeet.json?meetingNo=' + mtNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		
		// 모임 상태
		if (ajaxResult.data.meetStat == "ing") {
			$(".stat-span").append("진행중");
		} else if (ajaxResult.data.meetStat == "wait") {
			$(".stat-span").append("확정대기");
		} else if (ajaxResult.data.meetStat == "fin") {
			$(".stat-span").append("완료");
		} else {
			$(".stat-span").append("에러");
		}
		
		// 모임 이미지
		var photo = JSON.parse(meeting).photo;
		$(".title-photo").attr('src', clientRoot + '/html/upload/' + ajaxResult.data.photo);
		
		// 모임명
		var h1Titl = $("#meeting-title");
		var titl = JSON.parse(meeting).title;
		h1Titl.append(titl);
		
		// 확정 날짜
		var pDate = $("#final-date");
		var fDate = JSON.parse(meeting).date;
		pDate.append("확정 날짜: " + fDate);
		
		// 확정 장소
		var pLoc = $("#final-loc");
		var floc = JSON.parse(meeting).location;
		pLoc.append("확정 장소: " + floc);
		
		// 확정 시간
		var pTime = $("#final-time");
		var fTime = JSON.parse(meeting).time;
		pTime.append("확정 시간: " + fTime);
		
		// 모임 설명(내용)
		var pCont = $("#final-cont");
		var fCont = JSON.parse(meeting).content;
		pCont.append("모임 설명: " + fCont);
	});
	
} catch (e) {
	
} finally {
	
}
