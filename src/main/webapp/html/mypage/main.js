// 회원 정보 가져옴
$.getJSON('../auth/loginUser.json', function(ajaxResult) {
	var status = ajaxResult.status;

	var member = ajaxResult.data;
	$('#memberNo').val(member.memberNo);
	$('#email').val(member.email);
	$('#email1').val(member.email);
	$('#nameback').val(member.name);
	$('#username1').val(member.name);
	$('#pathback').val(member.photo);
	$('#passback').val(member.password);
	$('#facebookback').val(member.facebook);
	
	$('#now-photo').attr('src', '../upload/' + member.photo);
	
	var mnum = member.memberNo;
	
	$.getJSON('invite.json?memberNo=' + mnum, function(ajaxResult2) {
			
			var list = ajaxResult2.data;
			
			if (list == "") {
				$("#list-table").css("display", "none");
				$("#none").css("display", "block");
			}
		
			var tbody = $('#list-table > tbody');
			
			var template = Handlebars.compile($('#trTemplatelist').html());
			
			tbody.html(template({"list": list}));
	});
	
	// 초대 수락 or 거절
	$('body').on('click', '.ok', function() {
		var mtnum = $(this).attr("mtnumok");
		swal({
			  title: "초대 수락",
			  text: "초대를 수락하시겠습니까?",
			  showCancelButton: true,
			  confirmButtonText: "수락",
			  closeOnConfirm: false,
			  cancelButtonText: "취소",
			},
			function(){
				var param = {
						"memberNo": mnum,
						"meetingNo": mtnum
				};
				$.post('accept.json', param, function(ajaxResult) {
					if (ajaxResult.status != "success") {
						sweetAlert("오류", "오류가 발생하였습니다.", "error")
						return;
					}
				});
				swal({
					title: "초대 수락",
					text: "초대를 수락하였습니다.",
					type: "success",
				},
				function(){
					//top.document.location.reload();
					$.ajax({
						type : "GET",
						url : "invite.json?memberNo=" + mnum,
						dataType : "json",
						error : function() {
							alert('통신실패!!');
						},
						success : function(data) {
							tbody = $('#list-table > tbody');
							template = Handlebars.compile($('#trTemplatelist').html());
							tbody.html(template({"list": data.data}));
							
							if (data.data == "") {
								$("#list-table").css("display", "none");
								$("#none").css("display", "block");
							}
						}
					});
				});
			});
	});

	$('body').on('click', '.no', function() {
		var mtnum = $(this).attr("mtnumno");
		
		swal({
			  title: "초대 거절",
			  text: "초대를 거절하시겠습니까?",
			  showCancelButton: true,
			  confirmButtonText: "거절",
			  closeOnConfirm: false,
			  cancelButtonText: "취소",
			},
			function(){
				var param = {
						"memberNo": mnum,
						"meetingNo": mtnum
				};
				$.post('refuse.json', param, function(ajaxResult) {
					if (ajaxResult.status != "success") {
						sweetAlert("오류", "오류가 발생하였습니다.", "error")
						return;
					}
				});
				swal({
					title: "초대 거절",
					text: "초대를 거절하였습니다.",
					type: "success",
				},
				function(){
					//top.document.location.reload();
					$.ajax({
						type : "GET",
						url : "invite.json?memberNo=" + mnum,
						dataType : "json",
						error : function() {
							alert('통신실패!!');
						},
						success : function(data) {
							tbody = $('#list-table > tbody');
							template = Handlebars.compile($('#trTemplatelist').html());
							tbody.html(template({"list": data.data}));
							
							if (data.data == "") {
								$("#list-table").css("display", "none");
								$("#none").css("display", "block");
							}
						}
					});
				});
			});
	});
});



$('#photo').fileupload({
	  url: '../../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	 $('#photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        //console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#now-photo');
        if (data.index == 0) {
          var canvas = data.files[0].preview;
          var dataURL = canvas.toDataURL();
          img.attr('src', dataURL).css('width', '50px', 'height', '50px');
          $('#photo-label').css('display', '');
        }
    } 
});

$('#out-btn').click(function() {
	$.getJSON('membercheck.json?email=' + $('#emailout').val(), "&password=" + $('#passwordout').val() , function(ajaxResult) {
		if (ajaxResult.status == "success") {
			swal({
				  title: "정말 탈퇴하시겠습니까?",
				  text: "나의 모든 데이터 정보가 삭제됩니다.",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "탈퇴",
				  cancelButtonText: "취소",
				  closeOnConfirm: false,
				  closeOnCancel: false
				},
				function(isConfirm){
				  if (isConfirm) {
					  swal({
						  title: "탈퇴 완료",
						  text: "메인화면으로 이동합니다.",
						  type: "success",
						},
						function(){
							$.post('memberdelete.json?memberNo=' + $('#memberNo').val(), function(ajaxResult) {
								if (ajaxResult.status == "fail") {
									sweetAlert("삭제 실패", ajaxResult.data, 'error');
									return;
								}

							}, 'json'); // post();
						  location.href ='../main/main.html'
						});
				  } else {
				    swal("취소", "탈퇴가 취소 되었습니다.");
				  }
				});
		} else {
			sweetAlert("오류", "이메일 또는 암호가 틀립니다.", "error");
		}
	}, 'json');
}); // click() 


