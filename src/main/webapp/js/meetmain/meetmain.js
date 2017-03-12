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

