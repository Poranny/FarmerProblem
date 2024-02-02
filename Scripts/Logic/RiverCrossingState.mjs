import {moveFarmer, moveFarmerAndGoat, moveFarmerAndWolf, moveFarmerAndCabbage, displayWin, hideWin} from "../Front/RiverCrossingOutput.mjs";
import {resetErrorLog} from "../Front/UserSettings.mjs";
// Moduł odpowiedzialny za przechowywanie/zmianę stanu (jako stan rozumie się pozycje postaci, np. Lewo Lewo Lewo Lewo)

// Stan początkowy, można zmienić
let isFarmerOnLeftInitial = true;
let isGoatOnLeftInitial = true;
let isWolfOnLeftInitial = true;
let isCabbageOnLeftInitial = true;


// Zmienne sterujące i przypisanie im początkowych wartości
let isFarmerOnLeft = isFarmerOnLeftInitial;
let isGoatOnLeft = isGoatOnLeftInitial;
let isWolfOnLeft = isWolfOnLeftInitial;
let isCabbageOnLeft = isCabbageOnLeftInitial;


// Oczekiwany stan końcowy
let farmerDestinationLeft = false;
let goatDestinationLeft = false;
let wolfDestinationLeft = false;
let cabbageDestinationLeft = false;

function getState() {
    return { isFarmerOnLeft, isGoatOnLeft, isWolfOnLeft, isCabbageOnLeft };
}

function updateState(newState) {
    const oldState = getState();

    ({ isFarmerOnLeft, isGoatOnLeft, isWolfOnLeft, isCabbageOnLeft } = newState);

    // Warunki determinujące, które z postaci zmieniły swoje miejsce w ostatnim ruchu, w celu uruchomienia odpowiednich animacji
    if (oldState.isFarmerOnLeft !== newState.isFarmerOnLeft) {
        moveFarmer();
    }

    if (oldState.isGoatOnLeft !== newState.isGoatOnLeft) {
        moveFarmerAndGoat();
    }

    if (oldState.isWolfOnLeft !== newState.isWolfOnLeft) {
        moveFarmerAndWolf();
    }

    if (oldState.isCabbageOnLeft !== newState.isCabbageOnLeft) {
        moveFarmerAndCabbage();
    }

    checkWin();
    resetErrorLog();
}

// Reset symulacji, domyślnie do pozycji L L L L
function resetState() {

    const resetState = getState();

    resetState.isFarmerOnLeft = isFarmerOnLeftInitial;
    resetState.isGoatOnLeft = isGoatOnLeftInitial;
    resetState.isWolfOnLeft = isWolfOnLeftInitial;
    resetState.isCabbageOnLeft = isCabbageOnLeftInitial;

    updateState(resetState);
}

// Sprawdzenie co ruch, czy cel został osiągnięty
function checkWin() {

    notWin();

    let currentState = getState();

    if (currentState.isFarmerOnLeft === farmerDestinationLeft) {
        if (currentState.isGoatOnLeft === goatDestinationLeft) {
            if (currentState.isWolfOnLeft === wolfDestinationLeft) {
                if (currentState.isCabbageOnLeft === cabbageDestinationLeft) {
                    win();
                }
            }
        }
    }
}

function win() {

    displayWin();
}
function notWin() {

    hideWin();
}

export { getState, updateState, resetState };
