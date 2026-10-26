<script setup>
// ref() gør variabler reaktive.
// onMounted() kører kode, når komponenten er monteret i DOM'en.
import { ref, onMounted } from "vue";
import { formatDate } from "../utils/formatDate.js";

// Opretter en reaktiv variabel med et tomt array.
const news = ref([]);

const loadError = ref("");

// URL til Firebase Realtime Database.
const url =
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

// Kører, når komponenten er monteret.
onMounted(async () => {
  try {
    // Henter nyheder fra Firebase.
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Database fejl ved hentning af nyheder");
    }

    const data = await response.json();

    console.log("Nyheder fra Firebase:", data);

    // Omdanner Firebase-objektet til et array med [key, value]-par.
    // Hvis data er null, bruges et tomt objekt i stedet.
    const entries = Object.entries(data ?? {});

    console.log("Firebase som array:", entries);

    // Gennemgår hvert par og opretter et nyt nyhedsobjekt.
    // id er nyhedens nøgle, og item indeholder nyhedens oplysninger.
    const newsArray = entries.map(([id, item]) => {
      return {
        id: id,
        title: item.title,
        description: item.description,
        date: item.date,
      };
    });

    // Opdaterer det reaktive array med nyheder fra Firebase.
    // Vue opdaterer automatisk visningen via v-for.
    news.value = newsArray;
  } catch (error) {
    console.error("Fejl ved hentning af nyheder:", error);
    loadError.value = "Nyhederne kunne ikke hentes. Prøv igen.";
  }
});
</script>

<template>
  <main class="news-page">
    <h1>Nyheder fra Armbrydning Odense</h1>
    <p v-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Gennemgår news og opretter et article for hver nyhed. -->
    <!-- :key hjælper Vue med at identificere de enkelte elementer. -->
    <article v-for="item in news" :key="item.id" class="news-card">
      <h2>{{ item.title }}</h2>
      <p class="news-date">{{ formatDate(item.date) }}</p>
      <p>{{ item.description }}</p>
    </article>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v;

.news-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
