"use strict"
// 작성: 2017.03.06 김재녕


//Initialize Swiper - 게시글
var swiper = new Swiper('.board .swiper-container', {
	initialSlide: 0,
	pagination : '.board .swiper-pagination', // 페이징 추가할 위치 지정
	slidesPerView : 4, // 한번에 보이는 슬라이드 갯수
	centeredSlides : false, //  
	paginationClickable : true, // 페이지 클릭 가능 여부
	spaceBetween : 30
});

try {
	var memberNo = location.href.split('?')[1].split('=')[1].split('&')[0];
	var meetingNo = location.href.split('?')[1].split('=')[2];
	
	$.getJSON(serverRoot + '/html/detail/detailMeet.json?memberNo=' + memberNo + '&meetingNo=' + meetingNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		var detailMembList;
		
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
		$(".title-photo").attr('src', clientRoot + '/html/upload/' + photo);
		
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
		  window.detailMembList = ajaxResult.data;
		  for (var i = 0; i < window.detailMembList.length; i++) {
		    if (window.detailMembList[i].photo.length < 2)
		    	window.detailMembList[i].photo = "../../image/profile-default.png";
		  }
		  
		  var ul = $(".member_list");
		  var membTemplate = Handlebars.compile($("#membTemplate").html());
		  ul.append(membTemplate({"detailMembList":window.detailMembList}));
		});
		
		// 게시판
		
		$.getJSON("../detail/meetBoardList.json?meetingNo=" + meetingNo, function(ajaxResult) {
		  var status = ajaxResult.status;
		  if (status != "success") {
			  return;
		  }
		  var div = $(".swiper-wrapper");
		  var boardTemplate = Handlebars.compile($("#boardTemplate").html());
		  
		  var meetBoardList = ajaxResult.data;
		  div.append(boardTemplate({"meetBoardList":meetBoardList}));
		  swiper.onResize();
		});
	});
	
} catch (e) {
	
} finally {
	
}

// 멤버 전체보기 버튼 클릭 이벤트
$(function() {
  $('#btn_toggle_member_list').on('click', function() {
    $('.member_list_wrap').toggleClass('on');
  });
});

// 게시판 검색 버튼 클릭 이벤트
$('.board .search-btn').on('click', function(e) {
	e.preventDefault();	
	$(".swiper-wrapper").empty();
	var keyWord = $('.search-keyword').val();
	
	$.getJSON("../detail/keywordBoardList.json?meetingNo=" + meetingNo + "&keyWord=" + keyWord, function(ajaxResult) {
	  var status = ajaxResult.status;
	  if (status != "success") {
		  return;
	  }
	  
	  var div = $(".swiper-wrapper");
	  var boardTemplate = Handlebars.compile($("#boardTemplate").html());
	  var meetBoardList = ajaxResult.data;
	  console.log(ajaxResult.data);
	  div.append(boardTemplate({"meetBoardList":meetBoardList}));
	  
	  swiper.onResize();
	});
	
});
