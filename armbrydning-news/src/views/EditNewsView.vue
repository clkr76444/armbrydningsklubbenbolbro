<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

//Henter information om den aktuelle URL
const route = useRoute();

// Finder nyhedens ID fra URL'en
const newsId = route.params.id;

//Gemmer den eksisterende nyheds titel og beskrivelse fra Firebase
const title = ref("");
const description = ref("");

// Holder styr på om nyheden ikke findes
const newsNotFound = ref(false);

// Holder styr på om siden er ved at indlæse nyheden fra Firebase
const isLoading = ref(true);

// Gemmer en fejlbesked, hvis indlæsningen mislykkes
const loadError = ref("");

// Holder styr på om ændringerne er ved at blive gemt
const isSaving = ref(false);

//indeholder fejlbesked hvis opdateringen mislykkes
const errorMessage = ref("");

// giver adgang til popup-feedback-dialogen i vores template
const feedbackDialog = ref(null);

//Henter den eksisterende nyhed fra Firebase via nyhedens ID

onMounted(async () => {
  const url = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news/${newsId}.json`;

  try {
    // Henter den valgte nyhed fra Firebase
    const response = await fetch(url, {
      method: "GET",
    });

    // Kontrollerer om Firebase har svaret korrekt
    if (!response.ok) {
      throw new Error("Databasefejl ved hentning af nyhed");
    }

    // Konverterer svaret til JSON
    const data = await response.json();

    // Stopper funktionen, hvis nyheden ikke findes
    if (data === null) {
      console.log("Nyheden findes ikke i Firebase");
      newsNotFound.value = true;
      return;
    }

    // Indsætter nyhedens data i formularen
    title.value = data.title;
    description.value = data.description;
  } catch (error) {
    console.error("Fejl ved hentning af nyhed:", error);
    loadError.value = "Nyheden kunne ikke hentes. Prøv igen senere.";
  } finally {
    isLoading.value = false;
  }
});

async function updateNews() {
  // Forhindrer flere gemmeforsøg på samme tid
  if (isSaving.value) return;

  const updatedNews = {
    title: title.value,
    description: description.value,
  };

  const url = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news/${newsId}.json`;

  // Starter gemmeprocessen
  isSaving.value = true;
  errorMessage.value = "";

  try {
    // Sender ændringerne til Firebase
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNews),
    });

    // Kontrollerer om Firebase accepterede ændringerne
    if (!response.ok) {
      throw new Error("Databasefejl ved opdatering af nyhed");
    }

    console.log("Nyheden blev opdateret!");

    // Viser feedback-dialogen når nyheden er opdateret
    feedbackDialog.value.showModal();
  } catch (error) {
    console.error("Fejl ved opdatering af nyhed:", error);
    errorMessage.value = "Nyheden kunne ikke opdateres. Prøv igen.";

    // Viser feedback-dialogen når der opstod en fejl
    feedbackDialog.value.showModal();
  } finally {
    // Afslutter gemmeprocessen, uanset resultatet
    isSaving.value = false;
  }
}

function closefeedbackDialog() {
  feedbackDialog.value.close();
}
</script>

<template>
  <main class="news-editor-page">
    <nav class="breadcrumb-nav" aria-label="Brødkrummesti">
      <ol class="breadcrumbs">
        <li>
          <RouterLink to="/rediger">Oversigt over nyheder</RouterLink>
        </li>
        <li aria-current="page">Rediger nyhed</li>
      </ol>
    </nav>

    <h1>Rediger nyhed</h1>

    <p v-if="isLoading">Henter nyheden...</p>

    <p v-else-if="loadError" role="alert">
      {{ loadError }}
    </p>

    <p v-else-if="newsNotFound">
      Nyheden blev ikke fundet. Den kan være blevet slettet.
    </p>

    <form v-else class="news-form" @submit.prevent="updateNews">
      <fieldset>
        <legend id="title-label">Nyhedens titel</legend>

        <input
          id="news-title"
          type="text"
          v-model="title"
          aria-labelledby="title-label"
          required
        />
      </fieldset>

      <fieldset>
        <legend id="description-label">Nyhedens tekst</legend>

        <textarea
          id="news-description"
          v-model="description"
          aria-labelledby="description-label"
          required
        ></textarea>
      </fieldset>

      <button type="submit" class="btn-primary" :disabled="isSaving">
        {{ isSaving ? "Gemmer..." : "Gem ændringer" }}
      </button>
    </form>

    <!-- Popup der vises, når nyheden er opdateret -->
    <dialog
      ref="feedbackDialog"
      class="feedback-dialog"
      :class="{ 'feedback-dialog--error': errorMessage }"
    >
      <button
        type="button"
        class="dialog-close"
        aria-label="Luk besked"
        @click="closefeedbackDialog"
      >
        ×
      </button>

      <h2 v-if="errorMessage">Der opstod en fejl!</h2>
      <h2 v-else>Nyheden blev opdateret!</h2>

      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>

      <p v-else>Dine ændringer blev gemt.</p>

      <button type="button" class="btn-primary" @click="closefeedbackDialog">
        OK
      </button>
    </dialog>
  </main>
</template>
