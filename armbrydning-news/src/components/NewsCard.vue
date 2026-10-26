<script setup>
import { formatDate } from "../utils/formatDate.js";

defineProps({
  newsItem: {
    type: Object,
    required: true,
  },
});
</script>

<!-- Gennemgår news og opretter et article for hver nyhed. -->
<!-- :key hjælper Vue med at identificere de enkelte elementer. -->
<template>
  <article class="news-card">
    <h2>{{ newsItem.title }}</h2>
    <p class="news-date">{{ formatDate(newsItem.date) }}</p>
    <p>{{ newsItem.description }}</p>
    <slot></slot>
  </article>
</template>
