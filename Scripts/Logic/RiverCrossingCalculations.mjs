import { getState, updateState } from './RiverCrossingState.mjs';
import {getTime, throwErrorAndLog} from '../Front/UserSettings.mjs';
// Moduł odpowiedzialny za logikę symulacji

// Główna funkcja weryfikująca (rekurencyjnie) po kolei kolejne warunki poprawności ruchów
function verifyLogic(commandLines, index=0) {

    if (index >= commandLines.length) {
        return; // Zakończ, jeśli wszystkie komendy zostały wykonane
    }

    const commandLine = commandLines[index];
    const commandParts = parseCommandLine(commandLine);

    if (!commandParts) {
        throwErrorAndLog(`Nieprawidłowy format linii: "${commandLine}"`);
    }

    const state = getState();

    if (!isCorrectSide(state, commandParts.character, commandParts.from)) {
        throwErrorAndLog(`Nie można ruszyć się na brzeg, na którym już się jest! ${index + 1}: "${commandLine}"`);
    }

    if (!isPassengerAvailable (state, commandParts.character)) {
        throwErrorAndLog(`Pasażer nie może opuścić brzegu bez pomocy Farmera! ${index + 1}: "${commandLine}"`);
    }

    if (!canBeLeftTogether (state, commandParts.character)) {
        throwErrorAndLog(`Po tym ruchu nieodpowiedni pasażerowie zostaną razem na brzegu! ${index + 1}: "${commandLine}"`);
    }

    performMovement(commandParts.character);

    // Wykonaj kolejny krok symulacji, po określonym w getTime() czasie
    setTimeout(() => verifyLogic(commandLines, index + 1), getTime());
}

// Wykonaj ruch (po weryfikacji), poprzez aktualizację stanu animacji (updateState)
function performMovement(character) {

    let state = getState();

    switch (character) {
        case "farmer" :
            state.isFarmerOnLeft = !state.isFarmerOnLeft;

            updateState(state);

            break;

        case "koza" :
            state.isFarmerOnLeft = !state.isFarmerOnLeft;
            state.isGoatOnLeft = !state.isGoatOnLeft;

            updateState(state);

            break;

        case "wilk" :
            state.isFarmerOnLeft = !state.isFarmerOnLeft;
            state.isWolfOnLeft = !state.isWolfOnLeft;

            updateState(state);

            break;

        case "kapusta" :
            state.isFarmerOnLeft = !state.isFarmerOnLeft;
            state.isCabbageOnLeft = !state.isCabbageOnLeft;

            updateState(state);

            break;
    }
}

// Weryfikacja, czy ruszane postaci znajdują się po odpowiedniej stronie dla danego ruchu
function isCorrectSide(state, character, from) {

    if ((character === "farmer" && state.isFarmerOnLeft !== (from === "l")) ||
        (character === "koza" && state.isGoatOnLeft !== (from === "l")) ||
        (character === "wilk" && state.isWolfOnLeft !== (from === "l")) ||
        (character === "kapusta" && state.isCabbageOnLeft !== (from === "l"))) {
        return false; // Postać nie jest po właściwej stronie, aby wykonać ruch
    }


    return true; // Ruch jest możliwy
}


// Weryfikacja, czy ruszana postać jest na tym samym brzegu co farmer
function isPassengerAvailable(state, character) {

    if ((character === "farmer")) {
        return true;
    }

    else {
        if ((character === "koza" && state.isGoatOnLeft === state.isFarmerOnLeft) ||
            (character === "wilk" && state.isWolfOnLeft === state.isFarmerOnLeft) ||
            (character === "kapusta" && state.isCabbageOnLeft === state.isFarmerOnLeft)) {
            return true;
        }
    }


    return false; // Ruch jest możliwy
}

// Weryfikacja, czy po danym ruchu na brzegu razem zostaną dozwolone postaci
function canBeLeftTogether(state, character) {

    if ((character === "wilk" && state.isGoatOnLeft === state.isCabbageOnLeft) ||
        (character === "kapusta" && state.isGoatOnLeft === state.isWolfOnLeft) ||
        (character === "farmer" && (state.isGoatOnLeft === state.isWolfOnLeft || state.isGoatOnLeft === state.isCabbageOnLeft))) {
        return false;
    }

    return true;
}

// Zamiana reprezentacji komendy (z linii tekstu - w bardziej obiektowy)
function parseCommandLine(commandLine) {

    const commandPattern = /^\((farmer|koza|wilk|kapusta) (l|p) (l|p)\)$/;
    const match = commandLine.match(commandPattern);

    if (match) {
        return {
            character: match[1],
            from: match[2],
            to: match[3]
        };
    } else {
        return null;
    }
}

export { verifyLogic };
