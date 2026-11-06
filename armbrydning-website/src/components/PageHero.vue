<script setup>
import ScrollIndicator from './ScrollIndicator.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  scrollTarget: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="page-hero">
    <div class="page-hero__content">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <ScrollIndicator v-if="scrollTarget" :target="scrollTarget" />
  </header>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.page-hero {
  position: relative;
  min-height: clamp(32rem, 80svh, 50rem);
  box-sizing: border-box;

  display: grid;
  place-items: center;

  background-color: v.$bg-primary;
  padding: 4rem 1.5rem 7rem;
  text-align: center;

  --scroll-indicator-bottom: 0.75rem;
}

.page-hero__content {
  max-width: 1200px;
  margin-inline: auto;

  h1 {
    font-family: v.$font-heading;
    font-size: clamp(3rem, 7vw, 5rem);
    color: v.$color-lime;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  p {
    max-width: 700px;
    margin: 1rem auto 0;
    color: v.$color-off-white;
    line-height: 1.6;
  }
}
</style>
