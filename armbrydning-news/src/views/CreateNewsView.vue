<script setup>
import { ref } from "vue";

// opretter en variabel til nyhedens titel
const title = ref("");
// opretter en variabel til nyhedens beskrivelse
const description = ref("");
// opretter en variabel til fejlbeskeder
const errorMessage = ref("");
// varibel til at åbne og lukke popup-feedback-dialogen
const feedbackDialog = ref(null);
// opretter en variabel til at holde styr på, om nyhedens gemmeprocess er afsluttet (false fordi vi ikke er igang med at gemme endnu)
const isSaving = ref(false);

const url =
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

// FUNKTIONER -----------------------------------------------------------
// funktionen opretter et nyt objekt "newNews" med de to key-value-par: titel og beskrivelse
// async funktionen gør det muligt at bruge await inde i funktionen, så vi kan vente på fetch-kaldet og få svaret fra Firebase
async function createNews() {
  if (isSaving.value) return;

  const newNews = {
    title: title.value,
    description: description.value,

    // new Date () opretter en dato med det aktuelle tidspunkt
    // .toISOString() omdanner datoen til ISO-format, som er standard dato og tidsformat i UTC (coordinated Universaal Time)
    // .slice(0, 10) udtrækker kun de 10 første tegn, så vi får datoen i formatet YYYY-MM-DD
    date: new Date().toISOString().slice(0, 10),
  };

  // sætter isSaving til true, da vi nu starter gemmeprocessen
  isSaving.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNews),
    });

    if (!response.ok) {
      throw new Error("Database fejl ved oprettelse af nyhed");
    }

    title.value = "";
    description.value = "";

    feedbackDialog.value.showModal();
  } catch (error) {
    console.error("Fejl ved oprettelse af nyhed", error);
    errorMessage.value = "Nyheden kunne ikke gemmes. Prøv igen.";
    feedbackDialog.value.showModal();
  } finally {
    isSaving.value = false;
  }
}

// lukker feedback-dialogen
function closefeedbackDialog() {
  feedbackDialog.value.close();
}
</script>

<template>
  <main class="news-editor-page">
    <h1>Opret nyhed</h1>
    <form class="news-form" @submit.prevent="createNews">
      <fieldset>
        <legend id="title-label">Nyhedens titel</legend>
        <!-- v-model binder input-feltet til title-variablen, så ændringer i input synkroniseres med variablen -->
        <input
          id="news-title"
          type="text"
          v-model="title"
          placeholder="Indtast nyhedens titel"
          required
          aria-labelledby="title-label"
        />
      </fieldset>
      <fieldset>
        <legend id="description-label">Nyhedens tekst</legend>
        <!-- v-model binder textarea-feltet til description-variablen, så ændringer i input synkroniseres med variablen -->
        <textarea
          id="news-description"
          v-model="description"
          placeholder="Indtast nyhedens beskrivelse"
          required
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

.feedback-dialog {
  width: min(90vw, 450px);
  max-height: calc(100dvh - 2rem);
  box-sizing: border-box;

  margin: auto;
  padding: 3rem 2rem 2rem;
  position: relative;
  overflow-y: auto;

  background-color: v.$color-off-black;
  color: v.$color-off-white;
  border: 1px solid v.$color-lime;
  border-radius: 8px;
  text-align: center;
}

.feedback-dialog--error {
  border-color: v.$color-red;

  h2 {
    color: v.$color-red;
  }
}

@media (max-width: 480px) {
  .feedback-dialog {
    padding: 2.5rem 1rem 1.5rem;
  }
}

h2 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
}

.feedback-dialog::backdrop {
  background-color: rgba(v.$color-off-black, 0.85);
}

.dialog-close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  padding: 0.25rem;

  background: transparent;
  border: none;
  color: v.$color-off-white;
  font-size: 1.75rem;
  cursor: pointer;
}

.dialog-confirm {
  padding: 0.75rem 2rem;
  background-color: v.$color-lime;
  border: none;
  border-radius: 8px;
  color: v.$color-off-black;
  cursor: pointer;
}

.dialog-confirm:hover {
  filter: brightness(0.9);
}
</style>
