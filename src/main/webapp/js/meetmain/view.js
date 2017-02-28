try {
  var memberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var memberNo = -1;
}

if (memberNo > 0) {
	prepareViewForm();
} else {
	prepareNewForm();
}

function prepareViewForm() {
	// 등록 버튼은 감춘다.
	$('.new-form').css('display', 'none');
	
	//학생 목록 가져와서 tr 태그를 만들어 붙인다.
	$.getJSON('board.json?memberNo=' + memberNo, function(ajaxResult) {
	  var status = ajaxResult.status;
	  
	  if (status != "success") {
		  alert(ajaxResult.data);
		  return;
	  }
	  
	  var board = ajaxResult.data;
	  console.log(board);
	  
	  $('#title').val(board.title);
	  $('#content').val(board.content);

	  $('#link').attr('src', '../upload/' + file.link);
	});
	
	// 삭제, 변경 버튼을 클릭 했을 때 호출될 함수(클릭 이벤트 핸들러) 등록
	$('#delete-btn').click(function() {
	  $.getJSON('delete.json?memberNo=' + memberNo, function(ajaxResult) {
		  if (ajaxResult.status != "success") { 
			  alert(ajaxResult.data);
			  return;
		  }
		  location.href = 'main.html';
	  }); // getJSON()
	}); // click()
	
	$('#update-btn').click(function() {
	    var param = {
	    	"memberNo": memberNo,	
    		"title": $('#title').val(),
    		"content": $('#content').val()
	    };
	    
	    $.post('update.json', param, function(ajaxResult) {
	    	if (ajaxResult.status != "success") {
	    		alert(ajaxResult.data);
	    		return;
	    	}
	    	location.href = 'board.html';
	    }, 'json');
	    
	}); // click()
	
} // prepareViewForm()

function prepareNewForm() {
	// 변경,삭제 버튼을 감춘다.
    $('.view-form').css('display', 'none');
  
    $('#add-btn').click(function() {
	    var param = {
		    	"memberNo": memberNo,	
	    		"title": $('#title').val(),
	    		"content": $('#content').val()
		    };
		    
		    $.post('update.json', param, function(ajaxResult) {
		    	if (ajaxResult.status != "success") {
		    		alert(ajaxResult.data);
		    		return;
		    	}
		    	location.href = 'board.html';
		    }, 'json');
	    
	}); // click()
}

// 목록 버튼을 클릭했을 때 호출될 함수(이벤트 핸들러) 등록!
$('#list-btn').click(function() {
	location.href = 'board.html';
});





