// Moduł odpowiedzialny za zarządzanie ustawieniami użytkownika, tj. prędkością animacji, errorlogiem

let settings = {
    defaultAnimationTime: 500, // Faktyczny czas przejściaruchu w milisekundach
    animationTime: 500 // Domyślny czas
};

// Funkcje aktualizujące i pobierające czas
function setTime(newTime) {
    settings.animationTime = newTime;

    const elementsToUpdate = document.querySelectorAll('.animatable'); // Dla elementów z klasą .animatable

    elementsToUpdate.forEach(element => {
        element.style.transition = `all ${settings.animationTime}ms`; // Zaktualizuj szybkość animacji w css
    });
}
function getTime() {
    return settings.animationTime;
}
function getDefaultTime() {
    return settings.defaultAnimationTime;
}
function setDefaultTime(newDefaultTime) {
    settings.defaultAnimationTime = newDefaultTime;
}

document.addEventListener('DOMContentLoaded', function() {

    setDefaultTime(500);
    setTime(getDefaultTime());
});


// Obsługa wyświetlania błędów w konsoli i na ekranie
const errorLogElement = document.getElementById('errorLog');
function throwErrorAndLog(message) {

    message = message.replace(/\n/g, '<br>');

    errorLogElement.innerHTML  = "Error: " + message; // Aktualizacja treści widocznego na ekranie error logu

    message = message.replace('<br>', /\n/g);

    throw new Error(message); // Wyrzucenie błędu na konsolę
}

function resetErrorLog() {
    errorLogElement.innerHTML  = "";
}



export { setTime, getTime, throwErrorAndLog, resetErrorLog, getDefaultTime, setDefaultTime};