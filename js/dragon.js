const canvas = document.getElementById("dragonCurveCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

let time = 500;
let tamanhoMax = 8;
let dragonCurvePath = [];
let currentIteration = 0;

// Initial dragon curve seed
dragonCurvePath.push({
  x: canvas.width / 4,
  y: canvas.height / 2,
});
dragonCurvePath.push({
  x: (3 * canvas.width) / 4,
  y: canvas.height / 2,
});

function drawDragonCurve() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(dragonCurvePath[0].x, dragonCurvePath[0].y);

  for (let i = 1; i < dragonCurvePath.length; i++) {
    ctx.lineTo(dragonCurvePath[i].x, dragonCurvePath[i].y);
  }

  ctx.strokeStyle = "white";
  ctx.stroke();
}

function generateDragonCurve() {
  const newPath = [];

  for (let i = 0; i < dragonCurvePath.length - 1; i++) {
    const p1 = dragonCurvePath[i];
    const p2 = dragonCurvePath[i + 1];

    const newX = (p1.x + p2.x) / 2 + (p2.y - p1.y) / 2;
    const newY = (p1.y + p2.y) / 2 - (p2.x - p1.x) / 2;

    newPath.push(p1);
    newPath.push({ x: newX, y: newY });
  }

  newPath.push(dragonCurvePath[dragonCurvePath.length - 1]);

  dragonCurvePath = newPath;
}

function drawNextStep() {
  if (currentIteration < tamanhoMax) {
    generateDragonCurve();
    drawDragonCurve();
    currentIteration++;

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
  if (tamanhoMax < 12) {
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
