<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import NewsCard from "../components/NewsCard.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getToken } from "firebase/app-check";
import { appCheck } from "../firebase";
import { ADMIN_UID, getNewsUrl, getNewsItemUrl } from "../config/constants";

const router = useRouter();

const news = ref([]);
const loadError = ref("");
const isLoading = ref(true);
const isAdmin = ref(false);
const selectedNews = ref(null);
const deleteDialog = ref(null);
const isDeleting = ref(false);
const deleteError = ref("");
const imageAlt = ref("");

const unsubscribe = onAuthStateChanged(auth, (user) => {
  isAdmin.value = user?.uid === ADMIN_UID;
});

onUnmounted(unsubscribe);

onMounted(async () => {
  try {
    const { token } = await getToken(appCheck);

    const response = await fetch(getNewsUrl(), {
      method: "GET",
      headers: {
        "X-Firebase-AppCheck": token,
      },
    });

    if (!response.ok) {
      throw new Error("Database fejl ved hentning af nyheder");
    }

    const data = await response.json();

    console.log("Nyheder fra Firebase:", data);

    const entries = Object.entries(data ?? {});

    console.log("Firebase som array:", entries);

    const newsArray = entries.map(([id, item]) => {
      return {
        id: id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl ?? "",
        date: item.date,
        imageAlt: item.imageAlt ?? "",
      };
    });

    newsArray.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
    news.value = newsArray;
  } catch (error) {
    console.error("Fejl ved hentning af nyheder:", error);
    loadError.value = "Nyhederne kunne ikke hentes. Prøv igen.";
  } finally {
    isLoading.value = false;
  }
});

// Åbner slet-dialogen for den valgte nyhed hvis admin er logget ind
async function openDeleteDialog(item) {
  // Venter på, at Firebase har afklaret loginstatus
  await auth.authStateReady();

  // Hvis brugeren ikke er logget ind, send til login
  if (!auth.currentUser) {
    router.push({ name: "login" });
    return;
  }

  // Hvis brugeren er logget ind, åbnes dialogen
  selectedNews.value = item;
  deleteError.value = "";
  deleteDialog.value.showModal();
}

// Sletter den valgte nyhed fra Firebase
async function deleteNews() {
  if (isDeleting.value || !selectedNews.value) return;

  const newsId = selectedNews.value.id;

  isDeleting.value = true;

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
        method: "DELETE",
        headers: {
          "X-Firebase-AppCheck": token,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Databasefejl ved sletning af nyhed");
    }

    news.value = news.value.filter((item) => item.id !== newsId);
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
    <h1>Nyheder</h1>

    <p v-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Viser indlæsningsstatus indtil finally sætter isLoading til false -->
    <p v-if="isLoading" role="status">Indlæser nyheder...</p>

    <!-- Viser besked, hvis der ikke er nogen nyheder -->
    <p v-if="!isLoading && !loadError && news.length === 0">
      Ingen nyheder at vise.
    </p>

    <!-- Gennemgår nyhederne og sender hver nyhed til NewsCard via props -->
    <div class="news-grid">
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
    </div>

    <!-- Bekræftelsesdialog for sletning -->
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

        <!-- Viser titlen på den valgte nyhed -->
        <p>
          Er du sikker på at du vil slette
          <strong>{{ selectedNews?.title }}</strong
          >? Handlingen kan ikke fortrydes.
        </p>

        <!-- Viser fejlbesked, hvis sletningen mislykkes -->
        <p v-if="deleteError" class="form-error" role="alert">
          <strong>FEJL!</strong> {{ deleteError }}
        </p>

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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  h1 {
    text-align: center;
    text-wrap: balance;
  }
}

.news-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.5rem;
  align-items: stretch;

  // TABLET - FRA 800PX
  @media (min-width: v.$breakpoint-tablet) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // DESKTOP - FRA 1280PX
  @media (min-width: v.$breakpoint-desktop) {
    grid-template-columns: repeat(3, minmax(0, 340px));
    justify-content: space-between;
  }
}
</style>
