<script setup>
import { formatDate } from "../utils/formatDate.js";

defineProps({
  newsItem: {
    type: Object,
    required: true,
  },
});

// Henter adressen til hjemmesiden fra miljøvariablen
// bruger localhost hvis miljøvariablen ikke er sat
// replace fjerner eventuelt afsluttende skråstreg fra URL'en
const websiteUrl = (
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:5173"
).replace(/\/$/, "");

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
      :alt="newsItem.imageAlt || ''"
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
