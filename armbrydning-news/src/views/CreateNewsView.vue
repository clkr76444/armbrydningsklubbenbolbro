<script setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { getToken } from "firebase/app-check";
import { appCheck } from "../firebase";
import { useNewsDialog } from "../utils/useNewsDialog";
import { getNewsUrl } from "../config/constants";

const title = ref("");
const description = ref("");
const imageUrl = ref("");
const isSaving = ref(false);

const { feedbackDialog, errorMessage, openDialog, closeDialog } = useNewsDialog();

async function createNews() {
  if (isSaving.value) return;

  if (!title.value.trim() || !description.value.trim()) {
    openDialog("Titel og beskrivelse må ikke være tomme.");
    return;
  }

  const newNews = {
    title: title.value.trim(),
    description: description.value.trim(),
    imageUrl: imageUrl.value.trim(),
    date: new Date().toISOString().slice(0, 10),
  };

  isSaving.value = true;

  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Ingen bruger er logget ind");
    }

    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    const response = await fetch(`${getNewsUrl()}?auth=${encodeURIComponent(idToken)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": token,
      },
      body: JSON.stringify(newNews),
    });

    if (!response.ok) {
      throw new Error("Database fejl ved oprettelse af nyhed");
    }

    title.value = "";
    description.value = "";
    imageUrl.value = "";

    openDialog();
  } catch (error) {
    console.error("Fejl ved oprettelse af nyhed", error);
    openDialog("Nyheden kunne ikke gemmes. Prøv igen.");
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <main class="news-editor-page">
    <!-- Navigation tilbage til nyhedsoversigten -->
    <nav class="breadcrumb-nav" aria-label="Brødkrummesti">
      <ol class="breadcrumbs">
        <li>
          <RouterLink to="/">Oversigt over nyheder</RouterLink>
        </li>
        <li aria-current="page">Opret nyhed</li>
      </ol>
    </nav>

    <h1>Opret nyhed</h1>
    <form class="news-form" @submit.prevent="createNews">
      <fieldset>
        <legend id="title-label">
          Nyhedens titel <small>- max 100 tegn</small>
        </legend>
        <!-- v-model binder input-feltet til title-variablen, så ændringer i input synkroniseres med variablen -->
        <input
          id="news-title"
          type="text"
          v-model="title"
          placeholder="Indtast nyhedens titel"
          required
          maxlength="100"
          aria-labelledby="title-label"
        />
      </fieldset>

      <fieldset>
        <legend id="image-label">Billedets URL</legend>
        <input
          id="news-image"
          type="text"
          v-model="imageUrl"
          placeholder="/images/test-news.webp"
          aria-labelledby="image-label"
        />
      </fieldset>

      <fieldset>
        <legend id="description-label">
          Nyhedens tekst <small>- max 2000 tegn</small>
        </legend>
        <!-- v-model binder textarea-feltet til description-variablen, så ændringer i input synkroniseres med variablen -->
        <textarea
          id="news-description"
          v-model="description"
          placeholder="Indtast nyhedens beskrivelse"
          required
          maxlength="2000"
          aria-labelledby="description-label"
        ></textarea>
      </fieldset>

      <button type="submit" class="btn-primary" :disabled="isSaving">
        {{ isSaving ? "Gemmer..." : "Opret nyhed" }}
        <!-- viser "Gemmer..." mens nyheden gemmes, ellers "Opret nyhed" - bruger ternary operator, som er en kort måde at bruge if/else på -->
      </button>
    </form>

    <!-- Popup der vises, når nyheden er oprettet -->
    <dialog
      ref="feedbackDialog"
      class="feedback-dialog"
      :class="{ 'feedback-dialog--error': errorMessage }"
    >
      <button
        type="button"
        class="dialog-close"
        aria-label="Luk beskeden"
        @click="closefeedbackDialog"
      >
        ×
      </button>

      <h2 v-if="errorMessage">Der opstod en fejl!</h2>
      <h2 v-else>Nyheden er oprettet!</h2>

      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>
      <p v-else>Din nyhed er blevet gemt.</p>

      <button type="button" class="btn-primary" @click="closefeedbackDialog">
        OK
      </button>
    </dialog>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v;

.create-news-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;

  h1 {
    margin-bottom: 2rem;
  }
}
</style>
