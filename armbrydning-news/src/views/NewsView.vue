<script setup>
// ref() gør variabler reaktive.
// onMounted() kører kode, når komponenten er monteret i DOM'en.
import { ref, onMounted } from "vue";

// Opretter en reaktiv variabel med et tomt array.
const news = ref([]);

// URL til Firebase Realtime Database.
const url =
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

// opretter en funktion til at formatere datoer fra YYYY-MM-DD til DD-MM-YYYY
function formatDate(date) {
  // const year, month, day gemmer de tre dele af datoen i hver sin variabel
  const [year, month, day] = date.split("-"); // datoen opdeles ved hjælp af bindestregerne.
  // returnerer datoen i dden ønskede rækkefølge.
  return `${day}/${month}-${year}`;
}

// Kører, når komponenten er monteret.
onMounted(async () => {
  // Henter nyheder fra Firebase.
  const response = await fetch(url);
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
});
</script>

<template>
  <main class="news-page">
    <h1>Nyheder fra Armbrydning Odense</h1>

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

.news-card {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.6;
  }
}

.news-date {
  font-size: 1.1rem;
  margin-top: 0.5rem;
  font-weight: v.$font-regular;
  letter-spacing: 0.01em;
  color: v.$color-lime;
}
</style>
