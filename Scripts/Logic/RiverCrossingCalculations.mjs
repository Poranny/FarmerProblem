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
        throwErrorAndLog(`Nieprawidłowy format linii "${commandLine}"`);
    }

    const state = getState();

    if (!isCorrectSide(state, commandParts.character, commandParts.from)) {
        throwErrorAndLog(`Nie można ruszyć się na brzeg, na którym już się jest!\nLinia ${index + 1}: "${commandLine}"`);
    }

    if (!isPassengerAvailable (state, commandParts.character)) {
        throwErrorAndLog(`Pasażer nie może opuścić brzegu bez pomocy Farmera!\nLinia ${index + 1}: "${commandLine}"`);
    }

    if (!canBeLeftTogether (state, commandParts.character)) {
        throwErrorAndLog(`Po tym ruchu nieodpowiedni pasażerowie zostaną razem na brzegu!\nLinia ${index + 1}: "${commandLine}"`);
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
            console.log ("perform" + character)
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

    console.log(state)
    console.log(character)
    console.log(from)
    console.log()

    if ((character === "farmer" && state.isFarmerOnLeft !== (from === "west")) ||
        (character === "koza" && state.isGoatOnLeft !== (from === "west")) ||
        (character === "wilk" && state.isWolfOnLeft !== (from === "west")) ||
        (character === "kapusta" && state.isCabbageOnLeft !== (from === "west"))) {
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

    const commandPattern = /^\((plynie) (farmer|koza|wilk|kapusta) (west|east) (west|east)\)$/;
    const match = commandLine.match(commandPattern);

    if (match) {
        return {
            character: match[2],
            from: match[3],
            to: match[4]
        };
    } else {
        return null;
    }
}

export { verifyLogic };
