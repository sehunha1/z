$.getJSON("../auth/loginUser.json", function(ajaxResult) {
  var memberNo = ajaxResult.data.memberNo;
  $.getJSON("listMeetingCards.json?memberNo=" + memberNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var listMeetingCards = ajaxResult.data;
    var template = Handlebars.compile($("#meeting_card").html());
    var ul = $(".meeting_list");
    ul.html(template({"listMeetingCards":listMeetingCards}));
    $(".meeting_info.ing .info").text("투표진행중");
    $(".meeting_info.wait .info").text("확정대기중");
  });
});
