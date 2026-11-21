<script setup>
import ImageTextSection from '../components/ImageTextSection.vue'
import LocationSection from '../components/LocationSection.vue'
import ScrollIndicator from '../components/ScrollIndicator.vue'
import NewsCarousel from '../components/NewsCarousel.vue'
</script>

<template>
  <main>
    <section class="hero">
      <img
        src="/images/hero.webp"
        alt="To personer, der dyrker armbrydning"
        class="hero__image"
        fetchpriority="high"
      />

      <div class="hero__content">
        <h1>Armbrydning Odense</h1>
        <p>Hver tirsdag og torsdag <br />kl. 18.30 - 20.00</p>
      </div>
      <ScrollIndicator target="about-intro" />
    </section>

    <ImageTextSection
      id="about-intro"
      image="/images/1.webp"
      image-alt="Medlemmer af Armbrydning Odense"
      image-right
      image-format="portrait"
      button-text="Læs mere om klubben"
      button-to="/om-klubben"
      button-variant="secondary"
    >
      <template #heading> Mere end <span class="highlight">bare</span> styrke </template>
      <p>
        Armbrydning handler om mere end bare råstyrke. Det handler også om teknik, udvikling og
        fællesskab.
      </p>

      <p>Hos Armbrydning Odense er der plads til både nybegyndere og erfarne armbrydere.</p>
    </ImageTextSection>

    <ImageTextSection
      image="/images/3.webp"
      image-alt="En mand, som armbryder med en pige"
      image-format="portrait"
      background-variant="secondary"
      button-text="Fortæl os at du kommer"
      button-to="/bliv-armbryder"
    >
      <template #heading>
        <span class="highlight">Ny</span> ved bordet? <br />Vi hjælper
        <span class="highlight">dig</span> i gang!
      </template>
      <h3>Du behøver ikke store overarme for at være med hos os!</h3>
      <p>Vi ved godt, at det kan være lidt grænseoverskridende at møde op et nyt sted.</p>

      <p>
        Derfor sørger vi for, at du bliver taget godt imod og får hjælp til at komme godt i gang i
        dit eget tempo.
      </p>

      <p>Vi står klar til at tage imod dig!</p>
    </ImageTextSection>
    <LocationSection />
    <!-- Nyhedskarusellen -->
    <NewsCarousel />
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

/* HERO ------------------------------------ */

.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100svh;
  box-sizing: border-box;
  padding-bottom: 8rem;
  overflow: hidden;
  background: v.$bg-primary;

  --scroll-indicator-bottom: 3.5rem;

  // Mørk overlay på herobilledet
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.74);
  }
}

/* HERO BILLEDE ------------------------------------ */

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* HERO INDHOLD ------------------------------------ */

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 1150px;
  padding: 3rem 1.5rem;
  text-align: center;

  h1 {
    font-family: v.$font-heading;
    font-size: clamp(2rem, 6vw, 5rem);
    line-height: 1.15;
    text-transform: uppercase;
    color: v.$color-lime;
    letter-spacing: 0.2rem;
  }

  p {
    margin-top: 1rem;
    font-weight: v.$font-bold;
    text-transform: uppercase;
    color: v.$color-off-white;
  }
}
</style>
