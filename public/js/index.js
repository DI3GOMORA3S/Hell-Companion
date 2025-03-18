function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Array con todas las estratagemas y sus detalles
const stratagems = [
    // Support Weapons
    {name: "machine-gun", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"], img: "./images/stratagems/machine-gun.svg"},
    {name: "anti-materiel-rifle", keys: ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"], img: "./images/stratagems/anti-materiel-rifle.svg"},
    {name: "stalwart", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowLeft"], img: "./images/stratagems/stalwart.svg"},
    {name: "expendable-anti-tank", keys: ["ArrowDown", "ArrowDown", "ArrowLeft", "ArrowUp", "ArrowRight"], img: "./images/stratagems/expendable-anti-tank.svg"},
    {name: "recoilless-rifle", keys: ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft"], img: "./images/stratagems/recoilless-rifle.svg"},
    {name: "flamethrower", keys: ["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowUp"], img: "./images/stratagems/flamethrower.svg"},
    {name: "autocannon", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowRight"], img: "./images/stratagems/autocannon.svg"},
    {name: "heavy-machine-gun", keys: ["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowDown"], img: "./images/stratagems/heavy-machine-gun.svg"},
    {name: "airburst-rocket-launcher", keys: ["ArrowDown", "ArrowUp", "ArrowUp", "ArrowLeft", "ArrowRight"], img: "./images/stratagems/airburst-rocket-launcher.svg"},
    {name: "commando", keys: ["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"], img: "./images/stratagems/commando.svg"},
    {name: "railgun", keys: ["ArrowDown", "ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], img: "./images/stratagems/railgun.svg"},
    {name: "spear", keys: ["ArrowDown", "ArrowDown", "ArrowUp", "ArrowDown", "ArrowDown"], img: "./images/stratagems/spear.svg"},
 
    // Orbital Cannons
    {name: "orbital-gatling-barrage", keys: ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "ArrowUp"], img: "./images/stratagems/orbital-gatling-barrage.svg"},
    {name: "orbital-airburst-strike", keys: ["ArrowRight", "ArrowRight", "ArrowRight"], img: "./images/stratagems/orbital-airburst-strike.svg"},
    {name: "orbital-120mm-he-barrage", keys: ["ArrowRight", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowDown"], img: "./images/stratagems/orbital-120mm-he-barrage.svg"},
    {name: "orbital-380mm-he-barrage", keys: ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowDown"], img: "./images/stratagems/orbital-380mm-he-barrage.svg"},
    {name: "orbital-walking-barrage", keys: ["ArrowRight", "ArrowDown", "ArrowRight", "ArrowDown", "ArrowRight", "ArrowDown"], img: "./images/stratagems/orbital-walking-barrage.svg"},
    {name: "orbital-laser", keys: ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowDown"], img: "./images/stratagems/orbital-laser.svg"},
    {name: "orbital-napalm-barrage", keys: ["ArrowRight", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"], img: "./images/stratagems/orbital-napalm-barrage.svg"},
    {name: "orbital-railcannon-strike", keys: ["ArrowRight", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowRight"], img: "./images/stratagems/orbital-railcannon-strike.svg"},

    // Hangar
    {name: "eagle-strafing-run", keys: ["ArrowUp", "ArrowRight", "ArrowRight"], img: "./images/stratagems/eagle-strafing-run.svg"},
    {name: "eagle-airstrike", keys: ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowRight"], img: "./images/stratagems/eagle-airstrike.svg"},
    {name: "eagle-cluster-bomb", keys: ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowDown", "ArrowRight"], img: "./images/stratagems/eagle-cluster-bomb.svg"},
    {name: "eagle-napalm-airstrike", keys: ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowUp"], img: "./images/stratagems/eagle-napalm-airstrike.svg"},
    {name: "jump-pack", keys: ["ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowUp"], img: "./images/stratagems/jump-pack.svg"},
    {name: "eagle-smoke-strike", keys: ["ArrowUp", "ArrowRight", "ArrowUp", "ArrowDown"], img: "./images/stratagems/eagle-smoke-strike.svg"},
    {name: "eagle-110mm-rocket-pods", keys: ["ArrowUp", "ArrowRight", "ArrowUp", "ArrowLeft"], img: "./images/stratagems/eagle-110mm-rocket-pods.svg"},
    {name: "eagle-500kg-bomb", keys: ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowDown", "ArrowDown"], img: "./images/stratagems/eagle-500kg-bomb.svg"},
]

let shuffledStr = []
// Musica que suena de fondo mientras se juega
const playingMusic = new Audio("./sounds/effects/playing.wav");

function startGame() {
    // arrancar musica
    introMusic.pause();
    introMusic.currentTime = 0;

    playingMusic.loop = true; // Habilita el loop
    playingMusic.play(); // Inicia el audio

    shuffledStr = shuffleArray([...stratagems]).slice(0, 6);
    showFirstStr(shuffledStr);
    showKeySecuence(shuffledStr);

    posicionActual = 0;
    keysActuales = shuffledStr[0].keys;

    document.removeEventListener("keydown", manejarInput);
    document.addEventListener("keydown", manejarInput);
}


function manejarInput(event) {
    const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!allowedKeys.includes(event.key)) {
        return;
    }

    if (event.key === keysActuales[posicionActual]) {
        document.getElementById(`${shuffledStr[0].name}-${posicionActual}`).classList.replace("notPressed", "pressed");

        posicionActual++;

        const correct = new Audio(`./sounds/effects/correct${Math.floor(Math.random() * 4) + 1}.wav`);
        correct.play();

        if (posicionActual === keysActuales.length) {
            shuffledStr.shift();

            if (shuffledStr.length === 0) {
                // Si ya no quedan más estratagemas, detiene la música
                playingMusic.pause();
                playingMusic.currentTime = 0; // Reinicia la música al inicio para futuros juegos
                console.log("Juego terminado, música detenida");

                const success = new Audio(`./sounds/effects/success${Math.floor(Math.random() * 3) + 1}.wav`);
                success.play()
            }

            showFirstStr(shuffledStr);
            showKeySecuence(shuffledStr);

            posicionActual = 0;
            keysActuales = shuffledStr[0].keys;

            const hit = new Audio(`./sounds/effects/hit${Math.floor(Math.random() * 4) + 1}.wav`);
            hit.play();
        }
    } else {
        posicionActual = 0;

        showKeySecuence(shuffledStr);

        const error = new Audio(`./sounds/effects/error${Math.floor(Math.random() * 4) + 1}.wav`);
        error.play();

        shakeElement(document.getElementById('cont-keys'));
    }
}

function showFirstStr (array){
    document.getElementById('cont-str').innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        if (i == 0){
            document.getElementById('cont-str').innerHTML += `<img class="first-str stratagem" src="${array[i].img}" alt="">`;
            
            //cambia texto de stratagema
            const texto = array[i].name;
            const resultado = texto.toUpperCase();

            document.getElementById("str-name").innerText = `${resultado}`;
        } else {
            document.getElementById('cont-str').innerHTML += `<img class=" stratagem" src="${array[i].img}" alt="">`
        }
    }
}

function showKeySecuence (array){
    document.getElementById('cont-keys').innerHTML = ""
    for (let i = 0; i < array[0].keys.length; i++) {
        document.getElementById('cont-keys').innerHTML += `<img id = "${array[0].name}-${i}" class="notPressed" src="./images/icons/${array[0].keys[i]}.png" alt=""></img>`
    }
}

// #### VARIOUS FUNCTIONS ####

// efecto de sacudirse
function shakeElement(element) {
    element.classList.add("shake");

    setTimeout(() => {
        element.classList.remove("shake");
    }, 500);
}

const introMusic = new Audio(`./sounds/effects/stratagem_hero.wav`);

// close initial pop up
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    
    introMusic.loop = true;
    introMusic.play();
}