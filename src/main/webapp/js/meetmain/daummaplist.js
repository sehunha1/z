$.getJSON('placelist.json', function(ajaxResult) {
	var list = ajaxResult.data;
	
	//console.log(ajaxResult);
	  
	var x = list[0].xLocation;
	var y = list[0].yLocation;
	
	var status = ajaxResult.status;
	    
	    if (status != "success")
	      return;
	    
	    var list = ajaxResult.data;
	    
	var mapContainer = document.getElementById('map-2'), // 지도를 표시할 div  
	    mapOption = {
	        center: new daum.maps.LatLng(x, y), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };
	
	var map2 = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	var tbody = $('#list-table > tbody');
	    
	    // 템플릿 텍스트를 처리하여 HTML을 생성해 줄 함수 얻기
	    var template = Handlebars.compile($('#trTemplate').html());
	    
	    // 템플릿 엔진을 통해 생성된 HTML을 tbody에 넣는다.
	    tbody.html(template({"list": list}));
	    
	    
	var positions = Array(list.length);
	  
	  for (j = 0; j < positions.length; j++) {
	    positions[j] = new daum.maps.LatLng(list[j].xLocation, list[j].yLocation) 
	  }
	  
	  var contents = Array(list.length);
	    
	    for (i = 0; i < contents.length; i++) {
	    
	      contents[i] = '<div class="wrap">' + 
	                '    <div class="info">' + 
	                '        <div class="title">' + 
	                             list[i].place + 
	                '            <div class="close" title="닫기"></div>' + 
	                '        </div>' + 
	                '        <div class="body">' + 
	                '            <div class="img">' +
	                '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
	                '           </div>' + 
	                '            <div class="desc">' + 
	                '                <div class="ellipsis">' + list[i].address + '</div>' +
	                '                <div class="member">선택한 멤버' + list[i].memberNo + '</div>' + 
	                '            </div>' + 
	                '        </div>' + 
	                '    </div>' +    
	                '</div>';
	    }
	    
	
	// 오버레이를 담는 배열
	var overlays = [];
	
	
	// 맵의 확대수준이 변경되거나 위치이동 되었을때 커스텀 오버레이 삭제
	daum.maps.event.addListener(map2, 'idle', function() {
	    closeOverlays();
	});
	
	// 오버레이를 모두 닫는 함수
	function closeOverlays() {
	  for (var i = 0; i < overlays.length; i++) {
	    overlays[i].setMap(null);
	  }
	}
	
	for (var i = 0; i < positions.length; i++) {
	  createMarkerAndOverlay(positions[i], contents[i]);
	}
	
	// 마커와 오버레이를 생성하는 함수
	function createMarkerAndOverlay(posi, cont) {
	  // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        map: map2, // 마커를 표시할 지도
	        position: posi // 마커의 위치
	    }); 
	
	    var overlayDiv = document.createElement('div');
	    overlayDiv.innerHTML = cont;
	
	    // 마커 위에 커스텀오버레이를 표시합니다
	    var overlay = new daum.maps.CustomOverlay({
	        content: overlayDiv, // 커스텀오버레이에 표시할 내용
	        position: marker.getPosition(),
	        zIndex: 3
	    });
	    
	    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	    daum.maps.event.addListener(marker, 'click', function() {
	        overlay.setMap(map2);
	    });
	
	    // 오버레이 element에서 close버튼을 클릭하면 닫히게 이벤트를 등록한다.
	    var close = overlayDiv.getElementsByClassName('close')[0];
	    close.onclick= function() {
	      overlay.setMap(null); 
	    };
	    
	    overlays.push(overlay);
	}
	
	      $('.place-link').click(function(event) {
	      for (i = 0; i < list.length; i++) {
	    	  if (list[i].xLocation == $(this).attr("x")) {
	    	        var overlayDiv = document.createElement('div');
	    	        overlayDiv.innerHTML = contents[i];
	    	        
	    	        var placelist = document.getElementById('place-link').value;    
	    	        // 마커 위에 커스텀오버레이를 표시합니다
	    	        var overlay = new daum.maps.CustomOverlay({
	    	            content:  contents[i], // 커스텀오버레이에 표시할 내용
	    	            position: positions[i],
	    	            zIndex: 3
	    	        });
	    	        
	    	        // 오버레이 element에서 close버튼을 클릭하면 닫히게 이벤트를 등록한다.
	    	        overlays.push(overlay);
	    	  }
	      }
	    	        var close = overlayDiv.getElementsByClassName('close')[0];
	    	          close.onclick= function() {
	    	          overlay.setMap(null);
	    	        };
	    	        
	    	        
	    	        
            map2.setCenter(new daum.maps.LatLng($(this).attr("x"), $(this).attr("y")));
            overlay.setMap(map2);
        });
});