// Vídeos
const v1 = document.getElementById("video1");
v1.style.opacity = 1;

// CONTADOR ⏳ — hoje 20h → se passou, próxima quinta
let eventDate = new Date();
eventDate.setHours(20, 0, 0, 0);

function getNextThursday() {
    const now = new Date();
    let diff = (4 - now.getDay() + 7) % 7;
    if (diff === 0) diff = 7;
    const nextThu = new Date();
    nextThu.setDate(now.getDate() + diff);
    nextThu.setHours(20, 0, 0, 0);
    return nextThu;
}

// Se já passou das 20h hoje → próxima quinta
if (eventDate - new Date() <= 0) {
    eventDate = getNextThursday();
}

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.getElementById("countdown").innerHTML =
            `<div class="message">até a próxima quinta</div>`;
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = d.toString().padStart(2, "0");
    document.getElementById("hours").textContent = h.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = m.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = s.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Estrelas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.onresize = resize;

const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2,
}));

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += 0.3;

        if (s.y > innerHeight) {
            s.y = 0;
            s.x = Math.random() * innerWidth;
        }
    }
    requestAnimationFrame(drawStars);
}
drawStars();
