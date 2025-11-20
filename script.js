// Vídeos
const v1 = document.getElementById("video1");
const v2 = document.getElementById("video2");

function setVideo(num) {
    if (num === 1) {
        v1.style.opacity = 1;
        v2.style.opacity = 0;
    } else {
        v1.style.opacity = 0;
        v2.style.opacity = 1;
    }
}
setVideo(1);

// Contador — evento hoje às 20h
const eventDate = new Date();
eventDate.setHours(20, 0, 0, 0); // Hoje às 20:00

// Se já passou das 20h, muda para amanhã às 20h
if (eventDate - new Date() <= 0) {
    eventDate.setDate(eventDate.getDate() + 1);
}

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "Começou!";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Estrelas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("d");

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

// Copiar convite
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(
        "Você está convidado para o Pós Conectados! Quinta • 20h00 — Comunidade Nsa. Senhora Aparecida, Avenida C, 212 — Setor Água Branca."
    );
    alert("Convite copiado!");
};
