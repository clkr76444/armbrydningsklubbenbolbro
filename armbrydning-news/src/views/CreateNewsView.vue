<script setup>
import { ref } from "vue";

// VARIABLER -----------------------------------------------------------
// opretter en variabel til nyhedens titel
const title = ref("");
// opretter en variabel til nyhedens beskrivelse
const description = ref("");
// opretter en variabel til fejlbeskeder
const errorMessage = ref("");
// varibel til at åbne og lukke popup-success-dialogen
const successDialog = ref(null);
// opretter en variabel til at holde styr på, om nyhedens gemmeprocess er afsluttet (false fordi vi ikke er igang med at gemme endnu)
const isSaving = ref(false);

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
    const response = await fetch(
      "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      },
    );

    if (!response.ok) {
      throw new Error("Database fejl ved oprettelse af nyhed");
    }

    title.value = "";
    description.value = "";

    successDialog.value.showModal();
  } catch (error) {
    console.error("Fejl ved oprettelse af nyhed", error);
    errorMessage.value = "Nyheden kunne ikke gemmes. Prøv igen.";
  } finally {
    isSaving.value = false;
  }
}

// lukker succes-dialogen
function closeSuccessDialog() {
  successDialog.value.close();
}
</script>

<template>
  <main class="create-news-page">
    <h1>Opret nyhed</h1>
    <form @submit.prevent="createNews">
      <!-- v-model binder input-feltet til title-variablen, så ændringer i input synkroniseres med variablen -->
      <label for="news-title">Nyhedens titel</label>
      <input
        id="news-title"
        type="text"
        v-model="title"
        placeholder="Indtast nyhedens titel"
        required
      />

      <!-- v-model binder textarea-feltet til description-variablen, så ændringer i input synkroniseres med variablen -->
      <label for="news-description">Nyhedens beskrivelse</label>
      <textarea
        id="news-description"
        v-model="description"
        placeholder="Indtast nyhedens beskrivelse"
        required
      ></textarea>

      <button type="submit" :disabled="isSaving">
        {{ isSaving ? "Gemmer..." : "Opret nyhed" }}
        <!-- viser "Gemmer..." mens nyheden gemmes, ellers "Opret nyhed" - bruger ternary operator, som er en kort måde at bruge if/else på -->
      </button>
    </form>

    <!-- Viser en fejlbesked, hvis nyheden ikke kunne gemmes -->
    <p v-if="errorMessage" class="error-message" role="alert">
      {{ errorMessage }}
    </p>

    <!-- Popup der vises, når nyheden er oprettet -->
    <dialog ref="successDialog" class="success-dialog">
      <button
        type="button"
        class="dialog-close"
        aria-label="Luk beskeden"
        @click="closeSuccessDialog"
      >
        ×
      </button>

      <h2>Nyheden er oprettet!</h2>
      <p>Din nyhed er blevet gemt.</p>

      <button type="button" class="dialog-confirm" @click="closeSuccessDialog">
        OK
      </button>
    </dialog>
  </main>
</template>
