$.getJSON('../auth/loginUser.json', function(ajaxResult) {
	var facebook = ajaxResult.data.facebook;

	if (facebook != null & facebook != "") {
		$(".social-login-buttons").css("display", "none");
	} else {
		$("#already").css("display", "none");
	}
});


	function statusChangeCallback(response) {
		if (response.status === 'connected') {
			testAPI();
		} else if (response.status === 'not_authorized') {
		} else {
		}
	}

//	This function is called when someone finishes with the Login
//	Button.  See the onlogin handler attached to it in the sample
//	code below.
	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	}


//	페이스북 연동시작 
	function fbLogin() {
		FB.login(function(response) {
			FB.api('/me/?fields=picture', { locale: 'kr_KR', fields: 'email' },
					function(response) {
				
				
				var mnum = $("#memberNo").val();
				var facebookemail = response.email;

				//페이스북 종복검사
				$(function() {
					$.getJSON('../auth/checkFacebook.json?facebook=' + facebookemail, function(ajaxResult) {
						var status = ajaxResult.status;

						if (response.email == undefined) {

						}

						if (status == "fail") {
							swal({
								title: "오류",
								text: "이미 등록된 계정입니다.",
								type: "error",
							},
							function(){
								FB.logout(function(response) {
								});
							});
						}
						else if (status == "success") {

							var param = {
									"memberNo": mnum,
									"email" : $("#email").val(),
									"name" : $("#nameback").val(),
									"password" : $("#passback").val(),
									"photo": $("#pathback").val(),
									"facebook": facebookemail
							};

							$.post('updatefcbk.json', param, function(ajaxResult) {
								if (ajaxResult.status != "success") {
									sweetAlert("오류", "오류가 발생", "error")
									return;
								} else if (response.email == undefined) {
									return;
								}

								swal({
									title: "페이스북 연동완료",
									text: "페이스북 계정이 연동되었습니다.",
								},
								function(){
									$(".social-login-buttons").css("display", "none");
									$("#already").css("display", "inline");
								});
							});
						} 
					});
				});
			}
			);
		});
	} // 연동 끝


	window.fbAsyncInit = function() {
		FB.init({
			appId      : '{1343425079030171}',
			cookie     : true,  // enable cookies to allow the server to access 
			// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.8' // use graph api version 2.8
		});
	};

//	Load the SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=253788165032910";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

