var meetingNo = window.location.search.split("&")[1].substring(10);

$.getJSON("../meetmain/listMeetingMembBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") return;
  var listMeetingMembBoss = ajaxResult.data;

  var template = Handlebars.compile($("#bossTemplate").html());
  var ul = $(".member_list");
  ul.append(template({"listMeetingMembBoss":listMeetingMembBoss}));

  $.getJSON("../meetmain/listMeetingMembNotBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var listMeetingMembNotBoss = ajaxResult.data;

    var template = Handlebars.compile($("#notbossTemplate").html());
    var ul = $(".member_list");
    ul.append(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
  });
});
//
// $.getJSON("../meetmain/listMeetingMembNotBoss.json?meetingNo=" + meetingNo, function(ajaxResult) {
//   var status = ajaxResult.status;
//   if (status != "success") return;
//   var listMeetingMembNotBoss = ajaxResult.data;
//
//   var template = Handlebars.compile($("#notbossTemplate").html());
//   var ul = $(".member_list");
//   ul.append(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
// });

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