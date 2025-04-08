function addJavascript(jsname) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', jsname);
    head.appendChild(script);
}

// 중복 제거
addJavascript('js/security.js');
addJavascript('js/cookie.js');

function pop_up() {
    const cookieCheck = getCookie("popupYN");
    if (cookieCheck !== "N") {
        window.open("../popup/popup.html", "팝업테스트", "width=300, height=300, top=10, left=10");
    }
}

function setCookie(name, value, expiredays) {
    const date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = `${escape(name)}=${escape(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === name) return val;
    }
    return null;
}

function show_clock() {
    const currentDate = new Date();
    const divClock = document.getElementById('divClock');
    let msg = currentDate.getHours() > 12 ? "오후" : "오전";
    msg += ` ${currentDate.getHours() % 12}시 ${currentDate.getMinutes()}분 ${currentDate.getSeconds()}초`;
    divClock.innerText = msg;

    if (currentDate.getMinutes() > 58) {
        divClock.style.color = "red";
    }

    setTimeout(show_clock, 1000);
}
