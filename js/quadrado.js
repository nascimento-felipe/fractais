const canvas = document.getElementById("squareCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

let time = 500;
let tamanhoMax = 4;

const initialSize = 500;
let currentDepth = 0;

function drawSquare(x, y, size) {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.rect(x, y, size, size);
  ctx.stroke();
}

function drawSierpinski(x, y, size, depth) {
  if (depth === 0) {
    drawSquare(x, y, size);
  } else {
    const newSize = size / 3;

    drawSierpinski(x, y, newSize, depth - 1);
    drawSierpinski(x + newSize, y, newSize, depth - 1);
    drawSierpinski(x + 2 * newSize, y, newSize, depth - 1);

    drawSierpinski(x, y + newSize, newSize, depth - 1);
    drawSierpinski(x + 2 * newSize, y + newSize, newSize, depth - 1);

    drawSierpinski(x, y + 2 * newSize, newSize, depth - 1);
    drawSierpinski(x + newSize, y + 2 * newSize, newSize, depth - 1);
    drawSierpinski(x + 2 * newSize, y + 2 * newSize, newSize, depth - 1);
  }
}

function drawNextStep() {
  drawSierpinski(
    canvas.width / 4,
    canvas.height / 4,
    initialSize,
    currentDepth
  );
  currentDepth++;

  if (currentDepth <= tamanhoMax) {
    // Set the desired depth
    setTimeout(() => {
      requestAnimationFrame(drawNextStep);
    }, time); // Adjust the delay (in milliseconds) between frames
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
  if (tamanhoMax < 5) {
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
