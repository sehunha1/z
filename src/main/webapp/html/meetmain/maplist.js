$.getJSON('placelist.json', function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success")
	  return;
  
  var list = ajaxResult.data;
  var tbody = $('#list-table > tbody');
  
  // 템플릿 텍스트를 처리하여 HTML을 생성해 줄 함수 얻기
  var template = Handlebars.compile($('#trTemplate').html());
  
  // 템플릿 엔진을 통해 생성된 HTML을 tbody에 넣는다.
  tbody.html(template({"list": list}));
  
  $('.place-link').click(function(event) {
	  	event.preventDefault();
	  	location.href = 'view.html?memberNo=' + $(this).attr("data-no");
	 });
});

//$.getJSON('list.json', function(ajaxResult) {
//	if (ajaxResult.status == "fail") { // 로그인 되지 않았으면,
//		return;
//	}
//	var list = ajaxResult.data;
//	var container2 = $('.container2');
//	//var container2 = $('#container2 .row');
//	var template = Handlebars.compile($('#trTemplate').html());
//	var row;
//	for (var i = 0; i < list.length; i++) {
//		if (i % 3 == 0) {
//			console.log('로우생성')
//			row = $('<div>').addClass('row').appendTo(container2);
//		}
//		var div = $('<div>').html(template(list[i]));
//		row.append(div);
//	}
//});
