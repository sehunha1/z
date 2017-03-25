 $('#emailcheck').click(function() {
	 
	 var email = $("#email1").val();
	 //var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	 var regex=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

	 
    $.getJSON('checkEmail.json?email=' + $("#email1").val(), function(ajaxResult) {
      var status = ajaxResult.status;
      
      
      
      if(regex.test(email) == false) {  
          sweetAlert("경고", "이메일 형식에 맞게 입력하세요", 'warning');
          $('#isCheck').val('N');
    	} 

      else if (status == "success") {
    	   $('#isCheck').val('Y');
    	   //sweetAlert("OK!", ajaxResult.data, 'success');
    	   swal({
                title: "OK!",
                text: ajaxResult.data,
                type: "success",
              },
              function(){
            	  $('#email1').focus();
              });
    	   //setInterval('autoRefresh_div()', 500); // 5초 후에 div 새로 고침
    	   //document.getElementById('email').reload();
    	   //$("#emaildiv").load(window.location.href+" #emaildiv");
    	   
      } /*else if ($("#email1").val() == '' || $("#email1").val() == 'undefined') {
    	  sweetAlert("경고", "이메일을 입력하세요", 'warning');
          $('#isCheck').val('N');
      }*/
      else if (status != "success") {
    	  sweetAlert("Fail!", ajaxResult.data, 'error');
    	  $('#isCheck').val('N');
        return;
      } 
    });
	
    if ($('#fcbk').val() == "dddd") {
    	console.log(null);
    }
});
 
    $.validator.setDefaults( {
      submitHandler: function () {
    	  var param;
    	  var photopath;
    	  
    	  if ($('#isCheck').val() == 'N') {
    		  sweetAlert("경고", "이메일 사용 가능 여부를 확인하세요", 'warning');
    		  return;
    	  }
    	  
    	  if ($('#photo-path').val() == "") {
    		  photopath = "profile-default.png";
    	  } else {
    		  photopath = $('#photo-path').val();
    	  }
    	  
    	  if ($('#fcbk').val() == "") {
    	  param = {
    		      "email": $('#email1').val(),
    		      "name": $('#username1').val(),
    		      "password": $('#password1').val(),
    		      "photo": photopath,
    		      //"photo": $("#photo").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]))
    		      //"photo": $("#photo").attr('src', 'html/upload/' + val())
    		  };
    	  } else {
    		  param = {
        		      "email": $('#email1').val(),
        		      "name": $('#username1').val(),
        		      "password": $('#password1').val(),
        		      "photo": photopath,
        		      "facebook": $('#fcbk').val()
        		  };
    	  }

    		  $.post('add.json', param, function(ajaxResult) {
    		    if (ajaxResult.status == "fail") {
    		      sweetAlert("회원가입 실패", ajaxResult.data, 'error');
    		      return;
    		    }
    		    //sweetAlert("회원가입 완료!", "......", "success")
    		    //sweetAlert("회원가입 완료!", "로그인창으로 이동합니다.", "success");
    		    //alert('회원가입이 완료되었습니다. 로그인창으로 이동합니다.');
    		    //location.href = 'login.html';
    		    
    		    swal({
    		        title: "회원가입 완료!",
    		        text: "로그인 창으로 이동합니다.",
    		        type: "success",
    		      },
    		      function(){
    		        location.href ='login.html'
    		      });
    		    
    		    
    		    
    		  }, 'json'); // post();
      }
    } );

    $( document ).ready( function () {
      
    	// 이메일 정규표현식 유효성 검사
    	$.validator.addMethod("emailz", function(value, element) {
         return this.optional(element) || /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
      }, "올바른 형식의 이메일 주소를 입력하세요 ex)user01@gmail.com");
    
    
        
        // 이름 한글 영문
        $.validator.addMethod("namez", function(value, element) {
           return this.optional(element) || /^[가-힣a-zA-Z]{2,}$/i.test(value);
        }, "영문 혹은 한글로만 두 글자 이상 입력 하세요.");
    
    
    	
    	/* 이메일 중복검사 버튼 클릭 여부 */
    	jQuery.validator.addMethod("checkemail", function(value, element){
    		var saveemail=$('#email1').val()
    		
    	    if ($('#isCheck').val() == 'Y') {
    	        return true;
    	    } else if ($('#isCheck').val() == 'N') {
    	        return false;
    	    } else if(saveemail != $('#email1').val()) {
    	    	return false;
    	    }; 
    	}, "이메일 중복 여부를 체크하세요"); 
    	
      $( "#signupForm1" ).validate( {
        rules: {
          firstname1: "required",
          lastname1: "required",
          username1: {
            required: true,
            namez: true,
            minlength: 2
          },
          password1: {
            required: true,
            minlength: 6
          },
          confirm_password1: {
            required: true,
            minlength: 6,
            equalTo: "#password1"
          },
          email1: {
            required: true,
            emailz: true,
            checkemail: true,
            //changeeval: true
          },
          agree1: "required"
        },
        messages: {
          username1: {
            required: "이름을 입력하세요",
            minlength: "이름은 두 글자 이상 입력하세요"
          },
          password1: {
            required: "비밀번호를 입력하세요",
            minlength: "비밀번호는 여섯 글자 이상 입력하세요"
          },
          confirm_password1: {
            required: "비밀번호 확인란을 입력하세요",
            minlength: "비밀번호는 여섯 글자 이상 입력하세요",
            equalTo: "비밀번호가 일치하지 않습니다"
          },
          email1: {
            required:"이메일을 입력하세요.",
            checkemail:"중복 여부를 체크하세요"
            //customemail:"올바른 형식의 이메일을 입력하세요.",
          }
          //agree1: "Please accept our policy"
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
          // Add the `help-block` class to the error element
          error.addClass( "help-block" );

          // Add `has-feedback` class to the parent div.form-group
          // in order to add icons to inputs
          element.parents( ".col-sm-13" ).addClass( "has-feedback" );
          element.parents( ".col-sm-9" ).addClass( "has-feedback" );

          if ( element.prop( "type" ) === "checkbox" ) {
            error.insertAfter( element.parent( "label" ) );
          } else {
            error.insertAfter( element );
          }

          // Add the span element, if doesn't exists, and apply the icon classes to it.
          if ( !element.next( "span" )[ 0 ] ) {
            $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
          }
        },
        success: function ( label, element ) {
          // Add the span element, if doesn't exists, and apply the icon classes to it.
          if ( !$( element ).next( "span" )[ 0 ] ) {
            $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
          }
        },
        highlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".col-sm-13" ).addClass( "has-error" ).removeClass( "has-success" );
          $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
          
          $( element ).parents( ".col-sm-9" ).addClass( "has-error" ).removeClass( "has-success" );
          $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".col-sm-13" ).addClass( "has-success" ).removeClass( "has-error" );
          $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
          
          $( element ).parents( ".col-sm-9" ).addClass( "has-success" ).removeClass( "has-error" );
          $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        }
      } );
    } );

    