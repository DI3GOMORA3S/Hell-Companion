function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}

const estratagemas = [
    {nombre: "machine-gun", teclas: ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowDown"], imagen: "./images/stratagems/machine-gun.svg"},
    {nombre: "anti-materiel-rifle", teclas: ["ArrowRight", "ArrowUp", "ArrowRight", "ArrowDown"], imagen: "./images/stratagems/anti-materiel-rifle.svg"}
]

window.onload = function () {
    
}


function startGame() {
    document.getElementById('prueba').innerHTML = `<img src="${estratagemas[Math.floor(Math.random() * estratagemas.length)].imagen}" alt="">`;
}