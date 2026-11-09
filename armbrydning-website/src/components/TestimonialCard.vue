<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <article class="testimonial-card">
    <img
      v-if="image"
      :src="image"
      :alt="`Portræt af ${name}`"
      class="testimonial-card__image"
      loading="lazy"
    />

    <div class="testimonial-card__content">
      <blockquote>
        <p>“{{ quote }}”</p>
      </blockquote>

      <h3>{{ name }} – {{ age }} år</h3>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.testimonial-card {
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow: hidden;
  border: 1px solid v.$color-dark-gray;
  border-radius: 8px;
  background-color: v.$bg-primary;
  min-height: 340px;
}

.testimonial-card__image {
  width: 220px;
  height: auto;
  align-self: stretch;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center 20%;
}

.testimonial-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  padding: 2rem;
  text-align: left;

  blockquote {
    margin: 0;
    line-height: 1.7;
    font-style: italic;
  }

  h3 {
    color: v.$color-lime;
    font-size: 1.125rem;
    font-weight: v.$font-medium;
  }
}

@media (max-width: 799px) {
  .testimonial-card {
    min-height: 300px;
  }

  .testimonial-card__image {
    width: 110px;
  }

  .testimonial-card__content {
    padding: 1rem;
  }
}
</style>
