<script setup>
import ImageTextSection from '../components/ImageTextSection.vue'
import PageHero from '../components/PageHero.vue'

const clubAddress = 'Middelfartvej 114, 5200 Odense V'

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clubAddress)}`
</script>

<template>
  <main class="become-member-page">
    <PageHero title="Bliv armbryder" scroll-target="trial-signup">
      <template #description>
        Hos Armbrydning Odense er der plads til alle.
        <br />
        Fortæl os at du kommer til prøvetræning og læs mere om at være ny i klubben.
      </template>
    </PageHero>

    <section id="trial-signup" class="trial-signup">
      <div class="trial-signup__inner">
        <h2>
          Vi står <span class="highlight">klar</span>
          til at tage imod dig!
        </h2>

        <p>
          Din første træning skal være en god oplevelse! <br />Fortæl os, at du kommer, så sørger vi
          for at være klar til at tage imod dig.
        </p>
        <p>Tilmelding er <strong>ikke</strong> nødvendig - du kan også bare møde op!</p>
      </div>
    </section>

    <ImageTextSection
      image="/images/1.webp"
      image-alt="Medlemmer af Armbrydning Odense"
      image-right
      image-format="portrait"
      background-variant="secondary"
      button-text="Fortæl os at du kommer"
      button-to="#trial-signup"
      button-variant="primary"
    >
      <template #heading> Step 1 - <span class="highlight">Find en dag</span> </template>

      <h3>Det første skridt er helt simpelt!</h3>

      <p>
        Find en træningsdag, der passer dig, og kig forbi klubben i Bolbro. <br />Du behøver ikke
        tilmelde dig på forhånd, men du er altid velkommen til at give os besked om, at du kommer.
        Så sørger vi for, at der står en klar til at tage imod dig.
      </p>
    </ImageTextSection>

    <ImageTextSection
      image="/images/2.webp"
      image-alt="Medlemmer, der træner armbrydning"
      image-format="portrait"
      button-text="Find vej til klubben"
      :button-href="mapsUrl"
      button-variant="secondary"
    >
      <template #heading> Step 2 - <span class="highlight">Come as you are!</span> </template>

      <p>
        Du behøver ikke have særligt udstyr eller kende reglerne på forhånd. Tag noget tøj på, du
        kan bevæge dig i, og medbring gerne en drikkedunk.
      </p>
      <p>
        Når du kommer til klubben, tager vi imod dig og viser dig rundt. Du får mulighed for at møde
        de andre medlemmer, høre lidt om sporten og få en fornemmelse af stemningen.
      </p>
      <p>Vi sørger for at du føler dig som en del af fællesskabet!</p>
    </ImageTextSection>

    <ImageTextSection
      image="/images/3.webp"
      image-alt="To personer, der træner armbrydning"
      image-right
      image-format="portrait"
      background-variant="secondary"
      button-text="Læs mere om priser og kontingenter"
      button-to="/praktisk-info"
      button-variant="secondary"
    >
      <template #heading>Step 3: <span class="highlight">Din første træning</span> </template>

      <p>
        Nu skal du selv prøve kræfter med armbrydning! Vi starter med at vise dig de grundlæggende
        teknikker, så du kan lære sporten at kende i dit eget tempo.
      </p>

      <p>
        Du behøver ikke kunne noget på forhånd! Vi hjælper dig undervejs, svarer på dine spørgsmål
        og sørger for, at du får en god introduktion til sporten.
      </p>

      <p>
        Det vigtigste er ikke, hvor stærk du er, men at du har lyst til at lære noget nyt og have
        det sjovt sammen med os.
      </p>

      <p>
        Hvis du finder ud af, at armbrydning er noget for dig, hjælper vi dig selvfølgelig med at
        blive medlem!
      </p>
    </ImageTextSection>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.trial-signup {
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: v.$bg-primary;
}

.trial-signup__inner {
  max-width: 600px;
  margin-inline: auto;

  h2 {
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}
</style>
