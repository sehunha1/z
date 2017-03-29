var urlMemberNo = window.location.search.split("&")[0].substring(10);
var meetingNo = window.location.search.split("&")[1].substring(10); // 모임 번호
var meetPhoto; // 모임이미지

// session memberNo 가져오기
if (window.sessionStorage.getItem("member") != null) {
	var sessionMemberNo = JSON.parse(window.sessionStorage.getItem("member")).memberNo;	
} else {
	var sessionMemberNo = 0;
}

if (urlMemberNo != sessionMemberNo) {
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

var linkMembList = new Array(); // 멤버번호
var membPlusBtnHidden = false; // 방장 여부에 따라 멤버 초대 버튼 여부

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

// 모임 상세 정보 출력(초기화)
$.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var oneMeeting = ajaxResult.data;
    var template = Handlebars.compile($("#infoTemplate").html());
    var divs = $("#testwrap .conttext1");
    divs.html(template(oneMeeting));
    
    if (oneMeeting.meetStat !== "ing") {
        swal({title: "투표가 마감된 모임입니다.",
            text: "1초후 내모임리스트로 이동합니다.",
            timer: 1000,
            showConfirmButton: false}, function(e) {
            location.href = "../mylist/mylist.html";
        });
    };
});

// 모임 상세정보 재출력
var getonemeet = function() {
    $.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") return;
        var oneMeeting = ajaxResult.data;
        var template = Handlebars.compile($("#infoTemplate").html());
        var divs = $("#testwrap .conttext1");
        divs.html(template(oneMeeting));
    });
};

//$('.photo img').attr('src', '../upload/loading.jpg');
// 이미지 로딩 시간으로 인한 reSetting
setTimeout(function() {
	getonemeet();
}, 4500);

// $.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
//     var status = ajaxResult.status;
//     if (status != "success") return;
//     var oneMeeting = ajaxResult.data;
//
//     var template = Handlebars.compile($("#infoTemplate").html());
//     var divs = $("#testwrap .conttext1");
//     divs.append(template(oneMeeting));
//
//     if (oneMeeting.meetStat !== "ing") {
//         swal({title: "투표가 마감된 모임입니다.",
//               text: "1초후 내모임리스트로 이동합니다.",
//               timer: 1000,
//               showConfirmButton: false}, function(e) {
//             location.href = "../mylist/mylist.html";
//         });
//     };
// });

$(function() {
	
	// 헤더
	$.get("../../html/header.html", function(result) {
		$("#header").html(result);
	});
	
    $.get("../../html/header-login.html", function(result) {
	    $("#header-login").html(result);
    });
    
    // 푸터
    $.get("../../html/footer.html", function(result) {
        $("#footer").html(result);
    });
    
    // 사이드바
    sideBarLoad();

    $('body').on('click', '.ui-datepicker-header', function(e){
        e.preventDefault();
        window.oMeetingDetail.init();
    });
});
