const contenedor = document.getElementById("map-container");
let scale = 1;
let posX = -500; // Para que quede centrado inicialmente
let posY = -500;
let isDragging = false;
let startX, startY;

function actualizarTransformacion() {
  contenedor.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

actualizarTransformacion(); // Inicial

// Zoom con el scroll centrado en el cursor
document.getElementById("viewport").addEventListener("wheel", (e) => {
  e.preventDefault();

  const zoomFactor = 0.1;
  const prevScale = scale;
  scale += e.deltaY > 0 ? -zoomFactor : zoomFactor;
  scale = Math.min(Math.max(scale, 0.5), 4);

  const rect = contenedor.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const dx = (mouseX / prevScale) - (mouseX / scale);
  const dy = (mouseY / prevScale) - (mouseY / scale);

  posX += dx * scale;
  posY += dy * scale;

  actualizarTransformacion();
});

// Pan (arrastrar)
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  actualizarTransformacion();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});