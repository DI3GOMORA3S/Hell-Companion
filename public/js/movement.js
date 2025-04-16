// ##########################################
// ##### Movimiento y zoom en la página #####
const viewport = document.getElementById("viewport");
const contenedor = document.getElementById("map-container");

let scale = 1;
let posX = -500;
let posY = -500;
let isDragging = false;
let startX, startY;

function actualizarTransformacion() {
  contenedor.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

actualizarTransformacion();

viewport.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = 0.1;
  const previousScale = scale;

  scale += e.deltaY > 0 ? -zoomFactor : zoomFactor;
  scale = Math.min(Math.max(scale, 0.5), 4);

  const rect = contenedor.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const ratio = scale / previousScale;
  
  posX -= offsetX * (ratio - 1);
  posY -= offsetY * (ratio - 1);

  actualizarTransformacion();
});

viewport.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
  viewport.style.cursor = "grabbing";
});

viewport.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  actualizarTransformacion();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  viewport.style.cursor = "grab";
});
// ##### Movimiento y zoom en la página #####
// ##########################################