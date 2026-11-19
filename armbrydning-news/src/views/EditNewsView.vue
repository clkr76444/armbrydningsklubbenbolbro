<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
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
// Reference til tekstfeltet
const descriptionTextarea = ref(null);

const { feedbackDialog, errorMessage, openDialog, closeDialog } =
  useNewsDialog();

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

    const response = await fetch(
      `${getNewsItemUrl(newsId)}?auth=${encodeURIComponent(idToken)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": token,
        },
        body: JSON.stringify(updatedNews),
      },
    );

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
      <div class="form-field">
        <label for="news-title">
          Nyhedens titel <small>- max 100 tegn</small>
        </label>

        <input
          id="news-title"
          type="text"
          v-model="title"
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
          placeholder="/images/klubtraening.webp"
        />
      </div>

      <div class="form-field">
        <label for="news-description">
          Nyhedens tekst <small>- max 2000 tegn</small>
        </label>

        <button type="button" class="btn-bold" @click="makeBold">
          <strong>B</strong> Fed tekst
        </button>

        <textarea
          id="news-description"
          ref="descriptionTextarea"
          v-model="description"
          required
          maxlength="2000"
        ></textarea>
      </div>

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
        @click="closeDialog"
      >
        ×
      </button>

      <h2 v-if="errorMessage">Der opstod en fejl!</h2>
      <h2 v-else>Nyheden blev opdateret!</h2>

      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>

      <p v-else>Dine ændringer blev gemt.</p>

      <button type="button" class="btn-primary" @click="closeDialog">OK</button>
    </dialog>
  </main>
</template>
