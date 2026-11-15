<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { database } from '../firebase'

//Henter id'et fra URL'en
const route = useRoute()

//Reaktive variabler til artikel og indlæsningsstatus
const article = ref(null)
const isLoading = ref(true)
const loadError = ref('')

// Henter den valgte nyhed fra Firebase
onMounted(async () => {
  try {
    //finder nyheden ud fra id'et i URL'en
    const articleRef = dbRef(database, `news/${route.params.id}`)
    const snapshot = await get(articleRef)

    //Kontrollerer om nyheden findes
    if (snapshot.exists()) {
      article.value = snapshot.val()
    } else {
      loadError.value = 'Nyheden blev ikke fundet.'
    }
  } catch (error) {
    loadError.value = 'Nyheden kunne ikke indlæses. Prøv igen.'
  } finally {
    isLoading.value = false
  }
})

// formatterer datoen til en læsbar string
function formatDate(date) {
  if (!date) return ''

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <main class="news-detail-page">
    <!--Navigation tilbage til nyhedsoversigten-->
    <RouterLink :to="{ name: 'news' }" class="news-detail-page__back">
      ← Tilbage til nyheder
    </RouterLink>

    <!--Indlæsningsstatus-->
    <p v-if="isLoading">Indlæser nyhed...</p>

    <!--Fejlbesked-->
    <p v-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Viser den fulde artikel -->
    <article v-else-if="article" class="news-article">
      <h1>{{ article.title }}</h1>

      <time v-if="article.date" :datetime="article.date">{{ formatDate(article.date) }}</time>

      <!-- Viser billedet, hvis nyheden har et-->
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        :alt="article.imageAlt || `Billede til nyheden: ${article.title}`"
      />

      <!-- Viser hele nyhedsteksten -->
      <p class="news-article__description">
        {{ article.description }}
      </p>
    </article>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// NYHEDSARTIKEL - MOBILE FIRST
.news-detail-page {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem var(--container-padding, 1.5rem) 4rem;
}

//TILBAGE LINK
.news-detail-page__back {
  display: inline-block;
  margin-bottom: 2rem;
  color: v.$color-lime;
}

// ARTIKLENS INDHOLD
.news-article {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    margin: 0;
    font-family: v.$font-heading;
    font-size: clamp(1.8rem, 5vw, 3rem);
    overflow-wrap: anywhere;
    letter-spacing: 0.05em;
  }

  time {
    color: v.$color-lime;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    border-radius: 8px;
  }
}

.news-article__description {
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
</style>
