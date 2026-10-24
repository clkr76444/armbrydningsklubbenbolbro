<script setup>
import { ref, onMounted } from "vue";
import { formatDate } from "../utils/formatDate.js";

// Gemmer listen over nyheder
const news = ref([]);

// Henter nyhederne fra Firebase, når siden indlæses
onMounted(async () => {
  const url =
    "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

  const response = await fetch(url);
  const data = await response.json();

  const entries = Object.entries(data ?? {});

  const newsArray = entries.map(([id, item]) => ({
    id: id,
    title: item.title,
    description: item.description,
    date: item.date,
  }));

  news.value = newsArray;

  console.log("Nyheder til redigering:", news.value);
});
</script>

<template>
  <main class="edit-news-list-page">
    <h1>Rediger nyheder</h1>
    <p>Vælg en nyhed, du vil redigere.</p>

    <section class="news-list">
      <article v-for="item in news" :key="item.id" class="news-card">
        <h2>{{ item.title }}</h2>
        <p class="news-date">{{ formatDate(item.date) }}</p>
        <p>{{ item.description }}</p>

        <RouterLink
          :to="{ name: 'edit-news', params: { id: item.id } }"
          class="btn-primary"
        >
          Rediger
        </RouterLink>
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v; //kan evt. fjernes pga. vi ikke bruger variabler her

.edit-news-list-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
