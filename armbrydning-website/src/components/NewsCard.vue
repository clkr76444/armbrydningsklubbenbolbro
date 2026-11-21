<script setup>
// Modtager én nyhed fra NewsView via props
defineProps({
  newsItem: {
    type: Object,
    required: true,
  },
})

// Omdanner dato til dansk visning
function formatDate(date) {
  if (!date) return 'Dato ukendt'

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <article class="news-card">
    <!-- Hele kortet linker til den fulde artikel -->
    <RouterLink :to="{ name: 'news-detail', params: { id: newsItem.id } }" class="news-card__link">
      <!-- Viser billedet, hvis nyheden har en billed-URL -->
      <div v-if="newsItem.imageUrl" class="news-card__image-wrapper">
        <img
          :src="newsItem.imageUrl"
          :alt="newsItem.imageAlt || ''"
          class="news-card__image"
          loading="lazy"
        />
      </div>

      <div class="news-card__content">
        <h2>{{ newsItem.title }}</h2>

        <time class="news-card__date" :datetime="newsItem.date">
          {{ formatDate(newsItem.date) }}
        </time>

        <!-- Viser kun de første tre linjer og fjern stjerner fra Markdown -->
        <p class="news-card__description">
          {{ newsItem.description?.replace(/\*\*/g, '') }}
        </p>

        <span class="btn btn--secondary news-card__button"> Læs hele nyheden </span>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// NYHEDSKORT - MOBILE FIRST
.news-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  border: 1px solid v.$color-dark-gray;
  border-radius: 8px;
  overflow: hidden;
  background-color: v.$bg-secondary;
}

.news-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid v.$color-lime;
    outline-offset: -3px;
  }
}

.news-card__image-wrapper {
  display: grid;
  place-items: center;
  padding: 1rem 1rem 0;
}

.news-card__image {
  display: block;
  width: 100%;
  height: 210px;
  object-fit: contain;
  border-radius: 8px;
}

.news-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
  padding: 1.25rem;
  min-width: 0;

  h2 {
    margin: 0;
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    overflow-wrap: anywhere;
    letter-spacing: 0.07em;
  }
}

.news-card__date {
  color: v.$color-lime;
  font-size: 0.875rem;
}

.news-card__description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
  overflow-wrap: anywhere;
  margin: 0;
  line-height: 1.6;
}

.news-card__button {
  margin-top: auto;
  padding-top: 1rem;
  color: v.$color-lime;
  font-weight: v.$font-medium;
}
</style>
