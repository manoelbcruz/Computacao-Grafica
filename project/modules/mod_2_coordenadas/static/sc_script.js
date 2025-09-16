const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const liveCoords = document.getElementById("live-coords");
const clickedCoords = document.getElementById("clicked-coords");
let Xmax = 100.3,
  Xmin = 10.5,
  Ymax = 100.4,
  Ymin = 15.2;

function updateBoundsDisplay() {
  document.getElementById("xmin").textContent = Xmin;
  document.getElementById("xmax").textContent = Xmax;
  document.getElementById("ymin").textContent = Ymin;
  document.getElementById("ymax").textContent = Ymax;
}
updateBoundsDisplay();
document.getElementById("set-coordinates-btn").addEventListener("click", () => {
  const inputXmax = parseFloat(document.getElementById("input-xmax").value);
  const inputXmin = parseFloat(document.getElementById("input-xmin").value);
  const inputYmax = parseFloat(document.getElementById("input-ymax").value);
  const inputYmin = parseFloat(document.getElementById("input-ymin").value);
  if (
    !isNaN(inputXmax) &&
    !isNaN(inputXmin) &&
    !isNaN(inputYmax) &&
    !isNaN(inputYmin)
  ) {
    Xmax = inputXmax;
    Xmin = inputXmin;
    Ymax = inputYmax;
    Ymin = inputYmin;
    updateBoundsDisplay();
  } else {
    alert("Valores inválidos.");
  }
});

function setPixel(x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(x, canvas.height - y, 1, 1);
}

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(canvas.height - (event.clientY - rect.top));
  const ndc = inpToNdc(x, y, canvas.width, canvas.height);
  const world = ndcToWd(ndc.ndcx, ndc.ndcy);
  liveCoords.innerHTML = `<strong>Mundo:</strong><br>(${world.worldX.toFixed(
    3
  )}, ${world.worldY.toFixed(
    3
  )})<br><strong>Dispositivo:</strong><br>(${x}, ${y})`;
});

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(canvas.height - (event.clientY - rect.top));
  setPixel(x, y);
  const ndc = inpToNdc(x, y, canvas.width, canvas.height);
  const world = ndcToWd(ndc.ndcx, ndc.ndcy);
  clickedCoords.innerHTML = `<strong>Mundo:</strong><br>(${world.worldX.toFixed(
    3
  )}, ${world.worldY.toFixed(
    3
  )})<br><strong>Dispositivo:</strong><br>(${x}, ${y})`;
});

document.getElementById("set-world-btn").addEventListener("click", () => {
  const inputX = parseFloat(document.getElementById("input-x").value);
  const inputY = parseFloat(document.getElementById("input-y").value);
  if (isNaN(inputX) || isNaN(inputY)) {
    alert("Coordenadas inválidas.");
    return;
  }
  const ndcx = (inputX - Xmin) / (Xmax - Xmin);
  const ndcy = (inputY - Ymin) / (Ymax - Ymin);
  const pixelX = Math.round(ndcx * (canvas.width - 1));
  const pixelY = Math.round(ndcy * (canvas.height - 1));
  setPixel(pixelX, pixelY);
  clickedCoords.innerHTML = `<strong>Mundo:</strong><br>(${inputX.toFixed(
    3
  )}, ${inputY.toFixed(
    3
  )})<br><strong>Dispositivo:</strong><br>(${pixelX}, ${pixelY})`;
});

function inpToNdc(x, y, width, height) {
  return {
    ndcx: x / (width - 1),
    ndcy: y / (height - 1),
  };
}

function ndcToWd(ndcx, ndcy) {
  return {
    worldX: ndcx * (Xmax - Xmin) + Xmin,
    worldY: ndcy * (Ymax - Ymin) + Ymin,
  };
}
