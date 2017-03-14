var meetingNo = window.location.search.split("&")[1].substring(10);

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

        // var meetingNo = window.location.search.split("&")[1].substring(10);
        $.getJSON("listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
            var status = ajaxResult.status;

            if (status != "success") return;

            var listMeetingMembBoss = ajaxResult.data;
            console.log(listMeetingMembBoss);
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

    window.oMeetingDetail = new MeetingDetail();
    $('body').on('click', '.ui-datepicker-header', function(e){
        e.preventDefault();
        window.oMeetingDetail.init();
    });
    
});
// 멤버 초대 버튼 이벤트
$('body').on('click', '#sideMembPlus', function(e) {
	e.preventDefault();
//	$('#membPlusPopup').modal();
/*	$('#membPlusPopup').fadeIn(1000);
	$('#membPlusPopup').fadeTo("slow",1); */
});

$('body').on('click', '#memb-close-btn', function(e) {
//	$('#membPlusPopup').fadeOut(1000);
});

var inputEmail;
$('body').on('focus', '.add-email-box', function() {
  inputEmail = $(this);
})

// 멤버 초대 함수 호출
$('body').on('click', '#memb-plus-btn', function(e) {
	e.preventDefault();
	add_memb();
});

// 멤버 초대 박스 이메일 입력시
$('body').on('keyup', '.mail-box-cls', function(e) {
	 console.log(inputEmail.val());	 
/* 	 $.post(serverRoot + '/html/membAdd/membAdd.json', inputEmail, function(ajaxResult) {
		 if (ajaxResult.status != "success") {
        console.log(ajaxResult.data);
        return;
	   }
		 console.log("성공");
	 }); */
});

// 멤버 초대 상자 추가
function add_memb() {
   $('<div>').attr('class', 'mail-box-cls').html(
      '<input type="email"' + 'class="add-email-box"'
          + 'placeholder="email을 입력해주세요">'
          + '<button type="button" id="minus-btn"'
          + 'class="btn btn-default"'
          + 'onClick="remove_memb(this)">-</button>').appendTo(
      '#new-field');
}

// 멤버 초대 상자 삭제
function remove_memb(obj) {
  document.getElementById('new-field').removeChild(obj.parentNode);
}

// 모임구성원 이메일 변수에 담기
function memb_add_email()  {
  var addmemb = document.getElementsByClassName('add-email-box');
  var membdata = new Array();
  for (var i = 0; i < addmemb.length; i++) {
    if (addmemb[i] != null) {
      membdata.push(addmemb[i]);
    }
  }
  return membdata;
}
