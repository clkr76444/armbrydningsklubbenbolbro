<script setup>
import ImageTextSection from '../components/ImageTextSection.vue'
import LocationSection from '../components/LocationSection.vue'
</script>

<template>
  <main>
    <section class="hero">
      <img src="/images/hero.jpg" alt="To personer, der dyrker armbrydning" class="hero__image" />

      <div class="hero__content">
        <h1>Armbrydning Odense</h1>
        <p>Hver tirsdag og torsdag <br />kl. 18.30 - 20.00</p>
      </div>
    </section>

    <ImageTextSection
      title="Mere end bare styrke"
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
      title="Ny ved bordet? Vi hjælper dig i gang!"
      image="/images/3.webp"
      image-alt="En mand, som armbryder med en pige"
      image-format="portrait"
      background-variant="secondary"
      button-text="Fortæl os at du kommer"
      button-to="/praktisk-info"
    >
      <template #heading>
        <span class="highlight">Ny</span> ved bordet? <br />Vi hjælper
        <span class="highlight">dig</span> i gang!
      </template>
      <p>
        <strong>Du behøver hverken erfaring eller store overarme for at være med hos os!</strong>
        <br />Vi ved godt, at det kan være lidt grænseoverskridende at møde op et nyt sted.
        <br /><br />Derfor sørger vi for, at du bliver taget godt imod og får hjælp til at komme
        godt i gang i dit eget tempo. <br />
        <br />Vi står klar til at tage imod dig!
      </p>
    </ImageTextSection>
    <ImageTextSection
      title="Her skal karusellen være"
      image="/images/2.webp"
      image-alt="En gruppe mennesker, der armbryder"
      image-right
      button-text="Se træningstider"
      button-to="/praktisk-info"
    >
      <template #heading> Her skal <span class="highlight">karusellen</span> være </template>
      <p>.</p>
    </ImageTextSection>
    <LocationSection />
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 600px;
  overflow: hidden;
  background: v.$bg-primary;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.74);
  }
}

.hero__image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
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
