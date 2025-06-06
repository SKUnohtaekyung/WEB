kakao.maps.load(function () {
  // 지도 생성
  var container = document.getElementById("map");
  var options = {
    center: new kakao.maps.LatLng(37.381282869618, 126.92872052667), // 성결대 근처
    level: 4,
  };
  var map = new kakao.maps.Map(container, options);

  // 지도 타입 컨트롤 (일반/스카이뷰)
  var mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 줌 컨트롤
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지형 정보 오버레이
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

  // 마커 생성
  var marker = new kakao.maps.Marker({
    position: map.getCenter(),
    map: map,
  });

  // 클릭 이벤트로 마커 이동 + 위도/경도 표시
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    var latlng = mouseEvent.latLng;

    // 마커 위치 이동
    marker.setPosition(latlng);

    // 결과 표시
    var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
    message += "경도는 " + latlng.getLng() + " 입니다.";
    var resultDiv = document.getElementById("clickLatlng");
    resultDiv.innerHTML = message;
  });
});
