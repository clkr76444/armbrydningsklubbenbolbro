# Armbrydning Odense – Hjemmeside

Dette projekt er udviklet som en del af vores eksamensprojekt på 3. semester af multimediedesignuddannelsen på UCL Odense.

Vi har udviklet en hjemmeside til Armbrydning Odense med fokus på at gøre klubben mere synlig og attraktiv for unge i Odense.

## Funktioner

- Information om klubben, træning og medlemskab.
- Kontaktformular og tilmelding til gratis prøvetræning.
- Nyhedsside med nyheder fra Firebase.
- Google Maps med samtykke.
- Responsivt design til mobil, tablet og desktop.

## Teknologier

Hjemmesiden er udviklet med **Vue 3, JavaScript, SCSS og Vue Router**.

Vi har arbejdet med genanvendelige komponenter, props og slots for at gøre koden mere overskuelig og nemmere at vedligeholde.

Vi bruger **Firebase Realtime Database** til nyheder og formularer, **App Check** til at beskytte databaseanmodninger og **Firebase Hosting** til deployment.

## Sådan køres projektet

Installer projektets pakker:

`npm install`

Start udviklingsserveren:

`npm run dev`

## Deployment

Byg projektet:

`npm run build`

Deploy til Firebase Hosting:

`firebase deploy --only hosting:website --project armbrydning-news`

**Hjemmeside:** https://armbrydning-odense-website.web.app

**Administration:** https://armbrydning-news.web.app
