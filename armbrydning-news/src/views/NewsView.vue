<script setup>
// ref() gør variabler reaktive.
// onMounted() kører kode, når komponenten er monteret i DOM'en.
import { ref, onMounted } from "vue";
import NewsCard from "../components/NewsCard.vue";

// Opretter en reaktiv variabel med et tomt array.
const news = ref([]);

const loadError = ref("");

const isLoading = ref(true); // Holder styr på om nyhederne er ved at blive hentet

// midlertidig variabel til at holde styr på om brugeren er admin
const isAdmin = ref(true);

// Holder styr på hvilken nyhed brugeren vil slette
const selectedNews = ref(null);

// Giver adgang til bekræftelsesdialogen
const deleteDialog = ref(null);

// Holder styr på om sletningen er i gang
const isDeleting = ref(false);

// Gemmer en fejlbesked ved mislykket sletning
const deleteError = ref("");

// URL til Firebase Realtime Database.
const url =
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news.json";

// Kører, når komponenten er monteret.
onMounted(async () => {
  try {
    // Henter nyheder fra Firebase.
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Database fejl ved hentning af nyheder");
    }

    const data = await response.json();

    console.log("Nyheder fra Firebase:", data);

    // Omdanner Firebase-objektet til et array med [key, value]-par.
    // Hvis data er null, bruges et tomt objekt i stedet.
    const entries = Object.entries(data ?? {});

    console.log("Firebase som array:", entries);

    // Gennemgår hvert par og opretter et nyt nyhedsobjekt.
    // id er nyhedens nøgle, og item indeholder nyhedens oplysninger.
    const newsArray = entries.map(([id, item]) => {
      return {
        id: id,
        title: item.title,
        description: item.description,
        date: item.date,
      };
    });

    // Sorterer nyhederne efter dato, så de nyeste vises først.
    // localeCompare sammenligner datoer som strings.
    // ?? "" beskytter sorteringen hvis en dato mangler.
    newsArray.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
    // Opdaterer det reaktive array med nyheder fra Firebase.
    // Vue opdaterer automatisk visningen via v-for.
    news.value = newsArray;
  } catch (error) {
    console.error("Fejl ved hentning af nyheder:", error);
    loadError.value = "Nyhederne kunne ikke hentes. Prøv igen.";
  } finally {
    isLoading.value = false; // Sætter isLoading til false, når hentningen er færdig
  }
});

// Åbner slet-dialogen for den valgte nyhed
function openDeleteDialog(item) {
  selectedNews.value = item; // Gemmer den valgte nyhed
  deleteError.value = ""; // Nulstiller eventuelle tidligere fejlbeskeder
  deleteDialog.value.showModal(); // Åbner bekræftelsesdialogen
}

// Sletter den valgte nyhed fra Firebase
async function deleteNews() {
  // Stopper funktionen, hvis en sletning allerede er i gang,
  // eller hvis der ikke er valgt en nyhed
  if (isDeleting.value || !selectedNews.value) return;

  const newsId = selectedNews.value.id;

  // URL til den specifikke nyhed, der skal slettes
  const deleteUrl = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/news/${newsId}.json`;

  isDeleting.value = true;

  try {
    // Sender DELETE-kaldet til Firebase
    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Databasefejl ved sletning af nyhed");
    }

    // Fjerner den slettede nyhed fra vores lokale array
    news.value = news.value.filter((item) => item.id !== newsId);

    // Lukker dialogen og nulstiller den valgte nyhed
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
  <main class="news-page">
    <h1>Nyheder fra Armbrydning Odense</h1>

    <!--RouterLink bruges til at navigerer mellem sider uden at genindlæse hele hjemmesiden-->
    <RouterLink
      v-if="isAdmin"
      to="/opret"
      id="create-news-link"
      class="btn-primary"
    >
      Opret nyhed
    </RouterLink>

    <p v-if="loadError" role="alert">{{ loadError }}</p>
    <!-- Viser Indlæsningsstatus indtil finally sætter isLoading til false -->
    <p v-if="isLoading" role="status">Indlæser nyheder...</p>

    <!-- Empty state: Hvis indlæsningen er færdig, og der ikke er opstået en fejl og nyhedslisten er tom -->
    <p v-if="!isLoading && !loadError && news.length === 0">
      Ingen nyheder at vise.
    </p>

    <!-- Gennemgår nyhederne og sender hver nyhed til NewsCard via props -->
    <NewsCard v-for="item in news" :key="item.id" :news-item="item">
      <!-- Viser kun administrationsknapperne, hvis isAdmin er true -->
      <!-- Knapperne indsættes i NewsCards slot -->
      <div v-if="isAdmin" class="news-card-actions">
        <!-- Navigerer til redigeringssiden for den valgte nyhed -->
        <RouterLink
          :to="{ name: 'edit-news', params: { id: item.id } }"
          class="btn-primary"
        >
          Rediger
        </RouterLink>

        <!-- Åbner slette-dialogen for den valgte nyhed -->
        <button
          type="button"
          class="btn-delete"
          @click="openDeleteDialog(item)"
        >
          Slet
        </button>
      </div>
    </NewsCard>

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
          <strong>FEJL!</strong> {{ deleteError }}
        </p>

        <!--Knapper i div-container-->
        <div class="delete-dialog-actions">
          <button
            type="button"
            class="btn-delete"
            :disabled="isDeleting"
            @click="deleteNews"
          >
            {{ isDeleting ? "Sletter..." : "Ja, slet" }}
          </button>
          <button type="submit" class="btn-primary">Annuller handling</button>
        </div>
      </form>
    </dialog>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v;

.news-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
