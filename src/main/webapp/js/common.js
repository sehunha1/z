// -------------------------페이스북------------------------//  

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		// document.getElementById('status').innerHTML = 'Please log ' +
		// 'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		// document.getElementById('status').innerHTML = 'Please log ' +
		// 'into Facebook.';
	}
}

window.fbAsyncInit = function() {
	FB.init({
		appId : '{1343425079030171}',
		cookie : true, // enable cookies to allow the server to access
		// the session
		xfbml : true, // parse social plugins on this page
		version : 'v2.8' // use graph api version 2.8
	});


	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			FB.api('/me/?fields=name, email', function(user) {
				if (user) {
				}
			});
		} else if (response.status === 'not_authorized') {
		} else {
		}
	});
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id))
		return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=253788165032910";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// -------------------------페이스북------------------------//

var userpu = function userpopup() {

    // 헤더
	headerSetting();
  
    // 푸터
    $.get("../../html/footer.html", function(result) {
        $("#footer").html(result);
    })

    // 헤더안의 유저프로필 클릭이벤트 발생
    $("body").on("click", "#logout", function() {
        if ($("#userpopup").css("display") == "none") {
            $("#userpopup").show();
        }
    })
    $("body").on("click", function(e) {
        var target = $(e.target);
        if (target.parents("#logout").attr("id") !== "logout"
            && target.attr("class") !== "_layer") {
            $("#userpopup").hide();
        }
    })

    $("body").on("click", "#href_mylist", function(e) {
        e.preventDefault();
        location.href = "../mylist/mylist.html";
    })

    $("body").on("click", "#href_mypage", function(e) {
        e.preventDefault();
        location.href = "../mypage/main.html";
    })

    // 모임 버튼 클릭 이벤트
    $("body").on("click", "#new-btn", function(e) {
        e.preventDefault();
        createMeet();
    });

    // 모임명 입력창 키 이벤트
    $('body').on('keyup', "#meetTitle", function(e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            createMeet();
        }
    });
}

// 초기화
$(userpu());

// 모임 생성
function createMeet() {
	// 모임명 유효성 검사
	if ($('#meetTitle').val().trim() == "") {
		return false;
	}
	location.href = "write2.html?title=" + encodeURIComponent($('#meetTitle').val());
};

// 헤더
function headerSetting() {
  $.get('../../html/header.html', function(result) {
        // 서버에서 로그인 사용자 정보를 가져온다.
        $.getJSON('../auth/loginUser.json', function(ajaxResult) {
            $('#header').html(result);

            if (ajaxResult.status == "fail") { // 로그인
                // 되지
                // 않았으면,
                // 로그온 상태 출력 창을 감춘다.
                $('#_login_status').css(
                    'display', 'none');

                // 로그인 버튼의 클릭 이벤트 핸들러 등록하기
                $('#login-btn').click(function(event) {
                    event
                        .preventDefault()
                    location.href = '../main/main.html'
                });
                return;
            } else if (ajaxResult.status == "success") {
                window._oUserInfo = ajaxResult.data;
                if("/z/html/meetmain/meetmain.html" === location.pathname){
                    window.oMeetingDetail = new MeetingDetail();
                }

                // 로그인 되었으면, 로그오프 상태 출력 창을 감춘다.
                $('#_logout_status').css(
                    'display', 'none');
                $('#logout #name').text(
                    ajaxResult.data.name);
                $('#sec-intext #name').text(
                    ajaxResult.data.name);
                $('#sec-intext #emailin').text(
                    ajaxResult.data.email);

                $('#profile_photo')
                    .html(
                        '<img src="../upload/'
                        + ajaxResult.data.photo
                        + '" height=30px; width=30px;/>');
                $('#inprofile_photo')
                    .html(
                        '<img src="../upload/'
                        + ajaxResult.data.photo
                        + '" style="width: 40px; height: 40px; margin-right: 12px; position: absolute;"/>');

                // 초대
                var mainlink = "http://z.bitcamp.com:8080/z/html/main/main.html";
                var link = document.location.href;
                var membnum = ajaxResult.data.memberNo;
                $.getJSON(serverRoot + '/getMyInviteCount.json?memberNo=' + membnum, function(ajaxResult2) {
                    var invite = ajaxResult2.data;
                    if (mainlink == link & invite > 0) {
                        var checkcookie = $.cookie('check');
                        if (checkcookie == 'n') {
                            swal({
                                    title: "초대 알림",
                                    text: invite + "개의 받은 초대가 있습니다.\n확인 버튼을 누르면 마이페이지로 이동합니다.\n초대를 수락/거절 하기 전까지는 로그인 할때마다 계속 이창이 나타납니다.",
                                    showCancelButton: true,
                                    cancelButtonText: "닫기",
                                    //confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "확인",
                                    closeOnConfirm: true
                                },
                                function(isConfirm){
                                    if (isConfirm) {
                                        $.cookie('check', 'y', {path : '/'});
                                        location.href="http://z.bitcamp.com:8080/z/html/mypage/main.html";
                                    } else {
                                        $.cookie('check', 'y', {path : '/'});
                                    }
                                });
                        }
                    }
                });

                $.getJSON("../../getMyUnvoteCount.json?memberNo=" + ajaxResult.data.memberNo, function(ajaxResult) {
                    var status = ajaxResult.status;
                    if (status != "success") return;
                    var myUnvoteCount = ajaxResult.data;
                    $("#userpopup #sec3 #unvoteCount").append(myUnvoteCount);
                });
            }

            // $('#profile_photo').text(ajaxResult.data.photo);
            // $('#sec-intext
            // #name').text(ajaxResult.data.name);

            // 페이스북 API

            // 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
            $('#href_out').click(function(event) {event.preventDefault();
                $.getJSON('../auth/logout.json',function(ajaxResult) {
                    location.href = '../main/main.html'
                });
                FB.logout(function(response) {
                    // Do
                    // what
                    // ever
                    // you
                    // want
                    // here
                    // when
                    // logged
                    // out
                    // like
                    // reloading
                    // the
                    // page
                    window.location
                        .reload();
                });
            });

            $.getJSON("../dday.json?memberNo=" + ajaxResult.data.memberNo, function(ajaxResult) {
                var status = ajaxResult.status;
                if (status != "success") return;
                var dday = ajaxResult.data;
                var template = Handlebars.compile($("#ddayTemplate").html());
                var div = $("._layer.dday");
                div.html(template({"dday":dday}));
            });
        });
    });
}


