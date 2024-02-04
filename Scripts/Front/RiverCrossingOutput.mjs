import { getState } from '../Logic/RiverCrossingState.mjs';
import {getTime, setTime} from "./UserSettings.mjs";
// Moduł odpowiedzialny za obsługę elementów widocznych na ekranie, animacji, tekstu itp.

// Dostęp do elementów HTML
const farmerPositionText = document.getElementById('farmerPositionText');
const goatPositionText = document.getElementById('goatPositionText');
const wolfPositionText = document.getElementById('wolfPositionText');
const cabbagePositionText = document.getElementById('cabbagePositionText');

const farmer = document.getElementById('farmer');
const goat = document.getElementById('goat');
const wolf = document.getElementById('wolf');
const cabbage = document.getElementById('cabbage');
const winText = document.getElementById('winText');


const leftMarginPercent = 35; // Odległość postaci od lewej krawędzi ekranu (w procentach)
const rightMarginPercent = 35; // Odległość postaci od prawej krawędzi ekranu (w procentach)
const charactersVerticalOffset = 25; // Dodatkowa odległość pionowa między postaciami (w pikselach)

// Funkcje wywołujące odpowiedni zestaw ruchów (eksportowane na zewnątrz)
function moveFarmer() {

    moveFarmerSingle();

    updateFarmerPositionText();
}
function moveFarmerAndGoat() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isGoatOnLeft) {
        moveFarmerSingle();
        moveGoatSingle();

        updateFarmerPositionText();
        updateGoatPositionText();
    }
}

function moveFarmerAndWolf() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isWolfOnLeft) {
        moveFarmerSingle();
        moveWolfSingle();

        updateFarmerPositionText();
        updateWolfPositionText();
    }
}

function moveFarmerAndCabbage() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isCabbageOnLeft) {
        moveFarmerSingle();
        moveCabbageSingle();

        updateFarmerPositionText();
        updateCabbagePositionText();
    }
}


// Funkcje odpowiedzialne za składowe animacje ruchu pojedynczych postaci (nie są eksportowane na zewnątrz)
function moveFarmerSingle() {

    const state = getState();

    const farmerWidth = farmer.offsetWidth;
    const windowWidth = window.innerWidth;

    const rightPosition = windowWidth - farmerWidth - (windowWidth * rightMarginPercent / 100);
    const leftPosition = window.innerWidth * leftMarginPercent / 100;

    if (!state.isFarmerOnLeft) {
        farmer.style.left = rightPosition + 'px';
    } else if (state.isFarmerOnLeft) {
        farmer.style.left = leftPosition + 'px';
    }
}


function moveGoatSingle() {

    const state = getState();

    const goatWidth = goat.offsetWidth;
    const windowWidth = window.innerWidth;

    const rightPosition = windowWidth - goatWidth - (windowWidth * rightMarginPercent / 100);
    const leftPosition = window.innerWidth * leftMarginPercent / 100;

    if (!state.isGoatOnLeft) {
        goat.style.left = rightPosition + 'px';
    } else if (state.isGoatOnLeft) {
        goat.style.left = leftPosition + 'px';
    }
}


function moveWolfSingle() {

    const state = getState();

    const wolfWidth = wolf.offsetWidth;
    const windowWidth = window.innerWidth;

    const rightPosition = windowWidth - wolfWidth - (windowWidth * rightMarginPercent / 100);
    const leftPosition = window.innerWidth * leftMarginPercent / 100;

    if (!state.isWolfOnLeft) {
        wolf.style.left = rightPosition + 'px';
    } else if (state.isWolfOnLeft) {
        wolf.style.left = leftPosition + 'px';
    }
}
function moveCabbageSingle() {

    const state = getState();

    const cabbageWidth = cabbage.offsetWidth;
    const windowWidth = window.innerWidth;

    const rightPosition = windowWidth - cabbageWidth - (windowWidth * rightMarginPercent / 100);
    const leftPosition = window.innerWidth * leftMarginPercent / 100;

    if (!state.isCabbageOnLeft) {
        cabbage.style.left = rightPosition + 'px';
    } else if (state.isCabbageOnLeft) {
        cabbage.style.left = leftPosition + 'px';
    }
}


const speedInput = document.getElementById('speedInput');
speedInput.addEventListener('change', function() {
    var value = speedInput.value;
    if (!Number.isInteger(parseFloat(value))) {
        console.log("Proszę wprowadzić liczbę całkowitą.");
    } else {
        setTime(value);
    }
});

// Event wywoływany na początku załadowania strony, ustawiający postaci i teksty
document.addEventListener('DOMContentLoaded', function() {

    // Pobranie zawartości readme i umieszczenie w instrukcji na ekranie
    fetch('readme.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('instructions').innerText = text;
        });

    // Ustawienie wartości domyślnej szybkości animacji
    const speedInput = document.getElementById('speedInput');
    speedInput.placeholder = getTime();


    // Operacje związane z ustawieniem postaci
    const initialLeftPosition = window.innerWidth * leftMarginPercent / 100;

    const state = getState();

    farmer.style.left = initialLeftPosition + 'px';
    goat.style.left = initialLeftPosition + 'px';
    wolf.style.left = initialLeftPosition + 'px';
    cabbage.style.left = initialLeftPosition + 'px';


    const farmerHeight = farmer.offsetHeight;
    goat.style.top = (farmer.offsetTop + farmerHeight + charactersVerticalOffset) + 'px';
    wolf.style.top = (farmer.offsetTop + 2*(farmerHeight + charactersVerticalOffset) + 'px');
    cabbage.style.top = (farmer.offsetTop + 3*(farmerHeight + charactersVerticalOffset) + 'px');

    setInitialPosition(farmer, state.isFarmerOnLeft);
    setInitialPosition(goat, state.isGoatOnLeft);
    setInitialPosition(wolf, state.isWolfOnLeft);
    setInitialPosition(cabbage, state.isCabbageOnLeft);

    // Ustawienie początkowych wartości tekstów o pozycji postaci
    updateFarmerPositionText();
    updateGoatPositionText();
    updateWolfPositionText();
    updateCabbagePositionText();
});

function setInitialPosition(element, isOnLeft) {
    const position = isOnLeft ? window.innerWidth * leftMarginPercent / 100
        : window.innerWidth - element.offsetWidth - (window.innerWidth * rightMarginPercent / 100);
    element.style.left = position + 'px';
}


function updateFarmerPositionText() {

    const state = getState();

    farmerPositionText.textContent = `Pozycja Farmera: ${state.isFarmerOnLeft ? 'West' : 'East'}`;
}
function updateGoatPositionText() {

    const state = getState();

    goatPositionText.textContent = `Pozycja Kozy: ${state.isGoatOnLeft ? 'West' : 'East'}`;
}
function updateWolfPositionText() {

    const state = getState();

    wolfPositionText.textContent = `Pozycja Wilka: ${state.isWolfOnLeft ? 'West' : 'East'}`;
}
function updateCabbagePositionText() {

    const state = getState();

    cabbagePositionText.textContent = `Pozycja Kapusty: ${state.isCabbageOnLeft ? 'West' : 'East'}`;
}

// Funkcje ustawiające wartości tekstu o wygranej na ekranie
function displayWin () {

    winText.textContent = 'Wygrana!';
}

function hideWin () {

    winText.textContent = '';
}

export {
    moveFarmer, moveFarmerAndGoat, moveFarmerAndWolf, moveFarmerAndCabbage, displayWin, hideWin
};
