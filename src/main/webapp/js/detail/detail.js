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
	var memberNo = location.href.split('?')[1].split('=')[1].split('&')[0];
	var meetingNo = location.href.split('?')[1].split('=')[2];
	
	$.getJSON(serverRoot + '/html/detail/detailMeet.json?memberNo=' + memberNo + '&meetingNo=' + meetingNo, function(ajaxResult) {
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
		if (titl == null) {
			titl = "";
		}
		h1Titl.append(titl);
		
		// 확정 날짜
		var pDate = $("#final-date");
		var fDate = JSON.parse(meeting).date;
		if (fDate == null) {
			fDate = "";
		}
		pDate.append("확정 날짜: " + fDate);
		
		// 확정 장소
		var pLoc = $("#final-loc");
		var fLoc = JSON.parse(meeting).location;
		if (fLoc == null) {
			fLoc = "";
		}
		pLoc.append("확정 장소: " + fLoc);
		
		// 확정 시간
		var pTime = $("#final-time");
		var fTime = JSON.parse(meeting).time;
		if (fTime == null) {
			fTime = "";
		}
		pTime.append("확정 시간: " + fTime);
		
		// 모임 설명(내용)
		var pCont = $("#final-cont");
		var fCont = JSON.parse(meeting).content;
		if (fCont == null) {
			fCont = "";
		}
		pCont.append("모임 설명: " + fCont);
		
		// 모임 멤버
		$.getJSON("../detail/detailMeetList.json?meetingNo=" + meetingNo, function(ajaxResult) {
		  var status = ajaxResult.status;
		  if (status != "success") {
			  return;
		  }
		  var detailMembList = ajaxResult.data;
		  console.log(ajaxResult.data);
		  for (var i = 0; i < detailMembList.length; i++) {
		    if (detailMembList[i].photo.length < 2)
		    	detailMembList[i].photo = "../../image/profile-default.png";
		  }

		  var template = Handlebars.compile($("#bossTemplate").html());
		  var ul = $(".member_list");
		  ul.append(template({"detailMembList":detailMembList}));

/*		  $.getJSON("../meetmain/listMeetingMembNotBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
		    var status = ajaxResult.status;
		    if (status != "success") return;
		    var listMeetingMembNotBoss = ajaxResult.data;
		    for (var i = 0; i < listMeetingMembNotBoss.length; i++) {
		      if (listMeetingMembNotBoss[i].photo.length < 2)
		        listMeetingMembNotBoss[i].photo = "../../image/profile-default.png";
		    }

		    var template = Handlebars.compile($("#notbossTemplate").html());
		    var ul = $(".member_list");
		    ul.append(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
		  });*/
		});
		
	});
	
} catch (e) {
	
} finally {
	
}
