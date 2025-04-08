let countdown = 50;
let countdownTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    startCountdown();
});

function startCountdown() {
    const divClock = document.getElementById('Time');

    if (!divClock) {
        console.error("Time 요소를 찾을 수 없습니다!");
        return;
    }

    updateCountdown();
    countdownTimer = setTimeout(closeWindow, 50000); // 50초 뒤 자동 닫힘
}

function updateCountdown() {
    const divClock = document.getElementById('Time');
    if (countdown > 0) {
        divClock.innerText = `${countdown}초 후 창이 닫힙니다.`;
        countdown--;
        setTimeout(updateCountdown, 1000);
    }
}

function closeWindow() {
    window.close();
}

function closePopup() {
    const checkbox = document.getElementById('check_popup');
    if (checkbox.checked) {
        setCookie("popupYN", "N", 1); // 하루 동안 안 뜨게
        alert("하루 동안 팝업이 뜨지 않습니다.");
        window.close();
    }
}
