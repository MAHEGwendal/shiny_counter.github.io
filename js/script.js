let name;
let chronoInterval; // Variable pour stocker l'identifiant de l'intervalle


function saveData() {
    const counter = document.getElementById("compteur").innerText;
    const chrono = document.getElementById("chrono").innerText;
    const imageSrc = document.getElementById("pokemon-image").src;

    localStorage.setItem("shiny-counter", counter);
    localStorage.setItem("shiny-chrono", chrono);
    localStorage.setItem("shiny-image", imageSrc);
}

function loadData() {
    const counter = localStorage.getItem("shiny-counter");
    const chrono = localStorage.getItem("shiny-chrono");
    const imageSrc = localStorage.getItem("shiny-image");

    if (counter) {
        document.getElementById("compteur").innerText = counter;
    }
    if (chrono) {
        document.getElementById("chrono").innerText = chrono;
    }
    if (imageSrc) {
        document.getElementById("pokemon-image").src = imageSrc;
    }
}



function getName() {
    name = prompt("Enter the English name of your Pokemon:");
    name = name.toLowerCase();
    updateImage(name);
    return name;
}

function updateImage(pokemonName) {
    const imageElement = document.getElementById("pokemon-image");
    imageElement.src = `https://projectpokemon.org/images/shiny-sprite/${pokemonName}.gif`;
    saveData();
}


function increment(){
    let nbr = document.getElementById("compteur").innerHTML;
    nbr = parseInt(nbr) + 1;
    document.getElementById("compteur").innerHTML = nbr;
    saveData();
}

function decrement(){
    let nbr = document.getElementById("compteur").innerHTML;
    nbr = parseInt(nbr) - 1;
    if (nbr < 0) {
        nbr = 0; // Prevent negative values
    }
    document.getElementById("compteur").innerHTML = nbr;
    saveData();
}

function reset(){
    document.getElementById("compteur").innerHTML = 0;
    saveData();
}


document.addEventListener("keydown", function(event) {
    if (event.key === "+") {
        increment();
    }
});


document.addEventListener("keydown", function(event) {
    if (event.key === "-") {
        decrement();
    }
});

function startChrono() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    const chronoElement = document.getElementById("chrono");

    // Si un intervalle est déjà en cours, l'arrêter
    if (chronoInterval) {
        clearInterval(chronoInterval);
    }

    // Démarrer un nouvel intervalle
    chronoInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        chronoElement.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function pauseChrono() {
    if (chronoInterval) {
        clearInterval(chronoInterval);
        chronoInterval = null; // Réinitialiser l'identifiant
        saveData();
    }
}


function resetChrono() {
    const chronoElement = document.getElementById("chrono");
    if (chronoInterval) {
        clearInterval(chronoInterval);
        chronoInterval = null; // Réinitialiser l'identifiant
    }
    chronoElement.innerHTML = "00:00:00"; // Réinitialiser l'affichage
    saveData();
}


window.addEventListener("DOMContentLoaded", () => {
    loadData();
});