import { verifyLogic } from '../Logic/RiverCrossingCalculations.mjs';
import { resetState } from '../Logic/RiverCrossingState.mjs';
import { throwErrorAndLog } from './UserSettings.mjs';
// Moduł odpowiedzialny za obsługę (i weryfikację) wprowadzanych przez użytkownika komend i przycisków

const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');

// Główna funkcja weryfikująca poprawność wpisanych komend
function verifyCommands(commandsText) {

    if (commandsText === '') {
        throwErrorAndLog("Pole tekstowe nie może być puste!");
    }

    if (!checkAlphabet(commandsText)) {
        throwErrorAndLog("Nieoczekiwane znaki w polu tekstowym!");
    }

    commandsText = commandsText.toLowerCase();

    const lines = commandsText.split('\n');

    lines.forEach((line, index) => {
        if (!looksLikeCommand(line)) {
            throwErrorAndLog(`Nieobsługiwana komenda! W linijce ${index + 1}`);
        }

        if (!checkArgumentsFormat(line)) {
            throwErrorAndLog(`Nieobsługiwane argumenty! W linijce ${index + 1}`);
        }

        if (!checkSidesDifferent(line)) {
            throwErrorAndLog(`Drugi oraz trzeci argument nie mogą być tożsame! W linijce ${index + 1}`);
        }
    });

    // Przekazanie wprowadzonych zweryfikowanych danych do modułu odpowiedzialnego za logikę animacji
    verifyLogic(lines)
}


function checkAlphabet(text) {
    // Wyrażenie regularne akceptujące wyłącznie litery, spacje, nawiasy okrągłe i nowe linie
    const regex = /^[a-zA-Z ()\n]*$/;

    return regex.test(text);
}

function looksLikeCommand(text) {
    // Wyrażenie regularne akceptujące wyłącznie linijki zawierające się w nawiasach okrągłych
    const regex = /^\([^)]*\)$/;

    return regex.test(text);
}

function checkArgumentsFormat(command) {
    // Wyrażenie regularne akceptujące wyłącznie linijki z argumentami *POSTAĆ* *Z* *DO*
    const regex = /^\((farmer|koza|wilk|kapusta) (l|p) (l|p)\)$/;

    return regex.test(command);
}

function checkSidesDifferent(command) {
    // Funkcja weryfikująca, czy argument drugi *Z* i trzeci *DO* są różne
    const match = command.match(/^\((farmer|koza|wilk|kapusta) (l|p) (l|p)\)$/);
    if (match) {
        return match[2] !== match[3];
    }
    return false;
}


// Eventy odpowiedzialne za przyciski Submit i Reset
submitButton.addEventListener('click', () => {
    const textValue = textArea.value;

    verifyCommands(textValue);
});

resetButton.addEventListener('click', function() {

    resetState();
});



export { verifyCommands };