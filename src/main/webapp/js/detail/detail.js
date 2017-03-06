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
	var memberNo = 1;
	var meetingNo = 1;
	
	$.getJSON(serverRoot + '/html/detail/detailMeet.json?meberNo=' + memberNo+ '&meetingNo=' + meetingNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			return;
		}
		var meeting = JSON.stringify(ajaxResult.data);
		console.log(meeting);
		var titlTemp = Handlebars.compile($("#meetingName").html());
		var title = JSON.parse(meeting).title;
		
		console.log(title);
		title.append(titlTemp({"title": title}));
	});
	
} catch (e) {
	
} finally {
	
}
