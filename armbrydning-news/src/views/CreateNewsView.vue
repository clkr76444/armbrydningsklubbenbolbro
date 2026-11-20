<script setup>
import { ref, nextTick } from "vue";
import { auth } from "../firebase";
import { getToken } from "firebase/app-check";
import { appCheck } from "../firebase";
import { useNewsDialog } from "../utils/useNewsDialog";
import { getNewsUrl } from "../config/constants";

const title = ref("");
const description = ref("");
const imageUrl = ref("");
const isSaving = ref(false);
const imageAlt = ref("");

const { feedbackDialog, errorMessage, openDialog, closeDialog } =
  useNewsDialog();

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
    imageAlt: imageAlt.value.trim(),
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

    const response = await fetch(
      `${getNewsUrl()}?auth=${encodeURIComponent(idToken)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": token,
        },
        body: JSON.stringify(newNews),
      },
    );

    if (!response.ok) {
      throw new Error("Database fejl ved oprettelse af nyhed");
    }

    title.value = "";
    description.value = "";
    imageUrl.value = "";
    imageAlt.value = "";

    openDialog();
  } catch (error) {
    console.error("Fejl ved oprettelse af nyhed", error);
    openDialog("Nyheden kunne ikke gemmes. Prøv igen.");
  } finally {
    isSaving.value = false;
  }
}

// Reference til tekstfeltet
const descriptionTextarea = ref(null);

// Gør den markerede tekst fed med Markdown
async function makeBold() {
  const textarea = descriptionTextarea.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  // Gør kun noget, hvis Christel har markeret tekst
  if (start === end || description.value.length + 4 > 2000) return;

  const selectedText = description.value.slice(start, end);

  description.value =
    description.value.slice(0, start) +
    `**${selectedText}**` +
    description.value.slice(end);

  await nextTick();

  textarea.focus();
  textarea.setSelectionRange(start + 2, end + 2);
}
</script>

<template>
  <main class="news-editor-page">
    <!-- Navigation tilbage til nyhedsoversigten -->
    <nav class="breadcrumb-nav" aria-label="Brødkrummesti">
      <ol class="breadcrumbs">
        <li>
          <RouterLink to="/nyheder">Oversigt over nyheder</RouterLink>
        </li>
        <li aria-current="page">Opret nyhed</li>
      </ol>
    </nav>

    <h1>Opret nyhed</h1>
    <form class="news-form" @submit.prevent="createNews">
      <div class="form-field">
        <label for="news-title">
          Nyhedens titel <small>- max 100 tegn</small>
        </label>
        <!-- v-model binder input-feltet til title-variablen, så ændringer i input synkroniseres med variablen -->
        <input
          id="news-title"
          type="text"
          v-model="title"
          placeholder="Indtast nyhedens titel"
          required
          maxlength="100"
        />
      </div>

      <div class="form-field">
        <label for="news-image">Billedets URL</label>
        <input
          id="news-image"
          type="text"
          v-model="imageUrl"
          placeholder="/images/test-news.webp"
        />
      </div>
      <div class="form-field">
        <label for="news-image-alt"
          >Billedets alt-tekst - beskriv billedet for skærmlæsere</label
        >
        <input
          id="news-image-alt"
          type="text"
          v-model="imageAlt"
          placeholder="Beskriv billedet"
          maxlength="150"
        />
      </div>

      <div class="form-field">
        <label for="news-description">
          Nyhedens tekst <small>- max 2000 tegn</small>
        </label>
        <!-- v-model binder textarea-feltet til description-variablen, så ændringer i input synkroniseres med variablen -->
        <textarea
          id="news-description"
          ref="descriptionTextarea"
          v-model="description"
          placeholder="Indtast nyhedens beskrivelse"
          required
          maxlength="2000"
        ></textarea>
      </div>

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
        @click="closeDialog"
      >
        ×
      </button>

      <h2 v-if="errorMessage">Der opstod en fejl!</h2>
      <h2 v-else>Nyheden er oprettet!</h2>

      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>
      <p v-else>Din nyhed er blevet gemt.</p>

      <button type="button" class="btn-primary" @click="closeDialog">OK</button>
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
