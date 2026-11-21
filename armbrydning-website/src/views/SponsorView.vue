<script setup>
import PageHero from '../components/PageHero.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
</script>

<template>
  <main class="sponsor-page">
    <PageHero
      title="Bliv sponsor"
      description="Vil du være med til at støtte sporten og fællesskabet i Odense? Vi er altid åbne for nye samarbejder."
      scroll-target="sponsor-content"
    />

    <section id="sponsor-content" class="sponsor-page__section">
      <ScrollReveal>
        <div class="sponsor-page__content">
          <h2>Støt <span class="highlight">Armbrydning Odense</span></h2>

          <p>
            Hos Armbrydning Odense arbejder vi på at gøre sporten tilgængelig for flere og skabe et
            fællesskab, hvor både nye og erfarne armbrydere føler sig velkomne.
          </p>

          <p>
            Som sponsor eller samarbejdspartner kan du være med til at støtte klubbens aktiviteter
            og udvikling. Vi er åbne for forskellige former for samarbejde og tager gerne en snak
            om, hvad der giver mening for begge parter.
          </p>

          <RouterLink to="/kontakt" class="btn btn--primary"> Kontakt os om sponsorat </RouterLink>
        </div>
      </ScrollReveal>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.sponsor-page__section {
  padding: 4rem var(--container-padding) 6rem;
  background: v.$bg-primary;
  color: v.$color-off-white;
}

.sponsor-page__content {
  max-width: 780px;
  margin-inline: auto;

  h2 {
    margin-bottom: 1.5rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    text-transform: uppercase;
  }

  p {
    margin-bottom: 1.25rem;
    line-height: 1.7;
  }

  .btn {
    margin-top: 1rem;
    display: flex;
    width: fit-content;
    margin: 1rem auto 0;
  }
}
</style>
