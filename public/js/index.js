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

        // prueba de liberated real
        let liberated = 1000000;
        if (planeta.owner != 1){
          liberated = liberated - planeta.health;
          liberated = liberated / 10000
        } else {
          liberated = planeta.health
          liberated = liberated / 10000
        }
        // prueba de liberated real

        // prueba colores de barras
        let dueño = ""
        switch (planeta.owner) {
          case 1:
            dueño = "super-earth-owned"
            break;

          case 2:
            dueño = "terminid-owned"
            break;

          case 3:
            dueño = "automaton-owned"
            break;

          case 4:
            dueño = "iluminate-owned"
            break;
      
        }
        // prueba colores de barras

        tooltip.innerHTML = ` 
            <div class="planeta-card">
              <div class="header">
                <img draggable="false" src="./images/icons/faction-icon-${planeta.owner}.webp" style="width: 40px; height: 40px; object-fit: contain;" alt="">
                <span class="nombre">${planetInfo[index].name.toUpperCase()}</span>
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

// 🔄 Carga inicial
obtenerDatos();
ObtPlanetInfo()

// 🔁 Refrescar datos cada 60 segundos (60000 ms)
setInterval(obtenerDatos, 60000);