class SignUp {
  constructor(name, email, password, re_password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.re_password = re_password;
    this.secretKey = "MySuperSecretKey123!"; // 암호화 키
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|\\:;"'<>,.?/~]).{10,}$/.test(
      password
    );
  }

  encryptData(data) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    ).toString();
  }

  decryptData(encrypted) {
    const bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  register() {
    if (!this.name || !this.email || !this.password || !this.re_password) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    if (!this.isValidPassword(this.password)) {
      alert(
        "비밀번호는 10자 이상이며 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return false;
    }

    if (this.password !== this.re_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password, // 실제론 해싱 필요
    };

    // 암호화해서 저장
    const encryptedUserData = this.encryptData(userData);
    sessionStorage.setItem("user", encryptedUserData);

    alert(`${this.name}님 안녕하세요!`);

    // 복호화해서 콘솔 출력 (추가한 부분)
    const decryptedUserData = this.decryptData(encryptedUserData);
    console.log("복호화된 사용자 데이터:", decryptedUserData);

    window.location.href = "/login/index_login.html";
    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("nickname").value.trim();
    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const re_password = document.getElementById("confirm-password").value;

    const newUser = new SignUp(name, email, password, re_password);
    newUser.register();
  });
});
