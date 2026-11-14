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
    <h2>{{ newsItem.title }}</h2>

    <p class="news-date">{{ formatDate(newsItem.date) }}</p>

    <!-- Viser kun et billede, hvis nyheden har en billed-URL -->
    <img
      v-if="newsItem.imageUrl"
      :src="getImageSrc(newsItem.imageUrl)"
      :alt="`Billede til nyheden: ${newsItem.title}`"
      class="news-card-image"
      loading="lazy"
    />

    <p>{{ newsItem.description }}</p>

    <slot></slot>
  </article>
</template>

<style scoped lang="scss">
.news-card-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
}
</style>
