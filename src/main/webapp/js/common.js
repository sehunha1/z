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
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into Facebook.';
    }
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '{253788165032910}',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
	 (function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=253788165032910";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	 
// -------------------------페이스북------------------------//








$(function() {
    //헤더와 풋터 갖다붙이기
	/*
  $.get("../../html/header.html", function(result) {
    $("#header").html(result);
  })*/
	// header.html을 가져와서 붙인다.
	$.get('../../html/header.html', function(result) {
		// 서버에서 로그인 사용자 정보를 가져온다.
		$.getJSON('../auth/loginUser.json', function(ajaxResult) {
			$('#header').html(result);

			if (ajaxResult.status == "fail") { // 로그인 되지 않았으면,
				// 로그온 상태 출력 창을 감춘다.
				$('#_login_status').css('display', 'none');

				// 로그인 버튼의 클릭 이벤트 핸들러 등록하기
				$('#login-btn').click(function(event) {
					event.preventDefault()
					location.href = '../main/main.html'
				});
				return;
			}

      var memberNo = ajaxResult.data.memberNo;

      $.getJSON("listMeetingMembBoss.json?memberNo=" + memberNo, function(ajaxResult) {
        var status = ajaxResult.status;

        if (status != "success") return;

        var listMeetingMembBoss = ajaxResult.data;
        var template = Handlebars.compile($("#bossTemplate").html());
        var ul = $(".meeting_memb_boss");
        ul.html(template({"listMeetingMembBoss":listMeetingMembBoss}));
      });

      $.getJSON('listMeetingMembNotBoss.json?memberNo=' + memberNo, function(ajaxResult) {
        var status = ajaxResult.status;
        
        if (status != "success") return;
        
        var listMeetingMembNotBoss = ajaxResult.data;
        var template = Handlebars.compile($('#notbossTemplate').html());
        var ul = $(".meeting_memb_notboss");
        ul.html(template({"listMeetingMembNotBoss":listMeetingMembNotBoss}));
      });

			// 로그인 되었으면, 로그오프 상태 출력 창을 감춘다. 
			$('#_logout_status').css('display', 'none');
			//$('#sec-intext img').attr('src', '../upload/' + ajaxResult.data.photoPath);
			//$('#nameo').text(ajaxResult.data.name);
			$('#logout #name').text(ajaxResult.data.name);
			$('#sec-intext #name').text(ajaxResult.data.name);
			$('#sec-intext #emailin').text(ajaxResult.data.email);
			$('#profile_photo').html('<img src="../upload/' + ajaxResult.data.photo + '" height=30px; width=30px;/>');
			$('#inprofile_photo').html('<img src="../upload/' + ajaxResult.data.photo + '" style="width: 40px; height: 40px; margin-right: 12px; position: absolute;"/>');
			//$('#profile_photo').text(ajaxResult.data.photo);
			//$('#sec-intext #name').text(ajaxResult.data.name);
			
			
			// 페이스북 API
			

			// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
			$('#href_out').click(function(event) {
				event.preventDefault();
				$.getJSON('../auth/logout.json', function(ajaxResult) {
					location.href = '../main/main.html'
				});
				
				FB.logout(function (response) {
			          //Do what ever you want here when logged out like reloading the page
			          window.location.reload();
			      });
				

				
				
			});
		});
	});
  
  $.get("../../html/footer.html", function(result) {
    $("#footer").html(result);
  })
  
    //헤더안의 유저프로필 클릭이벤트 발생
  $("body").on("click", "#logout", function() {
    if($("#userpopup").css("display") == "none") {
      $("#userpopup").show();
    }
  })
  $("body").on("click", function(e) {
    var target = $(e.target);
    if(target.parents("#logout").attr("id") !== "logout" && target.attr("class") !== "_layer") {
      $("#userpopup").hide();
    }
  })
  /*
  $("body").on("click", "#login", function(e) {
	  location.href = "../auth/login.html";
  })
  $("body").on("click", "#submit_btn", function(e) {
    location.href = "afterlogin.html";
  })*/
  
  $("body").on("click", "#href_mylist", function(e) {
    e.preventDefault();
    location.href = "../mylist/mylist.html";
  })
  
    $("body").on("click", "#href_mypage", function(e) {
    e.preventDefault();
    location.href = "../mypage/main.html";
  })
  
  /*
  $("body").on("click", "#href_out", function(e) {
    e.preventDefault();
    location.href = "../main/main.html";
  })*/
  $("body").on("click", "#new-btn", function(e) {
    e.preventDefault();
    location.href = "write2.html";
  });
})
