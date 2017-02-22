// 모임 생성시 설정화면 javaScript
// 작성: 2017.02.19 김재녕

// GO 버튼 클릭시 데이터 저장 후 페이지 이동
$("#Go-btn").click(function(e) {
	e.preventDefault();
	
    var param = {
        "title": $('#play-title').val(),
	    "category": $('#meeting-desc').val(),
	    "deadline": $('#limit-date').val(),
	    "dateList": $('#possible-date').val().split(" to ").toString(),
	    "content": $('#meeting-content').val(),
	    "photo": $('#input-file').val()
    }
    
    /*console.log(param);*/
    
    $.post(serverRoot + '/meeting/add.json', param, function(ajaxResult) {
        if (ajaxResult.status != "success") {
          alert(ajaxResult.data);
          return;
        }
        alert('okok');
        location.href = '../meetmain/meetmain.html';
    }, 'json');

});

// 모임 기간 설정 시 제한 날짜 선택
$("#possible-date").click(function(e) {
/*	e.preventDefault();
	console.log('test');*/
});

// 멤버 초대 상자 추가
function add_memb() {
	$('<div>').attr('class', 'mail-box-cls').html(
			'<input type="email"' + 'class="add-email-box"'
					+ 'placeholder="email을 입력해주세요">'
					+ '<button type="button" id="minus-btn"'
					+ 'class="btn btn-default"'
					+ 'onClick="remove_memb(this)">-</button>').appendTo(
			'#new-field');
}

// 멤버 초대 상자 삭제
function remove_memb(obj) {
	document.getElementById('new-field').removeChild(obj.parentNode);
}

// 모임 이미지 업로드
$(document).ready(function(){
    var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        if(window.FileReader){
            // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 
        else {
            // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload-name').val(filename);
    });

	var imgTarget = $('.preview-image .upload-hidden');
	
	imgTarget.on('change', function(){
		var parent = $(this).parent();
		parent.children('.upload-display').remove();
		
		if(window.FileReader){ //image 파일만 
			
			if (!$(this)[0].files[0].type.match(/image\//)) return;
			
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				parent.prepend(
						'<div class="upload-display">'
					  + '<div class="upload-thumb-wrap">'
					  + '<img src="'+src+'" class="upload-thumb">'
					  + '</div></div>'); 
				} 
			reader.readAsDataURL($(this)[0].files[0]);
		} 
		else { 
			$(this)[0].select();
			$(this)[0].blur();
			var imgSrc = document.selection.createRange().text;
			parent.prepend(
					'<div class="upload-display">'
					+ '<div class="upload-thumb-wrap">'
					+ '<img class="upload-thumb">'
					+ '</div></div>');
			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
	    }
	});
});

