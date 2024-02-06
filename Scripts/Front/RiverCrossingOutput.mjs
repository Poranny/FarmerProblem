import { getState } from '../Logic/RiverCrossingState.mjs';
import {getDefaultTime} from "./UserSettings.mjs";
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

const leftMarginPercent = 27; // Odległość postaci od lewej krawędzi ekranu (w procentach)
const rightMarginPercent = 27; // Odległość postaci od prawej krawędzi ekranu (w procentach)
const charactersVerticalDistance = 23; // Przesunięcie wszystkich postaci w dół (w procentach)
const charactersVerticalOffset  = 16; // Przesunięcie wszystkich postaci w dół (w procentach)

// Funkcje wywołujące odpowiedni zestaw ruchów (eksportowane na zewnątrz)
function moveFarmer() {

    moveFarmerSingle();

    updatePositionTexts();
}
function moveFarmerAndGoat() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isGoatOnLeft) {
        moveFarmerSingle();
        moveGoatSingle();

        updatePositionTexts();
    }
}

function moveFarmerAndWolf() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isWolfOnLeft) {
        moveFarmerSingle();
        moveWolfSingle();

        updatePositionTexts();
    }
}

function moveFarmerAndCabbage() {

    const state = getState();

    if (state.isFarmerOnLeft === state.isCabbageOnLeft) {
        moveFarmerSingle();
        moveCabbageSingle();

        updatePositionTexts();
    }
}


// Funkcje odpowiedzialne za składowe animacje ruchu pojedynczych postaci (nie są eksportowane na zewnątrz)
function moveFarmerSingle() {

    const state = getState();

    if (!state.isFarmerOnLeft) {
        farmer.style.left = (100 - rightMarginPercent) + '%';
    } else if (state.isFarmerOnLeft) {
        farmer.style.left = leftMarginPercent + '%';
    }
}


function moveGoatSingle() {

    const state = getState();

    if (!state.isGoatOnLeft) {
        goat.style.left = (100 - rightMarginPercent) + '%';
    } else if (state.isGoatOnLeft) {
        goat.style.left = leftMarginPercent + '%';
    }
}


function moveWolfSingle() {

    const state = getState();

    if (!state.isWolfOnLeft) {
        wolf.style.left = (100 - rightMarginPercent) + '%';
    } else if (state.isWolfOnLeft) {
        wolf.style.left = leftMarginPercent + '%';
    }
}
function moveCabbageSingle() {

    const state = getState();

    if (!state.isCabbageOnLeft) {
        cabbage.style.left = (100 - rightMarginPercent) + '%';
    } else if (state.isCabbageOnLeft) {
        cabbage.style.left = leftMarginPercent + '%';
    }
}


// Event wywoływany na początku załadowania strony
document.addEventListener('DOMContentLoaded', function() {

    // Pobranie zawartości readme i umieszczenie w instrukcji na ekranie
    fetch('readme.md')
        .then(response => response.text())
        .then(text => {
            let instructionParts = text.split("___");

            document.getElementById('leftInstruction').innerText = instructionParts[0];
            console.log(instructionParts[1].charAt(0));

            instructionParts[1] = instructionParts[1].substring(2);


            document.getElementById('rightInstruction').innerText = instructionParts[1];
        });

    // Ustawienie wartości domyślnej szybkości animacji
    const speedInput = document.getElementById('speedInput');
    speedInput.placeholder = getDefaultTime();


    // Ustawienie początkowych pozycji postaci
    setInitialPositions();

    // Ustawienie początkowych wartości tekstów o pozycji postaci
    updatePositionTexts();
});

function setInitialPositions() {

    farmer.style.top = (charactersVerticalOffset) + '%';
    goat.style.top = (charactersVerticalOffset) + (charactersVerticalDistance) + '%';
    wolf.style.top = (charactersVerticalOffset) + (2*(charactersVerticalDistance)) + '%';
    cabbage.style.top = (charactersVerticalOffset) + (3*(charactersVerticalDistance)) + '%';

    const state = getState();


    const startPositionF = state.isFarmerOnLeft ? leftMarginPercent
        : 100  - rightMarginPercent;

    const startPositionG = state.isGoatOnLeft ? leftMarginPercent
        : 100  - rightMarginPercent;

    const startPositionW = state.isWolfOnLeft ? leftMarginPercent
        : 100  - rightMarginPercent;

    const startPositionC = state.isCabbageOnLeft ? leftMarginPercent
        : 100 - rightMarginPercent;

    farmer.style.left = startPositionF + '%';
    goat.style.left = startPositionG + '%';
    cabbage.style.left = startPositionC + '%';
    wolf.style.left = startPositionW + '%';
}

function updatePositionTexts() {

    const state = getState();

    farmerPositionText.textContent = `Pozycja Farmera: ${state.isFarmerOnLeft ? 'West' : 'East'}`;
    goatPositionText.textContent = `Pozycja Kozy: ${state.isGoatOnLeft ? 'West' : 'East'}`;
    wolfPositionText.textContent = `Pozycja Wilka: ${state.isWolfOnLeft ? 'West' : 'East'}`;
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
