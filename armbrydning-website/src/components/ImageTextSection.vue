<script setup>
defineProps({
  title: String,
  image: String,
  imageAlt: String,

  imageRight: {
    type: Boolean,
    default: false,
  },

  imageFormat: {
    type: String,
    default: 'landscape',
  },

  buttonText: String,
  buttonTo: String,

  buttonVariant: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <section class="image-text-section">
    <div
      class="image-text-section__inner"
      :class="{ 'image-text-section__inner--reversed': imageRight }"
    >
      <img
        class="image-text-section__image"
        :class="{ 'image-text-section__image--portrait': imageFormat === 'portrait' }"
        :src="image"
        :alt="imageAlt"
      />

      <div class="image-text-section__content">
        <h2>
          <slot name="heading">{{ title }}</slot>
        </h2>

        <div class="image-text-section__text">
          <slot />
        </div>

        <RouterLink
          v-if="buttonText && buttonTo"
          :to="buttonTo"
          class="image-text-section__button"
          :class="`image-text-section__button--${buttonVariant}`"
        >
          {{ buttonText }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.image-text-section {
  background: v.$bg-primary;
  color: v.$color-off-white;
}

.image-text-section__inner {
  display: grid;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin-inline: auto;
  padding: 4rem 1.5rem;
}

.image-text-section__image {
  display: block;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  justify-self: center;

  &--portrait {
    aspect-ratio: 3 / 4;
  }
}

.image-text-section__content {
  h2 {
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 1rem;
    letter-spacing: 0.2rem;
    text-wrap: balance;

    :slotted(.highlight) {
      color: v.$color-lime;
    }
  }
}

.image-text-section__text {
  line-height: 1.6;

  :slotted(p) {
    margin-bottom: 1rem;
  }
}

.image-text-section__button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid v.$color-lime;
  border-radius: 0.25rem;
  font-weight: v.$font-bold;
  text-decoration: none;

  &--primary {
    background: v.$color-lime;
    color: v.$color-off-black;
  }

  &--secondary {
    background: transparent;
    color: v.$color-lime;
  }

  &:focus-visible {
    outline: 2px solid v.$color-off-white;
    outline-offset: 4px;
  }
}

@media (min-width: v.$breakpoint-tablet) {
  .image-text-section__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .image-text-section__inner--reversed {
    .image-text-section__image {
      order: 2;
    }
  }
}
</style>
