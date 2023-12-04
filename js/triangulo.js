const canvas = document.getElementById("triangleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
let time = 500;
let tamanhoMax = 6;

const initialSize = 500;
let currentDepth = 0;

function drawTriangle(x, y, size) {
  const height = (Math.sqrt(3) / 2) * size;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size / 2, y - height);
  ctx.closePath();

  ctx.strokeStyle = "white";
  ctx.stroke();
}

function drawSierpinski(x, y, size, depth) {
  if (depth === 0) {
    drawTriangle(x, y, size);
  } else {
    const newSize = size / 2;
    const newHeight = (Math.sqrt(3) / 2) * newSize;

    drawSierpinski(x, y, newSize, depth - 1);
    drawSierpinski(x + newSize, y, newSize, depth - 1);
    drawSierpinski(x + newSize / 2, y - newHeight, newSize, depth - 1);
  }
}

function drawNextStep() {
  drawSierpinski(
    canvas.width / 4,
    canvas.height - 50,
    initialSize,
    currentDepth
  );
  currentDepth++;

  if (currentDepth <= tamanhoMax) {
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
  if (tamanhoMax < 9) {
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
