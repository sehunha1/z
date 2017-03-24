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
      testAPI();
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

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  // 로그아웃
  function fbLogout() {
      FB.logout(function (response) {
          //Do what ever you want here when logged out like reloading the page
          window.location.reload();
      });
  }
  
  // 로그인
  function fbLogin() {
	  FB.login(function(response) {
		  FB.api('/me/?fields=picture', { locale: 'kr_KR', fields: 'name, email, picture' },
	    		  function(response) {
	    		    
					 //페이스북 종복검사
					 $(function() {
					    $.getJSON('checkFacebook.json?facebook=' + response.email, function(ajaxResult) {
					      var status = ajaxResult.status;
					
					      if (response.email == undefined) {
					    	  
					      }
					      else if (status == "success") {
					        	 swal({
				    				  title: "페이스북 첫 로그인 ",
				    				  text: "회원가입 창으로 이동합니다.",
				    				},
				    				function(){
				    					var facebook_email = response.email;
					    		        var facebook_name = response.name;
					    		          
					    		        var image = response.picture.data.url;
					    		        
				            			$.getJSON("../../common/fbPhoto.json?filename=" + image.replace(/&/gi, '%26'), function(ajaxResult) {
				    	                });
					    		        
				  						var defaulturl = "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F";
				  						
				  						if (image == defaulturl) {
				  							var fcbk_photo = image.split('/')[7].split('?')[0];
				  						} else {
				  							var fcbk_photo = image.split('/')[6].split('?')[0];  
				  						}
					    		        $.cookie('cookie_e', facebook_email, { path: '/'});
					    		        $.cookie('cookie_n', facebook_name, { path: '/'});
					    		        $.cookie('cookie_p', fcbk_photo, { path: '/'});
				    				  location.href ='facebookjoin.html'
				    				});
					        	
					        } 
					        else if (status != "success") {
					        	
					        	var param = {
					        			facebook: response.email
					        		};
					        		
					        		$.post('loginFacebook.json', param, function(ajaxResult) {
					        			if (ajaxResult.status == "success") {
					        				location.href = "../main/main.html";	
					        				return;
					        			}
					        			sweetAlert("로그인 실패", ajaxResult.data, "error");
					        		}, 'json');
					        	
					      } 
					    });
					});
	    		  }
	    		);
		});
  }
  
  // 회원가입
  function fbJoin() {
	  FB.login(function(response) {
		  FB.api('/me/?fields=picture', { locale: 'kr_KR', fields: 'name, email, picture' },
	    		  function(response) {
	    		    //console.log(response.email);
	    		    //console.log(response.name);
	    		    //console.log(response.picture.data.url);
	    		    
	    		    
	    		    /*$(function() {
	    		          var facebook_email = response.email;
	    		          var facebook_name = response.name;
	    		          
	    		          var image = response.picture.data.url;
  						var defaulturl = "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F";
  						if (image == defaulturl) {
  							var fcbk_photo = image.split('/')[7].split('?')[0];
  						} else {
  							var fcbk_photo = image.split('/')[6].split('?')[0];  
  						}
	    		          //$.cookie('cookie_e', cookie_email, { path: '/'});
	    		          //$.cookie('cookie_n', cookie_name, { path: '/'});
	    		      })*/
	    		      
	    		      // 페이스북 중복검사
	    		      
					 //페이스북 종복검사
				  
					 $(function() {
					    $.getJSON('checkFacebook.json?facebook=' + response.email, function(ajaxResult) {
					      var status = ajaxResult.status;

					      var facebook_email = response.email;
	    		          var facebook_name = response.name;
	    		          
	    		          var image = response.picture.data.url;
  						var defaulturl = "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F";
  						if (image == defaulturl) {
  							var fcbk_photo = image.split('/')[7].split('?')[0];
  						} else {
  							var fcbk_photo = image.split('/')[6].split('?')[0];  
  						}
					
					      if (response.email == undefined) {
					    	  
					      }
					      else if (status == "success") {
		            			$.getJSON("../../common/fbPhoto.json?filename=" + image.replace(/&/gi, '%26'), function(ajaxResult) {
		    	                });
					        	 swal({
				    				  title: "페이스북 계정으로 가입",
				    				  text: "사진은 자동으로 받아옵니다.",
				    				},
				    				function(){
				    					$("#email1").val(facebook_email);
				    				    $("#username1").val(facebook_name);
				    				    $("#photo-path").val(fcbk_photo);
				    				    $("#fcbk").val(facebook_email);
				    				    $("#photowrap").css("display", "none");
				    				    $("#email1").focus();
				    				});
					        	
					        } else if (status != "success") {
					        	 swal({
				    				  title: "오류",
				    				  text: "이미 가입된 계정입니다.",
				    				  type: "error"
				    				});
					      } 
					    });
					});
	    		  }
	    		);
		});
  }
  
  
  window.fbAsyncInit = function() {
	  FB.init({
		  appId      : '{1343425079030171}',
		  cookie     : true,  // enable cookies to allow the server to access 
		  // the session
		  xfbml      : true,  // parse social plugins on this page
		  version    : 'v2.8' // use graph api version 2.8
	  });
	  
	  // Now that we've initialized the JavaScript SDK, we call 
	  // FB.getLoginStatus().  This function gets the state of the
	  // person visiting this page and can return one of three states to
	  // the callback you provide.  They can be:
	  //
	  // 1. Logged into your app ('connected')
	  // 2. Logged into Facebook, but not your app ('not_authorized')
	  // 3. Not logged into Facebook and can't tell if they are logged into
	  //    your app or not.
	  //
	  // These three cases are handled in the callback function.
  };


  // Load the SDK asynchronously
	 (function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=253788165032910";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

