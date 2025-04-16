async function obtenerEstadoGuerra() {
  try {
    const respuesta = await axios.get('https://helldiverstrainingmanual.com/api/v1/war/status');
    const planetas = respuesta.data.planetStatus;
    console.log(planetas[0])

  } catch (error) {
    console.error('❌ Error al consultar la API:', error.message);
  }
}

obtenerEstadoGuerra();




const tooltip = document.getElementById("tooltip");

let datosPlanetas = [];

function obtenerDatos() {
  fetch('/api/planetas')
    .then(res => res.json())
    .then(data => {
      datosPlanetas = data;
      console.log('✅ Datos actualizados:', datosPlanetas);
      actualizarTooltips();
    })
    .catch(err => {
      console.error('Error al actualizar los datos:', err);
    });
}

let planetInfo = []

function ObtPlanetInfo() {
    fetch('/api/planet-info')
    .then(res => res.json())
    .then(data => {
        planetInfo = data;
      console.log('✅ Datos actualizados:', planetInfo);
      actualizarTooltips();
    })
    .catch(err => {
      console.error('Error al actualizar los datos:', err);
    });
}

// Esta función vuelve a conectar eventos y contenido si es necesario
function actualizarTooltips() {
  const planetasDOM = document.querySelectorAll('.planeta');

  planetasDOM.forEach((el) => {
    const index = parseInt(el.dataset.index);
    const planeta = datosPlanetas.find(p => p.index === index);

    if (planeta) {
      el.addEventListener('mouseenter', () => {
        tooltip.innerHTML = `
            <h3>${planetInfo[index].name}</h3>
            <strong>Planeta #${index}</strong><br>
            Jugadores: ${planeta.players}<br>
            Vida: ${planeta.health}
            <p>${planetInfo[index].biome?.description ? planetInfo[index].biome.description : ""}</p>
        `;
        tooltip.style.display = "block";
      });

      el.addEventListener('mouseleave', () => {
        tooltip.style.display = "none";
      });

      el.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.clientX + 10 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
      });
    }
  });
}

// 🔄 Carga inicial
obtenerDatos();
ObtPlanetInfo()

// 🔁 Refrescar datos cada 30 segundos (30000 ms)
setInterval(obtenerDatos, 30000);






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

// 📌 Zoom centrado en el cursor
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

// 📌 Pan (arrastrar)
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