<script setup>
import { ref, onMounted } from "vue";
import { formatDate } from "../utils/formatDate.js";

// Gemmer listen over nyheder
const news = ref([]);

//holder styr på hvilken nyhed brugeren vil slette. null fordi ingen nyhed er valgt i starten.
const selectedNews = ref(null);

//giver adgang til bekræftelsesdialogen for sletning. null fordi dialogen ikke er vist i starten.
const deleteDialog = ref(null);

// Holder styr på om sletningen er i gang - samme princip som isSaving for redigering.
const isDeleting = ref(false);

// Gemmer en fejlbesked ved mislykketsletning
const deleteError = ref("");

// Henter nyhederne fra Firebase, når siden indlæses
onMounted(async () => {
  const url =
    "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

  const response = await fetch(url);
  const data = await response.json();

  const entries = Object.entries(data ?? {});

  const newsArray = entries.map(([id, item]) => ({
    id: id,
    title: item.title,
    description: item.description,
    date: item.date,
  }));

  news.value = newsArray;

  console.log("Nyheder til redigering:", news.value);
});

// Åbner slet-dialogen for den valgte nyhed.
function openDeleteDialog(item) {
  selectedNews.value = item; //husk den valgte nyhed
  deleteError.value = ""; // nulstiller fejlbeskeden når dialogen åbnes. For at sikre at der ikke står en gammel fejlbesked fra tidligere sletningsforsøg
  deleteDialog.value.showModal(); //åbner slet-dialogen
}

// funktion til at slette den valgte nyhed fra Firebase
async function deleteNews() {
  if (isDeleting.value || !selectedNews.value) return;

  // forhindre sletning, hvis der ikke er valgt en nyhed, eller hvis vi er igang med at slette
  const newsId = selectedNews.value.id;

  const url = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news/${newsId}.json`;

  isDeleting.value = true;

  try {
    throw new Error("TEST: Simuleret fejl ved sletning"); //SLET MIG OM LIDT
    // sender DELETE request til Firebase for at slette nyheden
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Databasefejl ved sletning af nyhed");
    }

    // opdaterer listen over nyheder fra vores lokale liste. filter gennemgår alle nyheder og beholder alle nyheder undtaget den slettede.
    news.value = news.value.filter((item) => item.id !== newsId);

    // lukker dialogen
    deleteDialog.value.close();
    selectedNews.value = null;
    console.log("Nyhed slettet:", newsId);
  } catch (error) {
    console.error("Fejl ved sletning af opslag:", error);
    deleteError.value = "Nyheden kunne ikke slettes. Prøv igen.";
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <main class="edit-news-list-page">
    <h1>Rediger nyheder</h1>
    <p>Vælg en nyhed, du vil redigere.</p>

    <section class="news-list">
      <article v-for="item in news" :key="item.id" class="news-card">
        <h2>{{ item.title }}</h2>
        <p class="news-date">{{ formatDate(item.date) }}</p>
        <p>{{ item.description }}</p>

        <!--router-link navigerer til en anden side-->
        <RouterLink
          :to="{ name: 'edit-news', params: { id: item.id } }"
          class="btn-primary"
        >
          Rediger
        </RouterLink>

        <!--button til at udfører handling, her slet nyhed.-->
        <button
          type="button"
          class="btn-delete"
          @click="openDeleteDialog(item)"
        >
          <!--click fortæller at vores funktion "openDeleteDialog" skal køres når knappen klikkes, item er den valgte nyhed fra v-for loppet -->
          Slet
        </button>
      </article>
    </section>

    <!--Bekræftelsesdialog for sletning-->
    <dialog
      ref="deleteDialog"
      class="feedback-dialog feedback-dialog--error"
      aria-labelledby="delete-title"
    >
      <form method="dialog">
        <button type="submit" class="dialog-close" aria-label="Luk beskeden">
          ×
        </button>

        <h2 id="delete-title">Vil du slette dette opslag?</h2>

        <!--Viser titlen på den valgte nyhed. ? Betyder at JavaScript kun viser titlen hvis selectedNews ikke er null eller undefined -->
        <p>
          Er du sikker på at du vil slette
          <strong>{{ selectedNews?.title }}</strong
          >? Handlingen kan ikke fortrydes.
        </p>

        <!-- hvis der opstår en fejl ved sletning, vis fejlbeskeden -->
        <p v-if="deleteError" class="delete-error" role="alert">
          {{ deleteError }}
        </p>

        <button type="submit" class="btn-primary">Annuller handling</button>

        <button
          type="button"
          class="btn-delete"
          :disabled="isDeleting"
          @click="deleteNews"
        >
          {{ isDeleting ? "Sletter..." : "Ja, slet" }}
        </button>
      </form>
    </dialog>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v; //kan evt. fjernes pga. vi ikke bruger variabler her

.edit-news-list-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
