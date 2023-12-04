const canvas = document.getElementById("kochSnowflakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 3000;
canvas.height = 3000;

let time = 500;
let tamanhoMax = 5;
const kochSnowflakePath = [];

// Initial Koch snowflake seed
kochSnowflakePath.push({
  x: canvas.width / 3,
  y: (2 * canvas.height) / 3,
});
kochSnowflakePath.push({
  x: (2 * canvas.width) / 3,
  y: (2 * canvas.height) / 3,
});

function drawKochSnowflake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(kochSnowflakePath[0].x, kochSnowflakePath[0].y);

  for (let i = 1; i < kochSnowflakePath.length; i++) {
    ctx.lineTo(kochSnowflakePath[i].x, kochSnowflakePath[i].y);
  }

  ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function generateKochSnowflake() {
  const newPath = [];

  for (let i = 0; i < kochSnowflakePath.length - 1; i++) {
    const p1 = kochSnowflakePath[i];
    const p2 = kochSnowflakePath[i + 1];

    const deltaX = (p2.x - p1.x) / 3;
    const deltaY = (p2.y - p1.y) / 3;

    const mid1 = { x: p1.x + deltaX, y: p1.y + deltaY };
    const mid2 = { x: p1.x + 2 * deltaX, y: p1.y + 2 * deltaY };

    const angle = Math.PI / 3;
    const deltaXRotated =
      (mid2.x - mid1.x) * Math.cos(angle) - (mid2.y - mid1.y) * Math.sin(angle);
    const deltaYRotated =
      (mid2.x - mid1.x) * Math.sin(angle) + (mid2.y - mid1.y) * Math.cos(angle);

    const tip = { x: mid1.x + deltaXRotated, y: mid1.y + deltaYRotated };

    newPath.push(p1, mid1, tip, mid2);
  }

  newPath.push(kochSnowflakePath[kochSnowflakePath.length - 1]);
  kochSnowflakePath.push(...newPath);
}

function drawNextStep() {
  if (kochSnowflakePath.length <= Math.pow(4, tamanhoMax)) {
    generateKochSnowflake();
    drawKochSnowflake();

    setTimeout(() => {
      requestAnimationFrame(drawNextStep);
    }, time);
  }
}

const butaoAumentarIteracoes = document.querySelector("#plusIteracoes");
const butaoAumentarTempo = document.querySelector("#plusTempo");
const butaoDiminuirIteracoes = document.querySelector("#minusIteracoes");
const butaoDiminuirTempo = document.querySelector("#minusTempo");
const spanIteracoes = document.querySelector("#iteracoes");
const spanTempo = document.querySelector("#tempo");

function updateIteracoes() {
  spanIteracoes.innerHTML = `Número de iterações: ${tamanhoMax}`;
}

function updateTempo() {
  spanTempo.innerHTML = `Tempo entre cada iteração: ${time}ms`;
}

updateIteracoes();
updateTempo();
const butaoComecar = document.querySelector("#start");

butaoComecar.addEventListener("click", () => {
  drawNextStep();

  butaoComecar.disabled = true;
});

butaoAumentarIteracoes.addEventListener("click", () => {
  if (tamanhoMax < 7) {
    tamanhoMax++;
    updateIteracoes();
  }
});

butaoAumentarTempo.addEventListener("click", () => {
  time += 500;
  updateTempo();
});

butaoDiminuirIteracoes.addEventListener("click", () => {
  if (tamanhoMax > 1) {
    tamanhoMax--;
    updateIteracoes();
  }
});

butaoDiminuirTempo.addEventListener("click", () => {
  if (time > 500) {
    time -= 500;
    updateTempo();
  }
});
