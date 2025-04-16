var close_time; // 시간정보
var close_time2 = 10; // 10초설정
clearTimeout(close_time); // 재호출정지
close_time = setTimeout("close_window()", 10000);
// 1/1000 초지정, 바로시작
show_time(); // 실시간시간보여주기
function show_time() {
  let divClock = document.getElementById("Time");
  divClock.innerText = close_time2; // 10초삽입시작
  close_time2--; // 1초씩감소
  setTimeout(show_time, 1000); //1초마다갱신
}
function close_window() {
  // 함수정의
  window.close(); // 윈도우닫기x    
}

