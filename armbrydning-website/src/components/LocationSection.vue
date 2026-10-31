<script setup>
import { mapConsent } from '../composables/mapConsent'
</script>

<template>
  <section class="location-section section-bg section-bg--secondary">
    <div class="location-section__inner">
      <h2>Kom forbi i <span>Bolbro!</span></h2>

      <p>
        Du finder os på Middelfartvej 114 i Bolbro, Odense.
        <br />Vi træner <strong>hver</strong> tirsdag og torsdag kl. 18.30 - 20.00.
      </p>
      <iframe
        v-if="mapConsent === 'accepted'"
        src="https://maps.google.com/maps?q=Middelfartvej%20114%2C%205000%20Odense&output=embed"
        title="Kort over Armbrydning Odenses adresse"
        loading="lazy"
        referrerpolicy="no-referrer"
      ></iframe>

      <div v-else class="location-section__placeholder">
        <p>Google Maps er ikke aktiveret. Du kan acceptere Google Maps i cookieindstillingerne.</p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Middelfartvej%20114%2C%205000%20Odense"
          target="_blank"
          rel="noopener noreferrer"
        >
          Åbn adressen i Google Maps
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.location-section {
  color: v.$color-off-white;
  padding: 4rem 1.5rem;
  text-align: center;
  padding-inline: var(--container-padding);
}

.location-section__inner {
  max-width: 1200px;
  margin-inline: auto;
}

h2 {
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
  height: 280px;
  border: 0;
  border-radius: 8px;
}

.location-section__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 280px;
  padding: 2rem;
  text-align: center;

  a {
    color: v.$color-lime;
  }
}

@media (min-width: v.$breakpoint-tablet) {
  iframe {
    height: 350px;
  }
}

@media (min-width: v.$breakpoint-desktop) {
  iframe {
    height: 450px;
  }
}

@media (min-width: v.$breakpoint-desktop) {
  iframe {
    height: 450px;
  }
}
</style>
