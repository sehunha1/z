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
  
  

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '{253788165032910}',
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

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    //console.log('Welcome!  Fetching your information.... ');
    /*
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + + '!';
    });
    */
    
    FB.api('/me', { locale: 'kr_KR', fields: 'name, email' },
    		  function(response) {
    		    console.log(response.email);
    		    console.log(response.name);
    		    //document.getElementById('status').innerHTML =
    		    //  'Thanks for logging in, ' + response.name + response.email + '!';
    		    
    		    
    		    $(function() {
    		          var cookie_email = response.email;
    		          var cookie_name = response.name;
    		          $.cookie('cookie_e', cookie_email, { path: '/'});
    		          $.cookie('cookie_n', cookie_name, { path: '/'});
    		      })
    		      
    		      // 페이스북 중복검사
    		      
				 //페이스북 종복검사
				 $(function() {
				    $.getJSON('checkFacebook.json?facebook=' + response.email, function(ajaxResult) {
				      var status = ajaxResult.status;
				
				        if (status == "success") {
				        	 swal({
			    				  title: "페이스북으로 로그인",
			    				  text: "회원가입 창으로 이동합니다.",
			    				},
			    				function(){
			    				  location.href ='facebookjoin.html'
			    				});
				        	
				        } else if (status != "success") {
				        	
				        	var param = {
				        			email: response.email,
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
    
  }