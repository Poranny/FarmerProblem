Dokumentacja

Kod wykorzystuje środowisko uruchomieniowe NodeJS - do pobrania pod https://nodejs.org/en

Sam kod składa się z kilku modułów:
- dwóch odpowiedzialnych bezpośrednio za logikę symulacji:  RiverCrossingCalculations.mjs oraz RiverCrossingState.mjs
- trzech pozostałych odpowiedzialnych za jej interakcję z użytkownikiem i/lub wygląd.

Za wygląd oraz zachowanie interfejsu w przeglądarce odpowiadają również w dużym stopniu plik .html oraz .css

Każdy skrypt jest zwięźle okomentowany

Zakres rozdzielczości, dla których zweryfikowałem, że interfejs renderuje się poprawnie, to 1920x1080 - 1280x1024 (dla mniejszych kod również działa bez zarzutu, jedynie ustawienie obiektów HTML zaczyna czasami robić problemy).
