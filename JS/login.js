// 로그인 시도 횟수 제한용 변수
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;

// XSS 필터링 함수
const check_xss = (input) => {
  const DOMPurify = window.DOMPurify;
  const sanitized = DOMPurify.sanitize(input);
  if (sanitized !== input) {
    alert("XSS 공격 가능성이 있는 입력값을 발견했습니다.");
    return false;
  }
  return sanitized;
};

// 이메일 형식 검사
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 메인 입력 검사 함수
const check_input = () => {
  if (loginAttempts >= MAX_ATTEMPTS) {
    alert("로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
    return false;
  }

  const emailInput = document.getElementById("typeEmailX");
  const passwordInput = document.getElementById("typePasswordX");

  const rawEmail = emailInput.value.trim();
  const rawPassword = passwordInput.value.trim();

  // 공백 체크
  if (rawEmail === "") {
    alert("이메일을 입력하세요.");
    return false;
  }
  if (rawPassword === "") {
    alert("비밀번호를 입력하세요.");
    return false;
  }

  // 이메일 형식 검사
  if (!validateEmailFormat(rawEmail)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false;
  }

  // 길이 및 보안 조건 검사
  if (rawEmail.length < 5) {
    alert("아이디는 최소 5글자 이상 입력해야 합니다.");
    return false;
  }
  if (rawPassword.length < 10) {
    alert("비밀번호는 반드시 10글자 이상 입력해야 합니다.");
    return false;
  }
  const hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
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

  // XSS 검사
  const sanitizedEmail = check_xss(rawEmail);
  const sanitizedPassword = check_xss(rawPassword);
  if (!sanitizedEmail || !sanitizedPassword) {
    return false;
  }

  // ✅ 모든 조건 통과 → 이동
  alert("로그인 성공! 메인 페이지로 이동합니다.");
  window.location.href = "/login/index_login.html";

  return true;
};

// 이벤트 리스너 등록
document.getElementById("login_btn").addEventListener("click", () => {
  const success = check_input();
  if (!success) {
    loginAttempts++;
    console.warn(`실패한 로그인 시도: ${loginAttempts}회`);
  }
});
