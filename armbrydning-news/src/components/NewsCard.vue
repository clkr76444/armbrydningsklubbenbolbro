<script setup>
import { formatDate } from "../utils/formatDate.js";

defineProps({
  newsItem: {
    type: Object,
    required: true,
  },
});

// Test: billederne ligger i hjemmesidens public-mappe.
// Senere erstatter vi localhost med hjemmesidens rigtige adresse.
const websiteUrl = "http://localhost:5173";

const getImageSrc = (url) => {
  if (url.startsWith("/")) {
    return `${websiteUrl}${url}`;
  }

  return url;
};
</script>

<template>
  <article class="news-card">
    <!-- Viser kun et billede, hvis nyheden har en billed-URL -->
    <img
      v-if="newsItem.imageUrl"
      :src="getImageSrc(newsItem.imageUrl)"
      :alt="`Billede til nyheden: ${newsItem.title}`"
      class="news-card-image"
      loading="lazy"
    />

    <!-- Samler tekst og knapper, så billedet kan fylde hele kortets bredde -->
    <div class="news-card__content">
      <h2>{{ newsItem.title }}</h2>

      <p class="news-date">{{ formatDate(newsItem.date) }}</p>

      <p class="news-card-description">{{ newsItem.description }}</p>

      <!-- Her indsættes administrationsknapperne via slot -->
      <slot></slot>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v;

.news-card-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  object-position: center;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}
</style>
