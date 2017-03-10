var meetingNo = window.location.search.split("&")[1].substring(10);

$("#datepicker").datepicker({
    inline: true
});

$.getJSON("getSelectedDateInfo.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var dddd = ajaxResult.data;
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
})
