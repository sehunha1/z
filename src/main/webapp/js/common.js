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

			// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
			$('#href_out').click(function(event) {
				event.preventDefault();
				$.getJSON('../auth/logout.json', function(ajaxResult) {
					location.href = '../main/main.html'
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
