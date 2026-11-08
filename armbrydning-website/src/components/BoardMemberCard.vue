<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="board-member-card">
    <img
      :src="image"
      :alt="`Portræt af ${name}`"
      class="board-member-card__image"
      loading="lazy"
      decoding="async"
    />

    <div class="board-member-card__content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.board-member-card {
  overflow: hidden;
  border-radius: 8px;
  background-color: v.$bg-secondary;
}

.board-member-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.board-member-card__content {
  padding: 1.5rem;

  h3 {
    font-family: v.$font-heading;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: v.$color-lime;
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
  }

  p {
    font-weight: v.$font-regular;
    line-height: 1.6;
  }
}
</style>
