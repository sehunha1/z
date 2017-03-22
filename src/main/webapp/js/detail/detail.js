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
		getBoardList();
/*		$.getJSON("../detail/meetBoardList.json?meetingNo=" + meetingNo, function(ajaxResult) {
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
		});*/
	});
	
} catch (e) {
	
} finally {
	
}

// 게시판 초기화
function getBoardList() {
	$.getJSON("../detail/meetBoardList.json?meetingNo=" + meetingNo, function(ajaxResult) {
	  var status = ajaxResult.status;
	  
	  if (status != "success") {
	  $('.swiper-container').css('display', 'none');
	  $('#BoarddataNotFound').show();
		  return false;
	  }
	  
	  $('#BoarddataNotFound').css('display', 'none');
	  $(".swiper-wrapper").empty();
	  $('.swiper-container').show();
	  var meetBoardList = ajaxResult.data;
	  var div = $(".swiper-wrapper");
	  var boardTemplate = Handlebars.compile($("#boardTemplate").html());
	
	  div.append(boardTemplate({"meetBoardList":meetBoardList}));
	  mySwiper.init();
	});
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
	boardResetSearch();
});

// 게시판 초기화 후 검색
function boardResetSearch() {
	
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
}

// 게시판 작성 버튼 클릭 이벤트
$('body').on('click', '#boardAddBtn', function(e) {
	e.preventDefault();
});

// 게시판 작성 팝업 - 취소 버튼 이벤트
$('body').on('click', '#cancel-btn', function(e) {
	e.preventDefault();
	boardPopInit();
});

// esc 버튼 
$('body').on('keyup', function(e) {
	if (e.which == 27) {
		boardPopInit();
	}
});

// 게시판 작성 팝업 취소
function boardPopInit() {
	$('#titl').val('');
	$('#cont').val('');
	$('#link').val('');
	$('#link-path').val('');
	$('#photo-img').attr('src', '');
}

//게시판 작성 사진 업로드
var filenamelist;

$('#link').fileupload({
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
   filenamelist = data.result.data;
     $('#link-path').val(data.result.data[0]);
     console.log('파일리스트 : ',filenamelist);
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
});

// 파일 list를 JSON 형식으로 변환
var arrayToJson = function(list) {
    var result = '';
    if (list == null) {
      return null;
    }
    for (var i = 0; i < list.length; i++) {
      if (i != 0) {
        result += ',';
      }
      result += list[i];
    }
    result += '';
    return result;
}

// 게시판 작성 팝업 - 저장 버튼 이벤트
$('body').on('click', '#new-btnnn', function(e) {
	e.preventDefault();
	
	if ($('#titl').val() != "" && $('#cont').val() != "") {
		
		var memberNo = JSON.parse(window.sessionStorage.getItem("member")).memberNo;
		var meetingNo = location.href.split('?')[1].split('&')[1].split('=')[1].replace('#','');
		
	    var param = {
		    "memberNo": memberNo,
		    "meetNo": meetingNo,
		    "title": $('#titl').val(),
		    "content": $('#cont').val(),
		    "addFileList": arrayToJson(filenamelist)
		};
	    
	    $.post('../meetmain/add.json', param, function(ajaxResult) {
	    	console.log(ajaxResult);
	    	console.log('test01 success');
          
	    	if (ajaxResult.status != "success") {
	    		return;
	    	}
	      
	        var params = {
	            "link": $('#link-path').val(),
	            "type": 'jpg'
	        }
          
            $.post('../meetmain/file.json', params, function(ajaxResult) {
            	console.log(ajaxResult);
    	    	console.log('test01 success');
    	        if (ajaxResult.status != "success") {
   	                return;
   	            }
            });
	        boardPopInit();
	        getBoardList();
        }, 'json');
	    
	} else {
		alert('입력 값을 확인하세요.');
	}
});


/*$('#boardAddModal').modal({backdrop:'static'});*/


