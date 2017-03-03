var meetingNo = window.location.search.split("&")[1].substring(10);

$.getJSON("../getOneMeeting.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var oneMeeting = ajaxResult.data;

    var template = Handlebars.compile($("#infoTemplate").html());
    var h1 = $("#meeting_ready h1");
    h1.append(template(oneMeeting));
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

$.getJSON("getDateDuplication.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var dateDuplication = ajaxResult.data;

  var template = Handlebars.compile($("#dateTemplate").html());
  var ul = $(".result_list.date_result_list");
  ul.append(template({"dateDuplication":dateDuplication}));
});

$(function() {
  $('#btn_toggle_member_list').on('click', function() {
    $('.member_list_wrap').toggleClass('on');
  });

  $('.date_result_list .item').on('click', function() {
    $('.date_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });

  $('.place_result_list .item').on('click', function() {
    $('.place_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });
  
  $("#btn_back").on("click", function(e) {
    e.preventDefault();
    location.href = "../mylist/mylist.html";
  });
});