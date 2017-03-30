//******* 멤버 초대 팝업 *******//
var inputData;
$('body').on('focus', '.add-email-box', function() {
	inputData = $(this);
})

// 모임원 초대 버튼 클릭 이벤트
$('body').on('click', '#memb-plus-btn', function(e) {
	e.preventDefault();
	add_memb();
});

// 초대 버튼 클릭 이벤트
$('body').on('click', '#invite-btn', function(e) {
	e.preventDefault();
	
	// 이메일 유효성 여부
	var sendOk = true;
	
	// 초대 성공시 초기화
	var successReset = true;
	
	$('div').find('.inputMessage').each(function(i, e){
		
		// 빈 문자열 입력 or 경고 문구 출력 시
		if ($(this).text().trim() == "회원이 아닙니다." || $(this).text().trim() == "" || $(this).text().trim() == "이미 초대된 회원입니다.") {
			sweetAlert("실패", "입력한 이메일을 다시 확인해주세요.", "error");
			sendOk = false;
			return false;
		}
	});
	
	// 초대 멤버 데이터 삽입
	if (sendOk) {
		
		$.post(serverRoot + '/html/link/insert.json?meetingNo=' + meetingNo + '&linkMembList=' + linkMembList, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				successReset = false;
				return false;
			}
			
			// 멤버 초대 성공시
			if (successReset) {
				
				// 이메일 전송
//				 var bossEmail = JSON.stringify(window.sessionStorage.getItem("member")).email;

				// 초대 멤버 이메일 목록
				var sendEmailList = memb_add_email(); 
//				console.log(sendEmailList);
				 
//				$.post(serverRoot + '/email/send.json?sendEmailList=' + sendEmailList, function(ajaxResult) {
//					if (ajaxResult.status != "success") {
//						return false;
//					}
//				});
				
				linkMembList.splice(0); // 초대 멤버 데이터 초기화
				closeEvent(); // 팝업 데이터 제거
				$('#membPlusPopup').modal('hide'); // 팝업
				$('.modal-backdrop').remove(); // 팝업 배경
				$.ajax(sideBarLoad()); // 사이드바 갱신
				$('body').css('overflow', 'auto'); // 전체화면 스크롤 재설정
			}
		});
	}
});

// 멤버 초대 박스 이메일 입력시
$('body').on('keyup', '.mail-box-cls', function(e) {
	
	var membNo = null; // 회원 일련번호
	var saveMembNo = true; // 회원 일련번호 저장유무
	
	// 회원유무조회 파라미터 세팅
	var emailAddress = {
		"emailAddress" : inputData.val()
	}
	
	// 해당 박스 안에 메세지박스 선택
	var $inputMessage = $(this).children('.inputMessage');
	
	// 빈 문자열 경우 종료
	if (inputData.val().trim() == "") {
		$inputMessage.empty();
		return;
	}
	
	// 회원 유무 조회
 	$.post(serverRoot + '/html/sidebar/getSideMemb.json', emailAddress, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			$inputMessage.text("회원이 아닙니다.").css("color", "red");
	        return;
	    }
		membNo = ajaxResult.data;
		
		// 초대여부조회 파라미터 세팅
		var param = {
			"memberNo" : membNo,
			"meetingNo" : meetingNo
		};
		
		// 초대 여부 조회
		$.post(serverRoot + '/html/sidebar/getSideLink.json', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
		      $inputMessage.text("이미 초대된 회원입니다.").css("color", "red");
		      return;
			}
			$inputMessage.text("초대 가능한 회원입니다.").css("color", "black");
			
			// 회원 일련번호 배열에 담기
			$.each(linkMembList, function(index, value) {
				if(value == membNo) {
					saveMembNo = false;
				}
			});
			if (saveMembNo) {
				linkMembList.push(Number(membNo));
			}
		});
	});
});

// 멤버 초대 상자 추가
function add_memb() {
   $('<div>').attr('class', 'mail-box-cls').html(
      '<input type="email"' + 'class="add-email-box"'
          + 'placeholder="email을 입력해주세요">'
          + '<button type="button" id="minus-btn"'
          + 'class="btn btn-default"'
          + 'onClick="remove_memb(this)">-</button>'
          + '<div class="inputMessage"></div>').appendTo(
      '#new-field');
}

// 멤버 초대 상자 삭제
function remove_memb(obj) {
	var tempEmail = $(obj).parents('.mail-box-cls').children('.add-email-box').val();
	var emailAddress = {
		"emailAddress" : tempEmail
	}
	
	// MembNo 다시 조회해서 삭제
	$.post(serverRoot + '/html/sidebar/getSideMemb.json', emailAddress, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			console.log(ajaxResult.data);
	      return false;
	    }
		var delMembNo = ajaxResult.data;
		linkMembList = $.grep(linkMembList, function(value) {
			return value != delMembNo;
		});
	});
	document.getElementById('new-field').removeChild(obj.parentNode);
}

// 모임구성원 이메일 변수에 담기
function memb_add_email() {
  var addmemb = $('.add-email-box').text();
  var membdata = new Array();
  $('div').find('.add-email-box').each(function(i, e){
	membdata.push($(this).val()); 
  });
  return membdata;
}

// 멤버 초대 팝업 닫기
function closeEvent() {
	$('#memb-email').val('');
	$('#new-field').children().remove();
	$('.inputMessage').empty();
}

$('body').on('click', '#memb-close-btn', function() {
	closeEvent();
});

// 사이드바 조회
function sideBarLoad() {
   $.get("../../html/sidebar.html", function(result) {
	    $("#sidebar").html(result);
	    
	    // 방장
        $.getJSON("listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
            var status = ajaxResult.status;

            if (status != "success") return;

            var listMeetingMembBoss = ajaxResult.data;
            var template = Handlebars.compile($("#bossTemplate").html());
            var ul = $(".meeting_memb_boss");
            ul.html(template({"listMeetingMembBoss":listMeetingMembBoss}));
            
            // 로그인 유저, 방장 여부 비교 후 멤버 초대 버튼 활성화 결정
            var sessionMemb = window.sessionStorage.getItem("member");
            if (listMeetingMembBoss[0].memberNo == JSON.parse(sessionMemb).memberNo) {
            	membPlusBtnHidden = true;
            }
            
            // 멤버초대 버튼 활성화 여부
            if (membPlusBtnHidden == true) {
            	$('#sideMembDiv').show();
            }
        });
        
        // 방장 외 멤버
        $.getJSON('listMeetingMembNotBoss.json?meetingNo=' + meetingNo, function(ajaxResult) {
            var status = ajaxResult.status;

            if (status != "success") return;

            var listMeetingMembNotBoss = ajaxResult.data;
            var template = Handlebars.compile($('#notbossTemplate').html());
            var ul = $(".meeting_memb_notboss");
            ul.html(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
        });
    });
}

// FaceBook 공유
var url = document.location.href;
function share(){
    var share = {
        method: 'stream.share',
        //u: 'http://z.bitcamp.com:8080/z/html/meetmain/meetmain.html'
        u: url
    };
 
    FB.ui(share, function(response) { /*console.log(response);*/ });
}
