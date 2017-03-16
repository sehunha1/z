$('body').on('click', '#blist', function() {
	$.getJSON('membloc.json', function(ajaxResult2) {
		$.getJSON('placelist.json', function(ajaxResult) {
			var mtnum = location.href.split('?')[1].split('&')[1].split('=')[1].replace('#','');
			var mnum = location.href.split('?')[1].split('=')[1].split('&')[0];

			var list = ajaxResult.data;
			var memck = ajaxResult2.data;
			
			alert(list);
			
			if (list != "[]") {
			var x = list[0].xLocation;
			var y = list[0].yLocation;

			var status = ajaxResult.status;
			
			var list = ajaxResult.data;

			var mapContainer = document.getElementById('map-2'), // 지도를 표시할 div  
			mapOption = {
				center: new daum.maps.LatLng(37.5032238545975, 127.02357032937897), // 지도의 중심좌표
				level: 3 // 지도의 확대 레벨
			};

			var map2 = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

			var tbody = $('#list-table > tbody');

			// 템플릿 텍스트를 처리하여 HTML을 생성해 줄 함수 얻기
			var template = Handlebars.compile($('#trTemplatelist').html());

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
				'                <div class="ellipsis" style="margin-left:5px;">주소 : ' + list[i].address + '</div>' +
				'				 <hr style="border: solid 1px;">' +
				'                <span class="move" style="float: right; position:relative; overflow:hidden;"></span>' +
				'                <div class="member" style="margin-left:5px; overflow:scroll;"><a href="#" class="show">멤버보기</a><br></div>' +
				'                <div class="photo" style="margin-left:5px;"></div>' +
				'                <div class="votebutton" style="margin-bottom:3px;"> ' +
				' <button class="vote" type="button" style="float:right; width:40px; height:20px;">투표</button>' +
				'</div>    ' +
				'</div>' + 
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
				
				var num = i;
				var countup = 0;
				
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
					
					var membin = overlayDiv.getElementsByClassName('member')[0];
					//membin.innerHTML = "선택한 멤버<br>";
					var showin = overlayDiv.getElementsByClassName('show')[0];
					showin.onclick= function() {
					
					for (j = 0; j < memck.length; j++) {
						var photopath = Array(memck.length);
						photopathdefault = "../../image/profile-default.png";
						
						if (memck[j].ltnum == list[num].locationNo) {
							if (countup == 0) {
								//movein.innerHTML += countup;
							}
							countup++; 
							if (memck[j].photo != "") {
								photopath[j] = "../upload/" + memck[j].photo;
							} else {
								photopath[j] = photopathdefault;
							}
							if (countup % 5 == 0) {
								//movein.innerHTML += '<a class="more" href="#" style="text-decoration:none;">더보기▶</a>';
								membin.innerHTML += 'hel';
							}
							
							membin.innerHTML += memck[j].name + " ";
							membin.innerHTML += "<img src='../upload/" + photopath[j] + "'" + "style='width:30px; height:30px;'>"
							
						}
					}
					countup = 0; 
					};
				});
				
				
				// 오버레이 element에서 close버튼을 클릭하면 닫히게 이벤트를 등록한다.
				var close = overlayDiv.getElementsByClassName('close')[0];
				close.onclick= function() {
					overlay.setMap(null); 
				};

				overlays.push(overlay);
			}
			
			$('body').on('click', '.place-link', function() {
				for (i = 0; i < list.length; i++) {
					if (list[i].xLocation == $(this).attr("x")) {
						//console.log(template);

						var overlayDiv = document.createElement('div');
						overlayDiv.innerHTML = contents[i];
						
						var countdown = 0;

						var placelist = document.getElementById('place-link').value;    
						// 마커 위에 커스텀오버레이를 표시합니다
						var overlay = new daum.maps.CustomOverlay({
							content:  overlayDiv, // 커스텀오버레이에 표시할 내용
							position: positions[i],
							zIndex: 3
						});

						// 오버레이 element에서 close버튼을 클릭하면 닫히게 이벤트를 등록한다.
						overlays.push(overlay);

						var place = list[i].place;
						var locationNo = list[i].locationNo;

						var membin = overlayDiv.getElementsByClassName('member')[0];
						//membin.innerHTML = "선택한 멤버<br>";

						for (j = 0; j < memck.length; j++) {
							var photopath = Array(memck.length);
							photopathdefault = "../../image/profile-default.png";

							if (memck[j].ltnum == list[i].locationNo) {
								//console.log(i);
								membin.innerHTML += memck[j].name + " ";

								if (memck[j].photo != "") {
									photopath[j] = "../upload/" + memck[j].photo;
								} else {
									photopath[j] = photopathdefault;
								}
								membin.innerHTML += "<img src='../upload/" + photopath[j] + "'" + "style='width:30px; height:30px;'>"
								countdown++;
							}
						}
						
						//console.log("아래쪽 카운터" + countdown);

						var vote = overlayDiv.getElementsByClassName('vote')[0];
						vote.onclick= function() {
							swal({
								title: place + "을(를) 투표할까요?",
								showCancelButton: true,
								confirmButtonColor: "#558CDF",
								confirmButtonText: "투표",
								cancelButtonText: "취소",
								closeOnConfirm: false,
								closeOnCancel: false
							},
							function(isConfirm){
								if (isConfirm) {
									var param = {
											"locationNo": locationNo,
											"memberNo": mnum,
											"meetingNo": mtnum
									};

									$.post('vote.json', param, function(ajaxResult) {
										if (ajaxResult.status != "success") {
											sweetAlert("오류", "이미 투표하셨습니다.", "error")
											return;
										}
									});
									//swal("투표", "투표가 완료되었습니다.", "success");
									swal({
										title: "투표",
										text: "투표가 완료되었습니다.",
										type: "success",
									},
									function(){
										//$('#blist').trigger('click'); //강제 클릭
										$.ajax({
											type : "GET",
											url : "placelist.json",
											dataType : "json",
											error : function() {
												alert('통신실패!!');
											},
											success : function(data) {
												tbody = $('#list-table > tbody');
												template = Handlebars.compile($('#trTemplatelist').html());
												tbody.html(template({"list": data.data}));

												$.getJSON('../auth/loginUser.json', function(userData) {
													var photopath = "../../image/profile-default.png";

													membin.innerHTML += userData.data.name + " ";

													if (userData.data.photo != "") {
														photopath = "../upload/" + userData.data.photo;
													} else {

													}
													membin.innerHTML += "<img src='../upload/" + photopath + "'" + "style='width:30px; height:30px;'>"
												});
											}
										});
									});
								} else {
									swal("취소", "취소하였습니다.", "error");
								}
							});
						};


						var close = overlayDiv.getElementsByClassName('close')[0];
						close.onclick= function() {
							overlay.setMap(null);
						};

						map2.setCenter(new daum.maps.LatLng($(this).attr("x"), $(this).attr("y")));
						overlay.setMap(map2);
					} // if
				}
			})
			}
		});
	});
});