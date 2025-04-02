// 🔹 다양한 데이터 타입 선언
let number = 5;
let str = "문자열 입력"; // ' ' 도 사용 가능
let prime = 1.5123;
let is_ok = true;  // 참 (boolean)
let is_not = false; // 거짓 (boolean)
let undefi;  // 초기화 X
let empty = null; // 비어있는 값 (null)

console.log(undefi, empty); // 여러 개 출력

// 🔹 Symbol 타입 (고유한 값)
const sym1 = Symbol("test");
let symbolVar1 = sym1;
console.log(symbolVar1.toString()); // 심볼을 문자열로 변환 후 출력

// 🔹 배열 (다양한 데이터 포함 가능)
const airline = ["비행기", 320, "airbus", ["V1", true]];
console.log(airline);

// 🔹 객체 (Object) 생성
const obj1 = {}; // 빈 객체
const obj2 = {
    name: "John Doe",
    age: 30,
    isMale: true,
};
console.log(obj1, obj2);

// 🔹 Map 객체 활용 (키-값 저장)
const users = new Map(); // 사용자 정보 저장
users.set("user1", { id: 1, password: "password123" });
users.set("user2", { id: 2, password: "password456" });

// 🔹 Map 반복문 활용 (모든 사용자 정보 출력)
for (const [username, user] of users) {
    console.log(`👤 사용자 이름: ${username}`);
    console.log(`🔑 ID: ${user.id}, 비밀번호: ${user.password}`);
}

// 🔹 Set 객체 활용 (중복 없는 데이터 저장)
const usernames = new Set();
usernames.add("user1");
usernames.add("user2");

// 🔹 Set 반복문 활용 (모든 사용자 이름 출력)
for (const username of usernames) {
    console.log(`📌 사용자 이름: ${username}`);
}
