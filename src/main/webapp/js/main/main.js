$.getJSON(serverRoot + '/meetmain/meetmain.json', function(ajaxResult) {
    var status = ajaxResult.status;
	  
	if (status != "success")
	    return;
	
	var list = ajaxResult.data;
	console.log(list);
	var parent = $('#nextlist');
	var template = Handlebars.compile($('#trTemplate').html());
	var div
	for(var i = 0; i < list.length; i++){
	  if(i % 3 == 0) {
		  div = $("<div>").addClass('row')
		  parent.append(div);
	  }
	  div.append(template(list[i]));
	}
});
/*
var check = true;
$.getJSON("../auth/loginUser.json", function(ajaxResult) {
	if (ajaxResult.status == "success") {
		console.log("안녕ㅎ");
		var membnum = ajaxResult.data.memberNo;
		$.getJSON(serverRoot + '/getMyUnvoteCount.json?memberNo=' + membnum, function(ajaxResult2) {
			console.log(check);
			var invite = ajaxResult2.data;
			if (check == true) {
				swal({
					  title: "알림",
					  text: invite + "개의 받은 초대가 있습니다.\n확인 버튼을 누르면 마이페이지로 이동합니다.",
					  showCancelButton: true,
					  cancelButtonText: "취소",
					  //confirmButtonColor: "#DD6B55",
					  confirmButtonText: "확인",
					  closeOnConfirm: true
					},
					function(isConfirm){
						  if (isConfirm) {
							  check = false;
							  console.log(check);
							  return;
						  } else {
							  
						  }
						});
			}
		});
	}
	else {
		return;
	}
});*/