$('#emailcheck').click(function() {
	   
	   var email = $("#email1").val();
	   //var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	   var regex=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

	   
	    $.getJSON('../auth/checkEmail.json?email=' + $("#email1").val(), function(ajaxResult) {
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
	});




    $( document ).ready( function () {
      
      // 이메일 정규표현식 유효성 검사
      $.validator.addMethod("emailz", function(value, element) {
         return this.optional(element) || /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
      }, "올바른 형식의 이메일 주소를 입력하세요 ex)user01@test.com");
    
    
        
        // 이름 한글만
        $.validator.addMethod("namez", function(value, element) {
           return this.optional(element) || /^[가-힝]{2,}$/i.test(value);
        }, "한글로만 두 글자 이상 입력 하세요. ex)김구");
        
        // 암호 같은지 검사
        $.validator.addMethod("passz", function(value, element) {
        	var passback = $('#passback').val();
        	var password = $('#password1').val();
        	
        	if (passback == password) {
        		return false;
        	} else {
        		return true;
        	}
        }, "현재 사용하는 암호와 다른 암호를 입력하세요");
    
    
      
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
      
      $( "#updateform1" ).validate( {
        rules: {
          firstname1: "required",
          lastname1: "required",
          username1: {
            required: true,
            namez: true,
            minlength: 2
          },
          agree1: "required"
        },
        messages: {
          username1: {
            required: "이름을 입력하세요",
            minlength: "이름은 두 글자 이상 입력하세요"
          },
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
          // Add the `help-block` class to the error element
          error.addClass( "help-block" );

          // Add `has-feedback` class to the parent div.form-group
          // in order to add icons to inputs
          element.parents( ".col-sm-5" ).addClass( "has-feedback" );

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
          $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
          $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
          $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        },
            submitHandler: function () {
              var param = {
                    "memberNo": $('#memberNo').val(),
                    "email": $('#email').val(),
                    "name": $('#username1').val(),
                    "photo": $('#photo-path').val(),
                    "facebook": $('#facebookback').val()
                    //"photo": $("#photo").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]))
                    //"photo": $("#photo").attr('src', 'html/upload/' + val())
                
                };

                $.post('updatemember.json' , param, function(ajaxResult) {
                  if (ajaxResult.status == "fail") {
                    sweetAlert("변경 실패", ajaxResult.data, 'error');
                    return;
                  }
                  
                  swal({
                      title: "변경 완료!",
                      text: "변경을 완료하였습니다.",
                      type: "success",
                    },
                    function(){
                      event.preventDefault(); 
                      location.reload();
                      });
                }, 'json'); // post();
            }
      } ); //update1
      
      
      $( "#updateform2" ).validate( {
    	  rules: {
              password1: {
                required: true,
                minlength: 6,
                passz: true
              },
              confirm_password1: {
                required: true,
                minlength: 6,
                equalTo: "#password1",
                passz: true
              },
              email1: {
                required: true,
                emailz: true,
                checkemail: true,
                //changeeval: true
              },
            },
            messages: {
              password1: {
                required: "암호를 입력하세요",
                minlength: "암호는 여섯 글자 이상 입력하세요"
              },
              confirm_password1: {
                required: "암호 확인란을 입력하세요",
                minlength: "암호는 여섯 글자 이상 입력하세요",
                equalTo: "암호가 맞는지  확인하세요"
              },
              email1: {
                required:"이메일을 입력하세요.",
                checkemail:"중복 여부를 체크하세요"
                //customemail:"올바른 형식의 이메일을 입력하세요.",
              }
            },
          errorElement: "em",
          errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".col-sm-5" ).addClass( "has-feedback" );

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
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
          },
          unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
          },
              submitHandler: function () {
                var param = {
                      "memberNo": $('#memberNo').val(),
                      "email": $('#email1').val(),
                      "name": $('#nameback').val(),
                      "password": $('#password1').val(),
                      "photo": $('#pathback').val(),
                      "facebook": $('#facebookback').val()
                  };

                  $.post('updateemailpassword.json', param, function(ajaxResult) {
                    if (ajaxResult.status == "fail") {
                      sweetAlert("변경 실패", ajaxResult.data, 'error');
                      return;
                    }
                    
                    swal({
                        title: "변경 완료!",
                        text: "변경을 완료하였습니다.",
                        type: "success",
                      },
                      function(){
                        event.preventDefault(); 
                        location.reload();
                        });
                  }, 'json'); // post();
              }
        } ); //update2
    } );
