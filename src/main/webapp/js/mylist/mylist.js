$.getJSON("../auth/loginUser.json", function(ajaxResult) {
  var memberNo = ajaxResult.data.memberNo;
  $.getJSON("listMeetingCards.json?memberNo=" + memberNo, function(ajaxResult) {
    var status = ajaxResult.status;
    if (status != "success") return;
    var listMeetingCards = ajaxResult.data;
    for (var i = 0; i < listMeetingCards.length; i++) {
        if (listMeetingCards[i].category == "스터디") {
            if (listMeetingCards[i].photo.length < 2)
            listMeetingCards[i].photo = "../../image/mylist/study.jpg";
        }
        if (listMeetingCards[i].category == "친목") {
            if (listMeetingCards[i].photo.length < 2)
            listMeetingCards[i].photo = "../../image/mylist/friendship.jpg";
        }
        if (listMeetingCards[i].category == "회식") {
            if (listMeetingCards[i].photo.length < 2)
            listMeetingCards[i].photo = "../../image/mylist/alcohol.jpg";
        }
        if (listMeetingCards[i].category == "동창회") {
            if (listMeetingCards[i].photo.length < 2)
            listMeetingCards[i].photo = "../../image/mylist/alumni.jpg";
        }
    }
    var template = Handlebars.compile($("#meeting_card").html());
    var ul = $(".meeting_list");
    ul.html(template({"listMeetingCards":listMeetingCards}));

    $(".meeting_info.ing .item .tit").html("투표진행중");
    $(".meeting_info.ing .item").css("text-align", "center"); // 투표 진행중 문구 가운데 정렬
    $(".meeting_info.ing .date").css("display", "none");
    $(".meeting_info.ing .location").css("display", "none");
    $(".meeting_info.ing .time .info").css("display", "none");
    $(".meeting_info.ing .time .tit").css("font-size", "20px");
    $(".meeting_info.ing .item").css("margin", "22.5px 0px 22.5px 0px");

    $(".meeting_info.wait .item .tit").html("확정대기중");
    $(".meeting_info.wait .item").css("text-align", "center"); // 확정 대기중 문구 가운데 정렬
    $(".meeting_info.wait .date").css("display", "none");
    $(".meeting_info.wait .location").css("display", "none");
    $(".meeting_info.wait .time .info").css("display", "none");
    $(".meeting_info.wait .time .tit").css("font-size", "20px");
    $(".meeting_info.wait .item").css("margin", "22.5px 0px 22.5px 0px");

    $(".item").on("click", function(e) {
      var currentMeeting = $(e.currentTarget);
      if (currentMeeting.attr("data-meetstat") == "wait") {
        window.location.href = serverRoot + "/html/detail/detail_meeting_ready.html?memberNo=" + memberNo +
                        "&meetingNo=" + currentMeeting.attr("data-meeting-no");
        return;
      } else if (currentMeeting.attr("data-meetstat") == "fin") {
          window.location.href = serverRoot + "/html/detail/detail.html?memberNo=" + memberNo +
              "&meetingNo=" + currentMeeting.attr("data-meeting-no");
          return;
      }
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

$("button").click(function(e) {
    location.href = serverRoot + "/html/main/write2.html";
});