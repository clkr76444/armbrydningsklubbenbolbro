<script setup>
// ref bruges til at gøre variabler reaktive, 
// onMounted bruges til at køre kode, når komponenten er monteret i DOM'en
import { ref, onMounted } from 'vue' 

const news = ref([ /* sørger for at opdatere nyhederne dynamisk */ 
  {
    id: 1,
    title: 'Armbrydning på Generator',
    description: 'Kom og prøv kræfter med sporten!'
  },
  {
    id: 2,
    title: 'Armbrydning',
    description: 'Kom og prøv kræfter med sporten!'
  }
])

// Henter nyheder fra Firebase-databasen via URL
const url = 'https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json'


onMounted(async () => {
  const response = await fetch(url)
  const data = await response.json()

  console.log('Nyheder fra Firebase:', data)
})

</script>

<template>
  <main class="news-page">
    <h1>Nyheder fra Armbrydning Odense</h1> <!-- Overskriften for nyhedssektionen -->

    <article v-for="item in news" :key="item.id" class="news-card"> <!-- v-for = gennemgår listen af nyheder som et loop og genererer et item for hver nyhed. :key=item.id sikrer, at Vue kan holde styr på hvert element korrekt -->
      <h2>{{ item.title }}</h2> <!-- viser titlen på nyheden -->
      <p>{{ item.description }}</p> <!-- viser beskrivelsen af nyheden -->
    </article>
  </main>
</template>

<style scoped lang="scss">
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
</style>