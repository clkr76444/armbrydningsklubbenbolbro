<script setup>
import { mapConsent, setMapConsent } from '../composables/mapConsent'
</script>

<template>
  <section v-if="mapConsent === null" class="map-consent" aria-labelledby="map-consent-title">
    <h2 id="map-consent-title">Cookieindstillinger</h2>

    <p>
      Google Maps kan anvende cookies og behandle tekniske oplysninger, hvis du accepterer.
      <br />Du kan ændre dit valg i bunden af siden.
    </p>

    <a href="https://policies.google.com/privacy?hl=da" target="_blank" rel="noopener noreferrer">
      Læs Googles privatlivspolitik
    </a>

    <div class="map-consent__actions">
      <button type="button" @click="setMapConsent('rejected')">Afvis</button>

      <button type="button" @click="setMapConsent('accepted')">Accepter</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.map-consent {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 1000;

  max-width: 420px;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  margin-inline: auto;
  padding: 1.25rem;

  background: v.$bg-primary;
  color: v.$color-off-white;
  border: 1px solid v.$color-dark-gray;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 0.75rem;
    font-family: v.$font-heading;
    font-size: 1rem;
    text-transform: uppercase;
  }

  p {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    text-wrap: pretty;
  }

  a {
    color: v.$color-lime;
    font-size: 0.875rem;
    text-underline-offset: 3px;
  }
}

.map-consent__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;

  button {
    flex: 1;
    min-height: 44px;
    padding: 0.65rem;
    border: 1px solid v.$color-lime;
    border-radius: 4px;

    background: transparent;
    color: v.$color-lime;
    font: inherit;
    font-size: 0.875rem;
    font-weight: v.$font-medium;
    cursor: pointer;

    &:hover {
      background: v.$color-lime;
      color: v.$color-off-black;
    }

    &:focus-visible {
      outline: 2px solid v.$color-off-white;
      outline-offset: 3px;
    }
  }
}

// TABLET OG DESKTOP
@media (min-width: v.$breakpoint-tablet) {
  .map-consent {
    left: auto;
    margin-inline: 0;
  }
}
</style>
