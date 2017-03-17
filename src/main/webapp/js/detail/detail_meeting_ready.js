var meetingNo = window.location.search.split("&")[1].substring(10);

$.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var oneMeeting = ajaxResult.data;

    var template = Handlebars.compile($("#infoTemplate").html());
    var h1 = $("#meeting_ready h1");
    h1.append(template(oneMeeting));

    var template_cont = Handlebars.compile($("#contentTemplate").html());
    var p = $(".meeting_info .date");
    p.append(template_cont(oneMeeting));
});

$.getJSON("../meetmain/listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var listMeetingMembBoss = ajaxResult.data;
  for (var i = 0; i < listMeetingMembBoss.length; i++) {
    if (listMeetingMembBoss[i].photo.length < 2)
      listMeetingMembBoss[i].photo = "../../image/profile-default.png";
  }

  var template = Handlebars.compile($("#bossTemplate").html());
  var ul = $(".member_list");
  ul.append(template({"listMeetingMembBoss":listMeetingMembBoss}));

  $.getJSON("../meetmain/listMeetingMembNotBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var listMeetingMembNotBoss = ajaxResult.data;
    for (var i = 0; i < listMeetingMembNotBoss.length; i++) {
      if (listMeetingMembNotBoss[i].photo.length < 2)
        listMeetingMembNotBoss[i].photo = "../../image/profile-default.png";
    }

    var template = Handlebars.compile($("#notbossTemplate").html());
    var ul = $(".member_list");
    ul.append(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
  });
});

$.getJSON("isDuplicateCal.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var isDuplicate = ajaxResult.data;

  if (isDuplicate > 1) {
    $.getJSON("getDateDuplication.json?meetingNo=" + meetingNo, function(ajaxResult1) {
      var status1 = ajaxResult1.status;
      if (status1 != "success") return;
      var dateDuplication = ajaxResult1.data;

      var template = Handlebars.compile($("#dateTemplate").html());
      var ul = $(".result_list.date_result_list");
      ul.append(template({"dateDuplication":dateDuplication}));
    });
  }
});

$.getJSON("isDuplicateLoc.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var isDuplicate = ajaxResult.data;

  if (isDuplicate > 1) {
    $.getJSON("getLocationListDuplication.json?meetingNo=" + meetingNo, function(ajaxResult1) {
      var status1 = ajaxResult1.status;
      if (status1 != "success") return;
      var locationListDuplication = ajaxResult1.data;

      var template = Handlebars.compile($("#locationListTemplate").html());
      var ul = $(".result_list.place_result_list");
      ul.append(template({"locationListDuplication":locationListDuplication}));
    });
  }
});

$.getJSON("getVotedCount.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var votedCount = ajaxResult.data;

  var span = $(".meeting_info .count #voted");
  span.append(votedCount);
});

$.getJSON("getEntireCount.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var entireCount = ajaxResult.data;

  var span = $(".meeting_info .count #entire");
  span.append(entireCount);
});

$(function() {
  $('body').on('click', '#btn_toggle_member_list', function() {
    $('.member_list_wrap').toggleClass('on');
  });

  $('body').on('click', '.date_result_list .item', function() {
    $('.date_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });

  $('body').on('click', '.place_result_list .item', function() {
    $('.place_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });
  
  $("#btn_back").on("click", function(e) {
    e.preventDefault();
    location.href = "../mylist/mylist.html";
  });

  $("#btn_ok").on("click", function(e) {
    e.preventDefault();
    var param = {
      "cal" : $(".date_result_list .item.on .info1").text(),
      "loc" : $(".place_result_list .item.on .info1").text()
    };

    $.post("updateMstatFin.json?meetingNo=" + meetingNo, param, function(ajaxResult) {
      var status = ajaxResult.status;
      if (status != "success") return;
      var data = ajaxResult.data;
    });

    location.href = "../mylist/mylist.html";
  });
});