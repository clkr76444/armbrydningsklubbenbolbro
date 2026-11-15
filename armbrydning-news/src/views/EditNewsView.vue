<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { auth, appCheck } from "../firebase";
import { getToken } from "firebase/app-check";
import { useNewsDialog } from "../utils/useNewsDialog";
import { getNewsItemUrl } from "../config/constants";

const route = useRoute();
const newsId = route.params.id;

const title = ref("");
const description = ref("");
const imageUrl = ref("");

const newsNotFound = ref(false);
const isLoading = ref(true);
const loadError = ref("");
const isSaving = ref(false);

const { feedbackDialog, errorMessage, openDialog, closeDialog } = useNewsDialog();

onMounted(async () => {
  try {
    const { token } = await getToken(appCheck);

    const response = await fetch(getNewsItemUrl(newsId), {
      method: "GET",
      headers: {
        "X-Firebase-AppCheck": token,
      },
    });

    if (!response.ok) {
      throw new Error("Databasefejl ved hentning af nyhed");
    }

    const data = await response.json();

    if (data === null) {
      console.log("Nyheden findes ikke i Firebase");
      newsNotFound.value = true;
      return;
    }

    title.value = data.title;
    description.value = data.description;
    imageUrl.value = data.imageUrl ?? "";
  } catch (error) {
    console.error("Fejl ved hentning af nyhed:", error);
    loadError.value = "Nyheden kunne ikke hentes. Prøv igen senere.";
  } finally {
    isLoading.value = false;
  }
});

async function updateNews() {
  if (isSaving.value) return;

  if (!title.value.trim() || !description.value.trim()) {
    openDialog("Titel og beskrivelse skal indeholde tekst.");
    return;
  }

  const updatedNews = {
    title: title.value.trim(),
    description: description.value.trim(),
    imageUrl: imageUrl.value.trim(),
  };

  isSaving.value = true;

  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Ingen bruger er logget ind");
    }

    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    const response = await fetch(`${getNewsItemUrl(newsId)}?auth=${encodeURIComponent(idToken)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": token,
      },
      body: JSON.stringify(updatedNews),
    });

    if (!response.ok) {
      throw new Error("Databasefejl ved opdatering af nyhed");
    }

    console.log("Nyheden blev opdateret!");
    openDialog();
  } catch (error) {
    console.error("Fejl ved opdatering af nyhed:", error);
    openDialog("Nyheden kunne ikke opdateres. Prøv igen.");
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <main class="news-editor-page">
    <nav class="breadcrumb-nav" aria-label="Brødkrummesti">
      <ol class="breadcrumbs">
        <li>
          <RouterLink to="/">Oversigt over nyheder</RouterLink>
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
        <legend id="title-label">
          Nyhedens titel <small>- max 100 tegn</small>
        </legend>

        <input
          id="news-title"
          type="text"
          v-model="title"
          aria-labelledby="title-label"
          required
          maxlength="100"
        />
      </fieldset>

      <fieldset>
        <legend id="image-label">Billedets URL</legend>

        <input
          id="news-image"
          type="text"
          v-model="imageUrl"
          placeholder="/images/klubtraening.webp"
          aria-labelledby="image-label"
        />
      </fieldset>

      <fieldset>
        <legend id="description-label">
          Nyhedens tekst <small>- max 2000 tegn</small>
        </legend>

        <textarea
          id="news-description"
          v-model="description"
          aria-labelledby="description-label"
          required
          maxlength="2000"
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
