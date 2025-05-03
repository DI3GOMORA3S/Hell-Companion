const tooltip = document.getElementById("tooltip");

let datosPlanetas = [];
let planetInfo = [];

// 🔄 Solicita datos principales de planetas
function obtenerDatos() {
  fetch('/api/planetas')
    .then(res => res.json())
    .then(data => {
      datosPlanetas = data;
      actualizarTooltips();
      datosBasePlaneta(); // ⬅️ Se ejecuta cuando ya están cargados los planetas
    })
    .catch(err => {
      console.error('Error al actualizar los datos:', err);
    });
}

// 🔄 Solicita información secundaria de planetas
function ObtPlanetInfo() {
  fetch('/api/planet-info')
    .then(res => res.json())
    .then(data => {
      planetInfo = data;
      actualizarTooltips();
    })
    .catch(err => {
      console.error('Error al actualizar los datos:', err);
    });
}

// 🟡 Muestra los tooltips sobre los planetas
function actualizarTooltips() {
  const planetasDOM = document.querySelectorAll('.planeta');

  planetasDOM.forEach((el) => {
    const index = parseInt(el.dataset.index);
    const planeta = datosPlanetas.find(p => p.index === index);

    if (planeta) {
      el.addEventListener('mouseenter', () => {
        let liberated = 1000000;

        if (planeta.owner != 1) {
          liberated = (liberated - planeta.health) / 10000;
        } else {
          liberated = planeta.health / 10000;
        }

        let dueño = ""
        switch (planeta.owner) {
          case 1:
            dueño = "super-earth-title"
            break;

          case 2:
            dueño = "terminid-title"
            break;

          case 3:
            dueño = "automaton-title"
            break;

          case 4:
            dueño = "iluminate-title"
            break;
      
        }

        const nombre = planetInfo[index]?.name?.toUpperCase() || `Planeta ${index}`;
        const sector = planetInfo[index]?.sector.toUpperCase() || `Sector`

        tooltip.innerHTML = ` 
          <div class="planeta-card">
            <div class="header">
              <img draggable="false" src="./images/icons/faction-icon-${planeta.owner}.webp" style="width: 40px; height: 40px; object-fit: contain;" alt="">
              <span class="${dueño}">${nombre}  |  ${sector}</span>
            </div>
            <div class="progreso">
              <div class="barra">
                <div class="liberado" style="width: ${liberated}%;"></div>
              </div>
              <span class="porcentaje">${liberated}% LIBERATED</span>
            </div>
            <div class="stats">
              <div class="jugadores">
                <img draggable="false" src="./images/divers-icon.svg" style="width: 20px; height: 20px;" alt="">
                ${planeta.players}
              </div>
              <div class="jugadores">
                    <span class="porcentaje">Regen/Sec ${planeta.regenPerSecond}%</span>
              </div>
            </div>
          </div>
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

// 🔧 Agrega clases a planetas según el dueño
function datosBasePlaneta() {
  document.querySelectorAll('.planeta').forEach((planeta) => {
    const index = parseInt(planeta.dataset.index);
    const datos = datosPlanetas.find(p => p.index === index);

    if (!datos) return;

    switch (datos.owner) {
      case 1:
        planeta.classList.add('super-earth-owned');
        break;
      case 2:
        planeta.classList.add('terminid-owned');
        break;
      case 3:
        planeta.classList.add('automaton-owned');
        break;
      case 4:
        planeta.classList.add('iluminate-owned');
        break;
    }
  });
}

// 🔄 Carga inicial
obtenerDatos();
ObtPlanetInfo();

// 🔁 Refrescar datos cada 60 segundos
setInterval(obtenerDatos, 60000);
