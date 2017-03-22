'use strict'
// 작성: 2017.03.09 김재녕
// 수정: 2017.03.21 김재녕

//Initialize Swiper - 게시글
var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  spaceBetween: 11,
  slidesPerView: 4,
  scrollbar: '.swiper-scrollbar',
  scrollbarHide: false,
  scrollbarDraggable: true,
  scrollbarSnapOnRelease: true,
  grabCursor: true  
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
		pDate.append(fDate);
		
		// 확정 장소
		var pLoc = $("#final-loc");
		var fLoc = JSON.parse(meeting).location;
		if (fLoc == null) {
			fLoc = "";
		}
		pLoc.append(fLoc);
		
		// 확정 시간
		var pTime = $("#final-time");
		var fTime = JSON.parse(meeting).time;
		if (fTime == null) {
			fTime = "";
		}
		pTime.append(fTime);
		
		// 모임 설명(내용)
		var pCont = $("#final-cont");
		var fCont = JSON.parse(meeting).content;
		if (fCont == null) {
			fCont = "";
		}
		pCont.append(fCont);
		
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
			  $('.swiper-container').css('display', 'none');
			  $('#BoarddataNotFound').show();
			  return false;
		  }
		  
		  var meetBoardList = ajaxResult.data;
		  var div = $(".swiper-wrapper");
		  var boardTemplate = Handlebars.compile($("#boardTemplate").html());
		
		  div.append(boardTemplate({"meetBoardList":meetBoardList}));
		  mySwiper.init();
		});
	});
	
} catch (e) {
	
} finally {
	
}

// 게시글 클릭
$('body').on('click', '.swiper-slide', function() {
	console.log('swipe slide click OK');
	console.log(mySwiper.clickedSlide);
	if (mySwiper.clickedSlide != undefined) {
		
	}
});

// 멤버 전체보기 버튼 클릭 이벤트
$(function() {
  $('#btn_toggle_member_list').on('click', function() {
	  if ($(this).text() == "전체보기") {
		  $(this).text("닫기");
	  } else {
		  $(this).text("전체보기");
	  }
    $('.member_list_wrap').toggleClass('on');
  });
});

// 게시판 검색 버튼 클릭 이벤트
$('.board .search-btn').on('click', function(e) {
	e.preventDefault();	
	var keyWord = $('.search-keyword').val();
	
	$.getJSON("../detail/keywordBoardList.json?meetingNo=" + meetingNo + "&keyWord=" + keyWord, function(ajaxResult) {
	  var status = ajaxResult.status;
	  if (status != "success") {
		  mySwiper.init();
		  $('.swiper-container').css('display', 'none');
		  $(".swiper-wrapper").empty();
		  $('#BoarddataNotFound').show();
		  return false;
	  }
	  
	  $('#BoarddataNotFound').css('display', 'none');
	  $(".swiper-wrapper").empty();
	  $('.swiper-container').show();
	  var div = $(".swiper-wrapper");
	  var boardTemplate = Handlebars.compile($("#boardTemplate").html());
	  var meetBoardList = ajaxResult.data;
	  
	  div.append(boardTemplate({"meetBoardList":meetBoardList}));
	  mySwiper.init();
	});
});
