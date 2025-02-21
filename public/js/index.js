function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Array con todas las estratagemas y sus detalles
const stratagems = [
    {name: "machine-gun", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"], img: "./images/stratagems/machine-gun.svg"},
    {name: "anti-materiel-rifle", keys: ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"], img: "./images/stratagems/anti-materiel-rifle.svg"},
    {name: "stalwart", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowLeft"], img: "./images/stratagems/stalwart.svg"},
    {name: "expendable-anti-tank", keys: ["ArrowDown", "ArrowDown", "ArrowLeft", "ArrowUp", "ArrowRight"], img: "./images/stratagems/expendable-anti-tank.svg"},
    {name: "recoilless-rifle", keys: ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowLeft"], img: "./images/stratagems/recoilless-rifle.svg"},
    {name: "flamethrower", keys: ["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowUp"], img: "./images/stratagems/flamethrower.svg"},
    {name: "autocannon", keys: ["ArrowDown", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowRight"], img: "./images/stratagems/autocannon.svg"}
]



window.onload = function () {
    
}


function startGame() {
    const shuffledStr = shuffleArray(stratagems);
    shuffledStr.splice(6);


    document.getElementById('cont-str').innerHTML = ""
    for (let i = 0; i < shuffledStr.length; i++) {
        if (i == 0){
            document.getElementById('cont-str').innerHTML += `<img class="first-str stratagem" src="${shuffledStr[i].img}" alt="">`
        } else {
            document.getElementById('cont-str').innerHTML += `<img class=" stratagem" src="${shuffledStr[i].img}" alt="">`
        }
    }

    document.getElementById('cont-keys').innerHTML = ""
    for (let i = 0; i < shuffledStr[0].keys.length; i++) {
        document.getElementById('cont-keys').innerHTML += `<img class="" src="./images/icons/${shuffledStr[0].keys[i]}.png" alt=""></img>`
    }
    
}