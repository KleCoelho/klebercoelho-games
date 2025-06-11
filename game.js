
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
const rabbits = [];
const bullets = [];

const player = { x: 370, y: 450, width: 60, height: 30, speed: 5 };

function drawPlayer() {
  ctx.fillStyle = "#00FFAA";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawRabbits() {
  rabbits.forEach((r, index) => {
    ctx.fillStyle = "#FF00FF";
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
    ctx.fill();
    r.y += r.speed;

    if (r.y > canvas.height) {
      rabbits.splice(index, 1);
    }
  });
}

function drawBullets() {
  bullets.forEach((b, index) => {
    ctx.fillStyle = "red";
    ctx.fillRect(b.x, b.y, 4, 10);
    b.y -= 7;

    if (b.y < 0) bullets.splice(index, 1);
  });
}

function detectCollisions() {
  rabbits.forEach((r, rIndex) => {
    bullets.forEach((b, bIndex) => {
      const dx = r.x - b.x;
      const dy = r.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < r.size) {
        bullets.splice(bIndex, 1);
        rabbits.splice(rIndex, 1);
        score += 10;
        document.getElementById("score").innerText = "Pontuação: " + score;
      }
    });
  });
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawRabbits();
  drawBullets();
  detectCollisions();
  requestAnimationFrame(updateGame);
}

function spawnRabbit() {
  const x = Math.random() * (canvas.width - 20) + 10;
  rabbits.push({ x, y: 0, size: 20, speed: 2 + Math.random() * 2 });
}

function shoot() {
  bullets.push({ x: player.x + player.width / 2, y: player.y });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "Spacebar") shoot();
});

setInterval(spawnRabbit, 1000);
updateGame();
