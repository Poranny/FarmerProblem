// Moduł odpowiedzialny za zarządzanie ustawieniami użytkownika, tj. prędkością animacji, errorlogiem

let settings = {
    animationTime: 500 // Domyślny czas przejścia ruchu w milisekundach
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

document.addEventListener('DOMContentLoaded', function() {
    setTime(getTime());
});


// Obsługa wyświetlania błędów w konsoli i na ekranie
const errorLogElement = document.getElementById('errorLog');
function throwErrorAndLog(message) {
    errorLogElement.textContent = "Error: " + message; // Aktualizacja treści widocznego na ekranie error logu

    throw new Error(message); // Wyrzucenie błędu na konsolę
}

function resetErrorLog() {
    errorLogElement.textContent = "";
}




export { setTime, getTime, throwErrorAndLog, resetErrorLog };
