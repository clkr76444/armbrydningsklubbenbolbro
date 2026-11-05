<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  </header>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.page-hero {
  background-color: v.$bg-primary;
  padding: 4rem 1.5rem;
  text-align: center;
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
