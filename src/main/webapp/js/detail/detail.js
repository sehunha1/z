'use strict'
// 작성: 2017.03.09 김재녕
// 수정: 2017.03.23 김재녕

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
    var sessionMemberNo = JSON.parse(window.sessionStorage.getItem("member")).memberNo;

    if (memberNo != sessionMemberNo) {
        swal({title: "잘못된 접근입니다.",
            text: "1초후 내모임리스트로 이동합니다.",
            timer: 1000,
            showConfirmButton: false}, function(e) {
            location.href = "../mylist/mylist.html";
        });
    }

    $.getJSON("../isMeeting.json?memberNo=" + sessionMemberNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") return;
        var meetingNos = ajaxResult.data;

        for (var i = 0; i < meetingNos.length; i++) {
            if (meetingNo == meetingNos[i]) {
                return;
            }
        }

        swal({title: "잘못된 접근입니다.",
            text: "1초후 내모임리스트로 이동합니다.",
            timer: 1000,
            showConfirmButton: false}, function(e) {
            location.href = "../mylist/mylist.html";
        });
    });

    $.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") return;
        var oneMeeting = ajaxResult.data;

        if (oneMeeting.meetStat !== "fin") {
            swal({title: "일정확정된 모임이 아닙니다.",
                text: "1초후 내모임리스트로 이동합니다.",
                timer: 1000,
                showConfirmButton: false}, function(e) {
                location.href = "../mylist/mylist.html";
            });
        };
    });
	
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
		  
		  var ul = $(".member_list");
		  var membTemplate = Handlebars.compile($("#membTemplate").html());
		  ul.append(membTemplate({"detailMembList":window.detailMembList}));
		});
		
		// 게시판
		getBoardList();
		
	});
	
} catch (e) {
	
} finally {
	
}

// 게시판 초기화
function getBoardList() {
	$.getJSON("../detail/meetBoardList.json?meetingNo=" + meetingNo, function(ajaxResult) {
	  var status = ajaxResult.status;
	  
	  // 실패
	  if (status != "success") {
		  $('.swiper-container').css('display', 'none');
		  $('#BoarddataNotFound').show();
		  	return false;
	  }
	  
	  // 성공
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

// 해당 게시글 클릭 이벤트
$('body').on('click', '.swiper-slide', function() {
	// 상세 팝업 초기화
	dBoardPopInit();
	
	// 선택 게시글 번호
	var bnumber = parseInt($(mySwiper.clickedSlide).find('#boardNum').text());

	if (bnumber != undefined) {
		
		// 게시글 상세 팝업 열기
        $.getJSON('../meetmain/detail.json?bnum=' + bnumber, function(ajaxResult) {
	        if (ajaxResult.status == "fail") {
	          return;
	        }
	        
	        var detail = ajaxResult.data;
	        $('#detail_title').val(detail.title);
	        $('#detail_content').val(detail.content);
	        $('#detail_date').val(detail.boardDate);
	        $('.detail-photo').children().remove();
	        for (var i in detail.addFileList) {
	          $('<input>')
	            .attr('name','input-file-path')
	            .attr('value',detail.addFileList[i].filePath)
	            .css('display','none').appendTo($('.detail-photo'));
	          $('<img>').attr('src','../upload/'+ detail.addFileList[i].filePath).appendTo($('.detail-photo'))
	            .css('width','150px').css('height','100px').css('display','inline-block');
	        }
	    });
        
        // 변경
        $('#update-btn').click(function() {
		    var param = {
		        "boardNo"   : bnumber, 
		        "meetNo"    : meetingNo,
		        "title"     : $('#detail_title').val(),
		        "boarddate" : $('#detail_date').val(),
		        "content"   : $('#detail_content').val()
		    };
	      
		    $.post('../meetmain/update.json', param, function(ajaxResult) {
		      if (ajaxResult.status != "success") {
		        alert(ajaxResult.data);
		        return;
		      }
		      getBoardList(); // 게시판 초기화
		    }, 'json');
        }); 
        
        // 삭제
        $('#delete-btn').click(function() {
        	$.getJSON('../meetmain/delete.json?boardNo='+ bnumber, function(ajaxResult) {
        		if (ajaxResult.status != "success") { 
        			alert(ajaxResult.data);
        			return;
        		}
        		getBoardList(); // 게시판 초기화
        	});
        });
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
	boardPopInit();
});

// 게시판 작성 팝업 초기화
function boardPopInit() {
	$('#titl').val('');
	$('#cont').val('');
	$('#link').val('');
	$('#link-path').val('');
	$('#photo-img').attr('src', '');
	$('#photo-img').css('width', '');
	$('#link-path').val('');
}

// 게시판 수정 팝업 초기화
function dBoardPopInit() {
	$('#detail_title').val('');
	$('#detail_date').val('');
	$('#detail_content').val('');
	$('#detail-photo-img').attr('src', '');
}

//게시판 작성 사진 업로드
var filenamelist = new Array();

$('#link').fileupload({
 url: '../../common/fileupload.json',
 dataType: 'json',
 sequentialUploads: true,
 singleFileUploads: false,
 autoUpload: true,
 disableImageResize: /Android(?!.*Chrome)|Opera/
     .test(window.navigator && navigator.userAgent),
 previewMaxWidth: 800,
 previewMaxHeight: 800, 
 previewCrop: true,
 done: function (e, data) {
   filenamelist = data.result.data;
     $('#link-path').val(data.result.data[0]);
 },
 processalways: function(e, data) {
     var img = $('#photo-img');
     if (data.index == 0) {
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
		
		// 팝업시 파일 미선택 처리
		if ($('#link-path').val() == '') {
			filenamelist.splice(0);
		}
		
	    var param = {
		    "memberNo": memberNo,
		    "meetNo": meetingNo,
		    "title": $('#titl').val(),
		    "content": $('#cont').val(),
		    "addFileList": arrayToJson(filenamelist)
		};
	    
	    $.post('../meetmain/add.json', param, function(ajaxResult) {
          
	    	if (ajaxResult.status != "success") {
	    		return;
	    	}
	      
	        var params = {
	            "link": $('#link-path').val(),
	            "type": 'jpg'
	        }
          
            $.post('../meetmain/file.json', params, function(ajaxResult) {
    	        if (ajaxResult.status != "success") {
   	                return;
   	            }
            });
	        boardPopInit(); // 게시글 팝업 초기화
	        getBoardList(); // 게시글 정보 가져오기
        }, 'json');
	    
	    // 게시판 갱신
	    setTimeout(function() {
	    	$.ajax(getBoardList());
	    }, 4500);
	    
	} else {
		alert('입력 값을 확인하세요.');
	}
});

// 뒤로 버튼 클릭 이벤트
$("#btn_back").on("click", function(e) {
	e.preventDefault();
	location.href = "../mylist/mylist.html";
});

// 게시판 팝업 - 다운로드 클릭 이벤트
$('#download').click(function() {
	 var url = $('.detail-photo').children('img');
	 var a = $("<a>")
	    .appendTo("body");
	 console.log(url);
	   for (var i=0; i < url.length; i++) {
		 a.attr('href',url.eq(i).attr('src'))
		 a.attr("download", "img"+i+".png")
	   a[0].click();
	  }
	a.remove();
});
