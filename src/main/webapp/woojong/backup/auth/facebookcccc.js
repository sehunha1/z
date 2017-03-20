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

  FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	        FB.api('/me/?fields=picture', function(user) {
	            if (user) {
	            	 $(function() {
	            		  var image = user.picture.data.url;
	            		  var defaulturl = "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F";
	            		  if (image == defaulturl) {
	            			  var cookie_photo = image.split('/')[7].split('?')[0];
	            		  } else {
	            			  var cookie_photo = image.split('/')[6].split('?')[0];  
	            		  }
	 	            	  $.cookie('cookie_i', image, { path: '/'});
	    		          $.cookie('cookie_p', cookie_photo, { path: '/'});
	    		          
	    		          console.log(cookie_photo);
	    		      })
	    		      
	            	/*
	            	//var image = 'http://graph.facebook.com/' + user.id + '/picture';
	            	var image = user.picture.data.url;
	            	var imagesplit = image.split('/')[6].split('?')[0];
	            	//var imagejpg = imagesplit[7].split('?')[0];
	            	// replaceAll("\\?.*", "")
	            	console.log(imagesplit);
	            	//console.log(imagesplit[7].replace('/?/gi', ""));
	            	
	            	
	            	//console.log(image);
	            	//image.replace(/&/gi, '%26');
	            	
	            	//console.log(image.replace(/&/gi, '%26'));
	            	
	            	
	            	// 사진 json
	            	
	            	$.getJSON('../auth/loginUser.json', function(ajaxResult) {
	            		if (ajaxResult.data.photo != imagesplit) {
	            			// 사진 DB에 추가
	            			$.getJSON("../auth/updateFBphoto.json?filename=" + image.replace(/&/gi, '%26'), function(ajaxResult) {
	    	                });
	            			
	            			// 사진 upload에 추가
	            			$.getJSON("../../common/fbPhoto.json?filename=" + image.replace(/&/gi, '%26'), function(ajaxResult) {
	    	                });
	            		}
	            		else {
	            			$('#profile_photo').html('<img src="../upload/' + ajaxResult.data.photo + '" height=30px; width=30px;/>');
	            		}
	            	});
	            	*/
	                
	            	
	            	// 사진 json 끝
	            	
	            	
	            	// image.src = 'http://graph.facebook.com/' + user.id + '/picture';
	            	//document.getElementById('profile_photo').src = "yourpicture.png";
	            	//$('#profile_photo').html('<img src="http://graph.facebook.com/' + user.id + '/picture" height=30px; width=30px;/>');
	            	//$('#profile_photo').html('<img src="http://graph.facebook.com/' + user.id + '/picture" height=30px; width=30px;/>');
	                //$('#inprofile_photo').html('<img src="http://graph.facebook.com/' + user.id + '/picture" style="width: 40px; height: 40px; margin-right: 12px; position: absolute;"/>');
	    			//$('#inprofile_photo').html('<img src="../upload/' + image + '" style="width: 40px; height: 40px; margin-right: 12px; position: absolute;"/>');
	                
	                
	            }
	        });    
	         
	    } else if (response.status === 'not_authorized') {
	        
	    }
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
		        
    //FB.api('/me', { locale: 'kr_KR', fields: 'name, email' },
	  FB.api('/me/?fields=picture', { locale: 'kr_KR', fields: 'name, email, picture' },
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