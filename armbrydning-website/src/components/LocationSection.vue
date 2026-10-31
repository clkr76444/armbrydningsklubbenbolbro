<template>
  <section class="location-section">
    <div class="location-section__inner">
      <h2>Kom forbi i <span>Bolbro!</span></h2>

      <p>
        Du finder os på Middelfartvej 114 i Bolbro,Odense. Vi træner tirsdag og torsdag kl. 18.30 -
        20.00.
      </p>

      <iframe
        src="https://maps.google.com/maps?q=Middelfartvej%20114%2C%205000%20Odense&output=embed"
        title="Kort over Armbrydning Odenses adresse"
        loading="lazy"
        referrerpolicy="no-referrer"
      ></iframe>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.location-section {
  background: v.$bg-secondary;
  color: v.$color-off-white;
  padding: 4rem 1.5rem;
  text-align: center;
}

.location-section__inner {
  max-width: 1200px;
  margin-inline: auto;
}

h2 {
  font-family: v.$font-heading;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-wrap: balance;

  span {
    color: v.$color-lime;
  }
}

p {
  max-width: 600px;
  margin: 1rem auto 2rem;
  line-height: 1.6;
  text-wrap: pretty;
}

iframe {
  display: block;
  width: 100%;
  height: 350px;
  border: 0;
  border-radius: 8px;
}

@media (min-width: v.$breakpoint-desktop) {
  iframe {
    height: 450px;
  }
}
</style>
