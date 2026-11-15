<script setup>
import { ref, onMounted } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { database } from '../firebase'
import NewsCard from '../components/NewsCard.vue'
import PageHero from '../components/PageHero.vue'

// Opretter reaktive variabler til nyheder og indlæsningsstatus
const news = ref([])
const isLoading = ref(true)
const loadError = ref('')

// Henter nyheder fra Firebase, når siden bliver indlæst
onMounted(async () => {
  try {
    const newsRef = dbRef(database, 'news')
    const snapshot = await get(newsRef)

    // Henter data fra Firebase eller bruger et tomt objekt
    const data = snapshot.val() ?? {}

    // Omdanner Firebase-objektet til et array med ID
    const newsArray = Object.entries(data).map(([id, item]) => {
      return {
        id: id,
        title: item.title,
        description: item.description,
        date: item.date,
        imageUrl: item.imageUrl ?? '',
      }
    })

    // Sorterer nyhederne, så de nyeste kommer først
    newsArray.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

    // Gemmer nyhederne i vores reaktive array
    news.value = newsArray
  } catch (error) {
    console.error('Fejl ved hentning af nyheder:', error)
    loadError.value = 'Nyhederne kunne ikke indlæses. Prøv igen.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="news-page">
    <!-- Genbruger den samme hero som på de øvrige undersider -->
    <PageHero
      title="Nyheder"
      description="Følg med i, hvad der sker hos Armbrydning Odense."
      scroll-target="news-content"
    />

    <!-- Indholdet, som brugeren kan scrolle ned til -->
    <section id="news-content" class="news-page__content" aria-label="Nyhedsoversigt">
      <!-- Viser status, mens nyhederne indlæses -->
      <p v-if="isLoading" role="status">Indlæser nyheder...</p>

      <!-- Viser fejl, hvis Firebase-kaldet mislykkes -->
      <p v-else-if="loadError" role="alert">
        {{ loadError }}
      </p>

      <!-- Viser besked, hvis der endnu ikke findes nyheder -->
      <p v-else-if="news.length === 0">Der er ingen nyheder endnu.</p>

      <!-- Gennemgår nyhederne og sender data til NewsCard via props -->
      <div v-else class="news-grid">
        <NewsCard v-for="item in news" :key="item.id" :news-item="item" />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// NYHEDSSIDE - MOBILE FIRST
.news-page {
  width: 100%;
}

// INDHOLD UNDER HEROEN
.news-page__content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem var(--container-padding, 1.5rem) 4rem;

  > p {
    text-align: center;
    margin-bottom: 2rem;
  }
}

// NYHEDSGRID
.news-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.5rem;

  // TABLET
  @media (min-width: v.$breakpoint-tablet) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // DESKTOP
  @media (min-width: v.$breakpoint-desktop) {
    grid-template-columns: repeat(3, minmax(0, 340px));
    justify-content: space-between;
  }
}
</style>
