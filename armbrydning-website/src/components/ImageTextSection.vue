<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

  backgroundVariant: {
    type: String,
    default: 'primary',
  },
})

// Reference til sektionen i DOM'en
const sectionRef = ref(null)
// Gemmer resultatet af om sektionen er synlig i viewporten
const isVisible = ref(false)

// observere hvornår sektionen bliver synlig i viewporten
let observer

// Når komponenten mountes, opretter vi observeren.
// Hvis ikke IntersectionObserver er understøttet, sætter vi sektionen som synlig med det samme og stopper funktionen.
onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  // Opretter observeren på sektionen i DOM'en
  observer = new IntersectionObserver(
    // Callback-funktion, der kaldes, når sektionen krydser viewporten.
    // Entries er de observerede elementer, der krydser viewporten = index 0 pga. vi kigger på det første element fra listen.
    (entries) => {
      // Hvis entries er synlig i viewporten, sætter vi sektionen som synlig.
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect() // stopper observeren, når sektionen er synlig
      }
    },
    {
      // Threshold angiver hvor stor en del af sektionen, der skal være synlig, før callbacken kaldes.
      // 0.1 betyder at 10% af sektionen skal være tydelig før callbacken kaldes.
      threshold: 0.1,
    },
  )
  // her kører observeren og holder øje med sektionen i viewporten.
  observer.observe(sectionRef.value)
})

// Når komponenten unmountes, stopper vi observeren for at undgå at holde øje med noget, som vi ikke bruger længere.
onUnmounted(() => {
  observer?.disconnect() // optional chaining til at sikre, at vi kun kalder disconnect, hvis observeren eksisterer.
})
</script>

<template>
  <!--Vue tilføjer automatisk 'is-visible' klassen når <section> bliver synlig i viewporten-->
  <section
    ref="sectionRef"
    class="image-text-section"
    :class="{
      'is-visible': isVisible,
      'section-bg--secondary': backgroundVariant === 'secondary',
    }"
  >
    <div
      class="image-text-section__inner"
      :class="{ 'image-text-section__inner--reversed': imageRight }"
    >
      <div class="image-text-section__content">
        <h2>
          <slot name="heading">{{ title }}</slot>
        </h2>

        <div class="image-text-section__text">
          <slot></slot>
        </div>

        <RouterLink
          v-if="buttonText && buttonTo"
          :to="buttonTo"
          class="btn btn--full-mobile image-text-section__button"
          :class="`btn--${buttonVariant}`"
        >
          {{ buttonText }}
        </RouterLink>
      </div>

      <img
        class="image-text-section__image"
        :class="{ 'image-text-section__image--portrait': imageFormat === 'portrait' }"
        :src="image"
        :alt="imageAlt"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.image-text-section {
  color: v.$color-off-white;
}

.image-text-section__inner {
  display: grid;
  align-items: center;
  gap: 1.5rem;
  max-width: 1200px;
  margin-inline: auto;
  padding: 3rem 1.5rem 1.5rem;
  padding-inline: var(--container-padding);

  // Sektionens initiale tilstand før den bliver synlig
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.image-text-section__image {
  display: block;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  justify-self: center;
  border-radius: 8px;

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
    text-transform: uppercase;
    text-wrap: balance;

    :slotted(.highlight) {
      color: v.$color-lime;
    }
  }
}

.image-text-section__text {
  line-height: 1.6;
  text-wrap: pretty;

  :slotted(p) {
    margin-bottom: 1rem;
  }
}

.image-text-section__button {
  margin-top: 1rem;
}

// Når sektionen bliver synlig, tilføjes 'is-visible' klassen
.image-text-section.is-visible .image-text-section__inner {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .image-text-section__inner {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (min-width: v.$breakpoint-tablet) {
  .image-text-section__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    padding-block: 3rem;
  }

  // Billede til venstre
  .image-text-section__image {
    order: -1;
    justify-self: start;
    max-width: 300px;
    margin-right: 1.5rem;
  }

  // Billede til højre
  .image-text-section__inner--reversed {
    .image-text-section__image {
      order: 0;
      justify-self: end;
    }
  }
}

@media (min-width: v.$breakpoint-desktop) {
  .image-text-section__inner {
    gap: 3rem;
    padding-block: 4rem;
  }

  .image-text-section__image {
    max-width: 360px;
  }
}
</style>
