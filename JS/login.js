// ✅ 전역 변수 정의
const MAX_ATTEMPTS = 3;
const LIMIT_TIME_MS = 60 * 1000; // 1분 제한
const loginBtn = document.getElementById("login_btn");
const emailInput = document.getElementById("typeEmailX");
const passwordInput = document.getElementById("typePasswordX");
const idsave_check = document.getElementById("idSaveCheck");
const statusBox = document.getElementById("status_msg");

// ✅ 쿠키 관련 함수
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ✅ XSS 필터링
function check_xss(input) {
  const DOMPurify = window.DOMPurify;
  const sanitized = DOMPurify.sanitize(input);
  if (sanitized !== input) {
    alert("XSS 공격 가능성이 있는 입력값을 발견했습니다.");
    return false;
  }
  return sanitized;
}

// ✅ 이메일 형식 검사
function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ✅ 로그인 실패 처리
function login_failed() {
  let failCount = parseInt(getCookie("login_fail")) || 0;
  failCount++;
  setCookie("login_fail", failCount, 1);

  if (failCount >= MAX_ATTEMPTS) {
    const blockUntil = Date.now() + LIMIT_TIME_MS;
    setCookie("login_block", blockUntil, 1);
    setLoginButtonVisibility(false); // 버튼 숨기기
    showBlockStatus(blockUntil); // 차단 상태 메시지 표시
  } else {
    alert(`로그인 실패! 현재 ${failCount}회 실패했습니다.`);
    if (failCount === MAX_ATTEMPTS - 1) {
      alert("로그인 시도 가능 횟수가 1번 남았습니다.");
    }
  }
}

// ✅ 로그인 차단 상태 메시지 표시
function showBlockStatus(blockUntil) {
  const interval = setInterval(() => {
    const remaining = blockUntil - Date.now();
    if (remaining <= 0) {
      clearInterval(interval);
      deleteCookie("login_fail");
      deleteCookie("login_block");
      statusBox.style.display = "none";
      setLoginButtonVisibility(true); // 버튼 다시 보이게
    } else {
      statusBox.style.display = "block";
      const seconds = Math.ceil(remaining / 1000);
      statusBox.innerHTML = `
        <div style="border: 2px solid red; border-radius: 10px; padding: 10px; background-color: #ffe0e0;">
          로그인 시도 횟수를 초과했습니다.<br>
          ${seconds}초 후 다시 시도해주세요.
        </div>
      `;
    }
  }, 1000);
}

// ✅ 로그인 입력 검사
function check_input() {
  const rawEmail = emailInput.value.trim();
  const rawPassword = passwordInput.value.trim();

  if (
    getCookie("login_block") &&
    parseInt(getCookie("login_block")) > Date.now()
  ) {
    showBlockStatus(parseInt(getCookie("login_block")));
    return false;
  }

  if (rawEmail === "") {
    alert("이메일을 입력하세요.");
    return false;
  }
  if (rawPassword === "") {
    alert("비밀번호를 입력하세요.");
    return false;
  }
  if (!validateEmailFormat(rawEmail)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false;
  }
  if (rawEmail.length < 5) {
    alert("아이디는 최소 5글자 이상 입력해야 합니다.");
    return false;
  }
  if (rawPassword.length < 10) {
    alert("비밀번호는 반드시 10글자 이상 입력해야 합니다.");
    return false;
  }
  const hasSpecialChar = /[!,@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(
    rawPassword
  );
  const hasUpper = /[A-Z]/.test(rawPassword);
  const hasLower = /[a-z]/.test(rawPassword);
  if (!hasSpecialChar) {
    alert("패스워드는 특수문자를 1개 이상 포함해야 합니다.");
    return false;
  }
  if (!hasUpper || !hasLower) {
    alert("패스워드는 대소문자를 모두 포함해야 합니다.");
    return false;
  }

  const sanitizedEmail = check_xss(rawEmail);
  const sanitizedPassword = check_xss(rawPassword);
  if (!sanitizedEmail || !sanitizedPassword) {
    return false;
  }

  // ✅ 아이디 저장 체크
  if (idsave_check.checked) {
    setCookie("id", sanitizedEmail, 1);
  } else {
    deleteCookie("id");
  }

  alert("로그인 성공! 메인 페이지로 이동합니다.");
  window.location.href = "/login/index_login.html";
  return true;
}

// ✅ 로그인 버튼 숨기기/보이기 함수
function setLoginButtonVisibility(isVisible) {
  if (isVisible) {
    loginBtn.style.visibility = "visible"; // 보이게 설정
  } else {
    loginBtn.style.visibility = "hidden"; // 숨기기 (공간을 차지하지만 보이지 않음)
  }
}

// ✅ 초기화 함수
function init() {
  const savedId = getCookie("id");
  const blockUntil = parseInt(getCookie("login_block"));

  if (savedId) {
    emailInput.value = decodeURIComponent(savedId);
    idsave_check.checked = true;
  }

  if (blockUntil && blockUntil > Date.now()) {
    loginBtn.style.display = "none";
    showBlockStatus(blockUntil);
  }
}

// ✅ 이벤트 등록
loginBtn.addEventListener("click", () => {
  const result = check_input();
  if (!result) {
    login_failed();
  }
});

window.onload = init;


// ✅ 전역 변수 정의: 로그인 시도 횟수와 제한 시간, 버튼, 입력 필드, 체크박스, 상태 메시지를 위한 변수 정의
// ✅ 쿠키 관련 함수:
// - setCookie: 쿠키를 설정하는 함수
// - getCookie: 쿠키에서 값을 가져오는 함수
// - deleteCookie: 쿠키를 삭제하는 함수
// ✅ XSS 필터링: 사용자 입력값에서 XSS 공격을 방지하는 함수
// ✅ 이메일 형식 검사: 이메일이 올바른 형식인지 검증하는 함수
// ✅ 로그인 실패 처리: 로그인 실패 시, 실패 횟수를 증가시키고, 최대 실패 횟수에 도달하면 로그인 차단
// ✅ 로그인 차단 상태 메시지 표시: 로그인 차단 상태일 때, 남은 시간과 차단 메시지를 보여주는 함수
// ✅ 로그인 입력 검사: 로그인 입력값을 검사하고, 유효성 체크 후 로그인 처리
// ✅ 초기화 함수: 저장된 아이디와 로그인 차단 상태를 초기화하고, 페이지 로드 시 상태를 설정하는 함수
// ✅ 이벤트 등록: 로그인 버튼 클릭 시 입력값 검사를 실행하고, 실패 시 로그인 실패 처리
// ✅ 페이지 로드 시 초기화: 페이지가 로드될 때 초기화 함수 호출
