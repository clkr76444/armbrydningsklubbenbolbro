<template>
  <main class="privacy-page">
    <article class="privacy-page__content">
      <header class="privacy-page__header">
        <h1>Privatlivs politik</h1>
        <p>
          Her kan du læse, hvordan vi håndterer dine oplysninger, når du kontakter Armbrydning
          Odense eller giver os besked om, at du kommer til prøvetræning.
        </p>
      </header>

      <section>
        <h2>Hvem er ansvarlig?</h2>
        <p>
          Armbrydning Odense er ansvarlig for behandlingen af oplysninger på hjemmesiden. Du kan
          kontakte os på
          <a href="mailto:kontakt@armbrydningodense.dk">kontakt@armbrydningodense.dk</a>.
        </p>
      </section>

      <section>
        <h2>Hvilke oplysninger gemmer vi?</h2>
        <p>
          Når du bruger vores kontaktformular, gemmer vi dit navn, telefonnummer, emne og besked.
        </p>
        <p>
          Når du giver besked om en prøvetræning, gemmer vi dit navn, telefonnummer, den valgte
          træningsdato og om du ønsker en SMS-bekræftelse.
        </p>
        <p>Vi gemmer også tidspunktet for, hvornår formularen blev sendt.</p>
      </section>

      <section>
        <h2>Hvad bruger vi oplysningerne til?</h2>
        <p>
          Vi bruger oplysningerne til at besvare din henvendelse, kontakte dig om prøvetræning og
          håndtere eventuelle spørgsmål til klubben.
        </p>
        <p>
          Behandlingen sker som udgangspunkt på baggrund af klubbens legitime interesse i at kunne
          besvare henvendelser og planlægge prøvetræning (GDPR artikel 6, stk. 1, litra f).
        </p>
        <p>
          Det er frivilligt at kontakte os, men vi har brug for oplysningerne for at kunne besvare
          din henvendelse eller aftale en prøvetræning.
        </p>
      </section>

      <section>
        <h2>Hvor længe gemmer vi oplysningerne?</h2>
        <p>
          Vi gemmer kun dine oplysninger, så længe det er nødvendigt for at behandle din henvendelse
          eller aftale en prøvetræning. Når henvendelsen er afsluttet, sletter vi oplysningerne
          senest efter 6 måneder, medmindre der er en særlig grund til at gemme dem længere.
        </p>
      </section>

      <section>
        <h2>Firebase, Google Maps og browserdata</h2>
        <p>
          Formularerne bruger Google Firebase til at gemme oplysningerne, så klubbens administrator
          kan håndtere dem. Vi bruger også Firebase App Check med reCAPTCHA Enterprise til at
          beskytte hjemmesidens funktioner mod misbrug.
        </p>
        <p>
          Google Maps bliver først indlæst, hvis du accepterer det. Når kortet indlæses, kan Google
          behandle tekniske oplysninger om din brug af tjenesten. Du kan ændre dit valg via
          »Cookieindstillinger« i footeren.
        </p>
        <p>
          Vi bruger desuden browserens lokale lager til at huske dit valg om Google Maps og til at
          begrænse, hvor ofte formularerne kan indsendes.
        </p>
        <p>
          Vi bruger tjenester fra Google til blandt andet database, sikkerhed og kortvisning. Google
          og deres underleverandører kan i nogle tilfælde behandle oplysninger uden for EU/EØS.
          Sådanne overførsler er omfattet af Googles databehandlingsvilkår, der beskriver relevante
          sikkerhedsforanstaltninger og overførselsgrundlag.
        </p>
        <p>
          Læs mere i
          <a
            href="https://policies.google.com/privacy?hl=da"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googles privatlivspolitik </a
          >.
        </p>
      </section>

      <section>
        <h2>Dine rettigheder</h2>

        <p>
          Du kan kontakte os, hvis du vil vide, hvilke oplysninger vi har om dig, have dem rettet
          eller bede om at få dem slettet. Du har også andre rettigheder efter
          databeskyttelsesreglerne, herunder i visse tilfælde ret til at gøre indsigelse mod eller
          bede om begrænsning af behandlingen.
        </p>

        <p>
          Skriv til
          <a href="mailto:kontakt@armbrydningodense.dk">kontakt@armbrydningodense.dk</a>, hvis du
          har spørgsmål om dine oplysninger. Du kan også klage til
          <a href="https://www.datatilsynet.dk/" target="_blank" rel="noopener noreferrer"
            >Datatilsynet</a
          >.
        </p>
      </section>
    </article>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.privacy-page {
  min-height: 70vh;
  padding: 1rem var(--container-padding) 5rem;
  background: v.$bg-primary;
  color: v.$color-off-white;
}

.privacy-page__content {
  max-width: 780px;
  margin-inline: auto;
}

.privacy-page__header {
  margin-bottom: 3rem;
}

h1 {
  color: v.$color-lime;
  font-family: v.$font-heading;
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-transform: uppercase;
  overflow-wrap: anywhere;
  text-align: center;
  letter-spacing: 0.07em;
}

h2 {
  margin-bottom: 0.75rem;
  color: v.$color-lime;
  font-size: 1.25rem;
  letter-spacing: 0.07em;
}

section {
  margin-top: 2.5rem;
}

p {
  margin: 0.75rem 0;
  line-height: 1.7;
}

a {
  color: v.$color-lime;
  overflow-wrap: anywhere;
  text-underline-offset: 3px;
}

a:focus-visible {
  outline: 2px solid v.$color-lime;
  outline-offset: 4px;
}
</style>
