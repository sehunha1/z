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

    $(".item").on("click", function(e) {
      var currentMeeting = $(e.currentTarget);
      var sMeetingUrl = "http://z.bitcamp.com:8080/z/html/meetmain/meetmain.html?memberNo=" + memberNo + "&meetingNo=";
      var currentMeetingNo = currentMeeting.attr("data-meeting-no");
      var landingUrl = sMeetingUrl + currentMeetingNo;
      window.location.href = landingUrl;
    });
  });
});

$("select").on("change", function() {
    if ($("select option:selected").val() == "recent") {
        $(".item.ing").show();
        $(".item.wait").show();
        $(".item.fin").show();
    };
});

$("select").on("change", function() {
    if ($("select option:selected").val() == "ing") {
        $(".item.ing").show();
        $(".item.wait").hide();
        $(".item.fin").hide();
    };
});

$("select").on("change", function() {
    if ($("select option:selected").val() == "wait") {
        $(".item.ing").hide();
        $(".item.wait").show();
        $(".item.fin").hide();
    };
});

$("select").on("change", function() {
    if ($("select option:selected").val() == "fin") {
        $(".item.ing").hide();
        $(".item.wait").hide();
        $(".item.fin").show();
    };
});

$("a").click(function(e) {
    e.preventDefault();
});
