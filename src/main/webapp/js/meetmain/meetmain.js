var meetingNo = window.location.search.split("&")[1].substring(10);
var membNoList = new Array(); // 멤버번호

Date.prototype.Compare = function(ComDate, Type) {
    var RtnVal = -1;
    var tmpDate = new Date();
    tmpDate.setTime(this.getTime());

    switch(Type.toUpperCase())
    {
        case "Y" : {
            do{
                tmpDate.setMonth(tmpDate.getMonth() + 12);
                RtnVal++;
            }
            while(tmpDate <= ComDate);
        }
            break;
        case "M" : {
            do{
                tmpDate.setMonth(tmpDate.getMonth() + 1);
                RtnVal++;
            }
            while(tmpDate <= ComDate);
        }
            break;
        case "D" : {
            do{
                tmpDate.setDate(tmpDate.getDate() + 1);
                RtnVal++;
            }
            while(tmpDate <= ComDate);
        }
            break;
        case "YD" : {
            do{
                tmpDate.setMonth(tmpDate.getMonth() + 12);
            }
            while(tmpDate <= ComDate);

            tmpDate.setMonth(tmpDate.getMonth() - 12);

            do{
                tmpDate.setDate(tmpDate.getDate() + 1);
                RtnVal++;
            }
            while(tmpDate <= ComDate);
        }
            break;
        case "YM" : {
            do{
                tmpDate.setMonth(tmpDate.getMonth() + 12);
            }
            while(tmpDate <= ComDate);

            tmpDate.setMonth(tmpDate.getMonth() - 12);

            do{
                tmpDate.setMonth(tmpDate.getMonth() + 1);
                RtnVal++;
            }
            while(tmpDate <= ComDate);

        }
            break;
        case "MD" : {
            do{
                tmpDate.setMonth(tmpDate.getMonth() + 12);
            }
            while(tmpDate <= ComDate);

            tmpDate.setMonth(tmpDate.getMonth() - 12);

            do{
                tmpDate.setMonth(tmpDate.getMonth() + 1);
            }
            while(tmpDate <= ComDate);

            tmpDate.setMonth(tmpDate.getMonth() - 1);

            do{
                tmpDate.setDate(tmpDate.getDate() + 1);
                RtnVal++;
            }
            while(tmpDate <= ComDate);
        }
        break;
    }
    return RtnVal;
};

$("#datepicker").datepicker({
    inline: true
});

$.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var oneMeeting = ajaxResult.data;

    var template = Handlebars.compile($("#infoTemplate").html());
    var divs = $("#testwrap .conttext1");
    divs.append(template(oneMeeting));
});

$(function() {
	$.get("../../html/header.html", function(result) {
		$("#header").html(result);
	});
	
    $.get("../../html/header-login.html", function(result) {
	    $("#header-login").html(result);
    });
  
    $.get("../../html/footer.html", function(result) {
        $("#footer").html(result);
    });
  
    $.get("../../html/sidebar.html", function(result) {
	    $("#sidebar").html(result);

        $.getJSON("listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
            var status = ajaxResult.status;

            if (status != "success") return;

            var listMeetingMembBoss = ajaxResult.data;
            var template = Handlebars.compile($("#bossTemplate").html());
            var ul = $(".meeting_memb_boss");
            ul.html(template({"listMeetingMembBoss":listMeetingMembBoss}));
        });
        $.getJSON('listMeetingMembNotBoss.json?meetingNo=' + meetingNo, function(ajaxResult) {
            var status = ajaxResult.status;

            if (status != "success") return;

            var listMeetingMembNotBoss = ajaxResult.data;
            var template = Handlebars.compile($('#notbossTemplate').html());
            var ul = $(".meeting_memb_notboss");
            ul.html(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
        });
    });


    $('body').on('click', '.ui-datepicker-header', function(e){
        e.preventDefault();
        window.oMeetingDetail.init();
    });

});

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
	$('div').find('.inputMessage').each(function(i, e){
		
		// 빈 문자열 입력 or 경고 문구 출력 시
		if ($(this).text().trim() == "" || $(this).css('color') == "rgb(255, 0, 0)") {
			alert("msss");
			sendOk = false;
			return false;
		}
	});
	
	// 이메일 전송
	if (sendOk) {
		var emailList = memb_add_email();
		console.log(emailList);
//				$.post(serverRoot + '/html/sidebar/getSideMemb.json', emailList, function(ajaxResult) {
//
//				});
	}
});

// 멤버 초대 박스 이메일 입력시
$('body').on('keyup', '.mail-box-cls', function(e) {
	var membNo = null;
	
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
			"memberNo" : ajaxResult.data,
			"meetingNo" : meetingNo
		};
		
		// 초대 여부 조회
		$.post(serverRoot + '/html/sidebar/getSideLink.json', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
		      $inputMessage.text("이미 초대된 회원입니다.").css("color", "red");
		      return;
			}
			$inputMessage.text("초대 가능한 회원입니다.").css("color", "black");
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
  document.getElementById('new-field').removeChild(obj.parentNode);
}

// 모임구성원 이메일 변수에 담기
function memb_add_email()  {
  var addmemb = $('.add-email-box').text();
  var membdata = new Array();
  $('div').find('.add-email-box').each(function(i, e){
	  membdata.push($(this).val()); 
  });
  return membdata;
}

$('body').on('click', '#memb-close-btn', function(event) {
	$('#memb-email').val('');
	$('#new-field').children().remove();
	$('.inputMessage').empty();
});

