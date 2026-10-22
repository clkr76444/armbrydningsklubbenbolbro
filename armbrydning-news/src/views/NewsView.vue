<script setup>
import { ref } from 'vue'

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