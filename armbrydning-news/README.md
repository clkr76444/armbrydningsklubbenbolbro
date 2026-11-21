# Armbrydning Odense – Administration

Dette er administrationssiden til Armbrydning Odenses hjemmeside. Her kan klubbens administrator oprette, redigere og slette nyheder samt se og håndtere beskeder fra hjemmesiden.

Projektet er udviklet i forbindelse med vores eksamensprojekt på 3. semester af multimediedesignuddannelsen på UCL Odense.

## Funktioner

- Login med Firebase Authentication.
- Oprette, redigere og slette nyheder.
- Tilføje billeder og alternativ billedtekst til nyheder.
- Se og håndtere kontaktbeskeder og tilmeldinger til prøvetræning.
- Markere henvendelser som færdigbehandlede.

## Teknologier

Vi har brugt **Vue 3, JavaScript, SCSS og Vue Router** til at bygge administrationssiden.

**Firebase** bruges til database, login, sikkerhed og hosting.

## Sådan køres projektet

Installer først projektets pakker:

`npm install`

Start derefter udviklingsserveren:

`npm run dev`

Projektet bruger en `.env`-fil med følgende variabel:

`VITE_WEBSITE_URL=https://armbrydning-odense-website.web.app`

Den bruges til at hente billeder fra den offentlige hjemmeside.

## Deployment

Byg projektet med:

`npm run build`

Deploy derefter til Firebase Hosting:

`firebase deploy --only hosting:admin --project armbrydning-news`

**Admin:** https://armbrydning-news.web.app

**Hjemmeside:** https://armbrydning-odense-website.web.app

## Sikkerhed

Kun den godkendte administrator har adgang til de beskyttede sider. Vi bruger Firebase Authentication, App Check og sikkerhedsregler i Realtime Database til at beskytte løsningen.
