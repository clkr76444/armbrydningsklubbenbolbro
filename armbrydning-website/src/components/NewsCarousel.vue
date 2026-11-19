<script setup>
import { ref, computed, onMounted } from 'vue'
import { ref as dbRef, get } from 'firebase/database'
import { database } from '../firebase'

//reaktive variabler til nyheder og indlæsning
const news = ref([])
const activeIndex = ref(0)
const isLoading = ref(true)
const loadError = ref('')

// Finder de tre nyheder, som skal vises i karrusellen
const visibleNews = computed(() => {
  const count = Math.min(3, news.value.length)

  return Array.from({ length: count }, (_, index) => {
    return news.value[(activeIndex.value + index) % news.value.length]
  })
})

// Henter de seneste nyheder fra Firebase
onMounted(async () => {
  try {
    const newsRef = dbRef(database, 'news')
    const snapshot = await get(newsRef)
    const data = snapshot.val() ?? {}

    //Omdanner firebase-objektet til et array med id
    const newsArray = Object.entries(data).map(([id, item]) => ({
      id,
      title: item.title,
      date: item.date,
      imageUrl: item.imageUrl ?? '',
      imageAlt: item.imageAlt ?? '',
    }))

    // Filtrerer nyheder uden billeder fra og sorterer de nyeste først
    news.value = newsArray
      .filter((item) => item.imageUrl?.trim())
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  } catch (error) {
    console.error('Fejl ved hentning af nyheder:', error)
    loadError.value = 'Nyheder kunne ikke indlæses. Prøv igen senere.'
  } finally {
    isLoading.value = false
  }
})

// Skifter til næste nyhed
function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % news.value.length
}

// Skifter til forrige nyhed
function previousSlide() {
  activeIndex.value = (activeIndex.value - 1 + news.value.length) % news.value.length
}

// Gemmer startpositionen ved swipe på mobil
let touchStartX = 0
let touchStartY = 0

function onTouchStart(event) {
  touchStartX = event.touches[0].screenX
  touchStartY = event.touches[0].screenY
}

//Undersøger om brugeren har swipet vandret
function onTouchEnd(event) {
  if (news.value.length < 2) return

  const differenceX = touchStartX - event.changedTouches[0].screenX
  const differenceY = touchStartY - event.changedTouches[0].screenY

  //Ignorerer små bevægelser og lodrette swipes
  if (Math.abs(differenceX) < 50 || Math.abs(differenceX) < Math.abs(differenceY)) {
    return
  }

  if (differenceX > 0) {
    nextSlide()
  } else {
    previousSlide()
  }
}
</script>

<template>
  <section class="news-carousel section-bg section-bg--secondary" aria-label="Seneste nyheder">
    <div class="news-carousel__container">
      <h2>Seneste <span class="highlight">nyt</span> fra klubben</h2>

      <p v-if="isLoading">Indlæser nyheder...</p>

      <p v-else-if="loadError" role="alert">{{ loadError }}</p>

      <p v-else-if="news.length === 0">Der er ingen nyheder med billeder endnu</p>

      <div v-else class="news-carousel__content">
        <!--Viser den aktive nyhed-->

        <!-- Viser op til tre nyhedsbilleder -->
        <div
          class="news-carousel__grid"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <!-- Gennemgår de synlige nyheder -->
          <RouterLink
            v-for="item in visibleNews"
            :key="item.id"
            :to="{ name: 'news-detail', params: { id: item.id } }"
            :aria-label="`Læs nyheden: ${item.title}`"
            class="news-carousel__link"
          >
            <img
              :src="item.imageUrl"
              :alt="item.imageAlt || ''"
              class="news-carousel__image"
              loading="lazy"
            />
          </RouterLink>
        </div>

        <!-- Navigation mellem nyhederne -->
        <div v-if="news.length > 1" class="news-carousel__controls">
          <button type="button" aria-label="Forrige nyhed" @click="previousSlide">‹</button>

          <!-- Prikker som viser den aktive nyhed -->
          <div class="news-carousel__dots">
            <button
              v-for="(item, index) in news"
              :key="item.id"
              type="button"
              :aria-label="`Vis nyhed: ${item.title}`"
              :aria-pressed="activeIndex === index"
              :class="{ 'is-active': activeIndex === index }"
              @click="activeIndex = index"
            ></button>
          </div>

          <button type="button" aria-label="Næste nyhed" @click="nextSlide">›</button>
        </div>
      </div>

      <!-- Link til den samlede nyhedsside -->
      <RouterLink :to="{ name: 'news' }" class="btn btn--secondary"> Se alle nyheder </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// NYHEDSKARRUSEL - MOBILE FIRST
.news-carousel {
  background-color: v.$bg-secondary;
  padding: 4rem var(--container-padding, 1.5rem);
}

.news-carousel__container {
  max-width: 1150px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h2 {
    text-align: center;
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
}

// INDHOLD I NYHEDSKARRUSELLEN
.news-carousel__content {
  width: 100%;
  max-width: 1000px;
}

// BILLEDGRID - MOBILE FIRST
.news-carousel__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;

  // MOBIL - Viser kun det første billede
  .news-carousel__link:nth-child(n + 2) {
    display: none;
  }

  // TABLET - Viser de første 2 billeder
  @media (min-width: v.$breakpoint-tablet) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .news-carousel__link:nth-child(2) {
      display: block;
    }
  }

  // DESKTOP - Viser alle 3 billeder
  @media (min-width: v.$breakpoint-desktop) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    .news-carousel__link:nth-child(3) {
      display: block;
    }
  }
}

// HVERT NYHEDSBILLEDE
.news-carousel__link {
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  text-decoration: none;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid v.$color-lime;
    outline-offset: 3px;
  }
}

.news-carousel__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// NAVIGATION TIL NYHEDSKARRUSEL
.news-carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;

  // Pileknapper - samme styling som testimonial-karrusellen
  > button {
    border: 0;
    background: none;
    color: v.$color-lime;
    font-size: 2.5rem;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid v.$color-lime;
      outline-offset: 3px;
    }
  }
}

// NAVIGATIONSPRIKKER
.news-carousel__dots {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  button {
    width: 12px;
    height: 12px;
    min-width: 12px;
    padding: 0;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background-color: v.$color-dark-gray;
    cursor: pointer;

    // Viser den aktive nyhed
    &.is-active {
      background-color: v.$color-lime;
    }

    &:focus-visible {
      outline: 2px solid v.$color-lime;
      outline-offset: 3px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .news-carousel__controls button {
    transition: none;
  }
}
</style>
