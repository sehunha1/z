$('body').on('click', '#blist', function() {
	$.getJSON('membloc.json', function(ajaxResult2) {
			var mtnum = location.href.split('?')[1].split('&')[1].split('=')[1].replace('#','');
			$.getJSON('placelist.json?meetingNo=' + mtnum, function(ajaxResult) {
			var mnum = location.href.split('?')[1].split('=')[1].split('&')[0];
			
			//console.log(ajaxResult);
			
			var list = ajaxResult.data;
			var memck = ajaxResult2.data;
			var upcheck = 0; // 새 투표 확인 변수
			var cookien = ""; // 새로 투표시 추가될 이름
			var cookiep = ""; // 새로 투표시 추가될 파일명
			
			if (list != "") {
				var x = list[0].xLocation;
				var y = list[0].yLocation;
	
				var status = ajaxResult.status;
	
				if (status != "success")
					return;
	
				var mapContainer = document.getElementById('map-2'), // 지도를 표시할 div  
				mapOption = {
					center: new daum.maps.LatLng(x, y), // 지도의 중심좌표
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
				'            <div class="close" title="닫기" style="margin-right:10px;"></div>' + 
				'        </div>' + 
				'        <div class="body">' + 
				'                <div class="ellipsis" style="margin-left:5px;">주소 : ' + 
				list[i].address + 
				'</div>' +
				'				 <hr style="border: solid 1px;">' +
				'                <span class="move" style="float: right; position:relative; overflow:hidden;"></span>' +
				'                <div class="member" style="margin-left:5px; overflow-x:auto;">선택한 멤버</div>' +
				'                <div class="votebutton" style="margin-bottom:3px;"> ' +
				' <button class="vote btn btn-info btn-sm" type="button" style="float:right; margin-right: 20px;">투표</button>' +
				' <button class="unvote btn btn-info btn-sm" type="button" style="float:right; margin-right: 20px; display:none; ">투표취소</button>' +
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
					var place = list[num].place;
					var locationNo = list[num].locationNo;
					
					overlay.setMap(map2);
					
					var membin = overlayDiv.getElementsByClassName('member')[0];
					membin.innerHTML = "선택한 멤버<br>";
					
					var movein = overlayDiv.getElementsByClassName('move')[0];
					movein.innerHTML = "";
					
					var vote = overlayDiv.getElementsByClassName('vote')[0];
					var unvote = overlayDiv.getElementsByClassName('unvote')[0];
					
					$.getJSON('../auth/loginUser.json', function(userData) {
						userJson = userData.data;
						for (j = 0; j < memck.length; j++) {
							var photopath = Array(memck.length);
							photopathdefault = "../../image/profile-default.png";
							
							if (memck[j].ltnum == list[num].locationNo) {
								countup++; 
								if (memck[j].photo != "") {
									photopath[j] = "../upload/" + memck[j].photo;
								} else {
									photopath[j] = photopathdefault;
								}
								membin.innerHTML += memck[j].name + " ";
								membin.innerHTML += "<img src='../upload/" + photopath[j] + "'" + "style='width:30px; height:30px; margin-right:5px;'>"
								/*if (countup % 4 == 0) {
									membin.style.overflowx = "auto";
									membin.innerHTML += "<br>";
									console.log(countup);
								}*/
								//console.log(countup);
								//console.log("upcheck" + upcheck);.
								if (userJson.name == memck[j].name) {
									if (upcheck == 1) {
										console.log(userJson.name);
									}
									else {
										//console.log("upcheck=0");
									}
								}
								var unvote = overlayDiv.getElementsByClassName('unvote')[0];
								//for (var i = 0; i < list.length; i++) {
								if (memck[j].mnum == mnum) {
									unvote.style.display = "inline";
									vote.style.display = "none";
								}
								//}
								unvote.onclick = function() {
									swal({
										title: place + "을(를) 투표 취소 할까요?",
										showCancelButton: true,
										confirmButtonColor: "#558CDF",
										confirmButtonText: "투표취소",
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

											$.post('unvote.json', param, function(ajaxResult) {
												if (ajaxResult.status != "success") {
													sweetAlert("오류", "알 수 없는 오류가 발생.", "error")
													return;
												}
											});
											swal({
												title: "투표취소",
												text: "투표 취소가 완료되었습니다.",
												type: "success",
											},
											function(){
												$('#blist').trigger('click'); //강제 클릭
											});
										} else {
											swal("취소", "취소하였습니다.", "error");
										}
									});
								}
							}
						}
					});
					countup = 0; 
					if (upcheck == 1) {
					    //membin.innerHTML += cookien;
						//membin.innerHTML += cookiep;
						//console.log(upcheck);
						//return;
						//console.log(overlayDiv);
						//console.log(contents[num]);
					}
					
					var vote = overlayDiv.getElementsByClassName('vote')[0];
					vote.onclick= function() {
						swal({
							title: place + "을(를) 투표할까요?",
							showCancelButton: true,
							confirmButtonColor: "#337ab7",
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
                                    $.ajax(sideBarLoad());
                                    $.ajax(userpu());
									$('#blist').trigger('click'); //강제 클릭
/*									$.ajax({
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
												cookien = userData.data.name + " ";

												if (userData.data.photo != "") {
													photopath = "../upload/" + userData.data.photo;
												} else {

												}
												membin.innerHTML += "<img src='../upload/" + photopath + "'" + "style='width:30px; height:30px;'>"
												cookiep = "<img src='../upload/" + photopath + "'" + "style='width:30px; height:30px;'>";
												upcheck = 1;
											});
										}
									});*/
								});
							} else {
								swal("취소", "취소하였습니다.", "error");
							}
						});
					}; //vote 끝
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
					if (list[i].xLocation == $(this).attr("x") & list[i].yLocation == $(this).attr("y")) {
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
						membin.innerHTML = "선택한 멤버<br>";

						for (j = 0; j < memck.length; j++) {
							var photopath = Array(memck.length);
							photopathdefault = "../../image/profile-default.png";
							
							if (memck[j].ltnum == list[i].locationNo) {
								//console.log(i);

								if (memck[j].photo != "") {
									photopath[j] = "../upload/" + memck[j].photo;
								} else {
									photopath[j] = photopathdefault;
								}
								membin.innerHTML += memck[j].name + " ";
								membin.innerHTML += "<img src='../upload/" + photopath[j] + "'" + "style='width:30px; height:30px; margin-right:5px;'>"
								countdown++;
								
								var unvote = overlayDiv.getElementsByClassName('unvote')[0];
								var vote = overlayDiv.getElementsByClassName('vote')[0];
								//for (var i = 0; i < list.length; i++) {
								if (memck[j].mnum == mnum) {
									vote.style.display = "none";
									unvote.style.display = "inline";
								}
								//}
								unvote.onclick = function() {
									swal({
										title: place + "을(를) 투표 취소 할까요?",
										showCancelButton: true,
										confirmButtonColor: "#558CDF",
										confirmButtonText: "투표취소",
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

											$.post('unvote.json', param, function(ajaxResult) {
												if (ajaxResult.status != "success") {
													sweetAlert("오류", "알 수 없는 오류가 발생.", "error")
													return;
												}
											});
											swal({
												title: "투표취소",
												text: "투표 취소가 완료되었습니다.",
												type: "success",
											},
											function(){
												$('#blist').trigger('click'); //강제 클릭
											});
										} else {
											swal("취소", "취소하였습니다.", "error");
										}
									});
								}
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
									swal({
										title: "투표",
										text: "투표가 완료되었습니다.",
										type: "success",
									},
									function(){
										$('#blist').trigger('click'); //강제 클릭
/*										$.ajax({
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
													cookien = userData.data.name + " ";

													if (userData.data.photo != "") {
														photopath = "../upload/" + userData.data.photo;
													} else {

													}
													membin.innerHTML += "<img src='../upload/" + photopath + "'" + "style='width:30px; height:30px;'>"
													cookiep = "<img src='../upload/" + photopath + "'" + "style='width:30px; height:30px;'>";
												});
												upcheck = 1;
											}
										});*/
									});

                                    sideBarLoad();
                                    userpu();
								} else {
									swal("취소", "취소하였습니다.", "error");
								}
							});
						}; //vote 끝


						var close = overlayDiv.getElementsByClassName('close')[0];
						close.onclick= function() {
							overlay.setMap(null);
						};

						map2.setCenter(new daum.maps.LatLng($(this).attr("x"), $(this).attr("y")));
						overlay.setMap(map2);
					} // if
				}
			})
			} else {
				swal({
					title: "오류",
					text: "선택된 장소가 없습니다.",
					type: "error",
				},
				function(){
					$('#bselect').trigger('click'); //강제 클릭
				});
			}
		});
	});
});