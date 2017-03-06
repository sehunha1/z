"use strict"
// 작성: 2017.03.06 김재녕

// Initialize Swiper - 멤버
var swiper = new Swiper('.member .swiper-container', {
	pagination : '.member .swiper-pagination',
	slidesPerView : 6,
	centeredSlides : false,
	paginationClickable : true,
	spaceBetween : 30
});

// Initialize Swiper - 게시글
var swiper = new Swiper('.board .swiper-container', {
	pagination : '.board .swiper-pagination',
	slidesPerView : 4,
	centeredSlides : false,
	paginationClickable : true,
	spaceBetween : 10
});

try {
	var mNo = location.href.split('?')[1].split('=')[1].split('&')[0];
	var mtNo = location.href.split('?')[1].split('=')[2];
	
	$.getJSON(serverRoot + '/html/detail/detailMeet.json?memberNo=' + mNo+ '&meetingNo=' + mtNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		console.log(ajaxResult.data);
		
		// 모임 상태
		$(".stat-span").append(ajaxResult.data.meetStat);
		
		// 모임 이미지
		var photo = JSON.parse(meeting).photo;
		$(".title-photo").attr('src', clientRoot + '/html/upload/' + ajaxResult.data.photo);
		
		// 모임명
		var h1 = $("#meeting-title");
		var title = JSON.parse(meeting).title;
		var temp = Handlebars.compile($('#meetingName').html());
		h1.append(temp({"title": title}));
		
		// 
	});
	
} catch (e) {
	
} finally {
	
}
