<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "firebase/app-check";
import { auth, appCheck } from "../firebase";

// Gemmer kontaktbeskederne fra Firebase
const messages = ref([]);

// Holder styr på indlæsning og fejl
const isLoading = ref(true);
const loadError = ref("");

// Holder styr på opdatering af henvendelser
const updatingId = ref(null);
const statusError = ref("");

// Holder styr på hvilken besked der skal slettes
const selectedMessage = ref(null);

// Reference til bekræftelsesdialogen
const deleteDialog = ref(null);

// Status og fejl ved sletning
const isDeleting = ref(false);
const deleteError = ref("");

// Labels til at vise emner på en mere læsevenlig måde
const subjectLabels = {
  start: "Jeg vil gerne starte til armbrydning",
  general: "Jeg har et generelt spørgsmål",
  sponsor: "Jeg er interesseret i at blive sponsor",
  other: "Andet",
};

const url =
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/contactMessages.json";

onMounted(async () => {
  try {
    // Venter på, at Firebase har afklaret loginstatus
    await auth.authStateReady();

    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    // Henter administratorens ID-token og App Check-token
    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // Henter kontaktbeskeder fra Firebase
    const response = await fetch(`${url}?auth=${encodeURIComponent(idToken)}`, {
      method: "GET",
      headers: {
        "X-Firebase-AppCheck": token,
      },
    });

    if (!response.ok) {
      throw new Error("Kunne ikke hente kontaktbeskeder");
    }

    const data = await response.json();

    // Omdanner Firebase-objektet til et array
    messages.value = Object.entries(data ?? {})
      .map(([id, item]) => ({
        id,
        ...item,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Fejl ved hentning af kontaktbeskeder:", error);
    loadError.value = "Kontaktbeskederne kunne ikke hentes.";
  } finally {
    isLoading.value = false;
  }
});

async function toggleCompleted(item) {
  // Undgår at opdatere samme besked flere gange samtidig
  if (updatingId.value === item.id) return;

  updatingId.value = item.id;
  statusError.value = "";

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    // Henter administratorens tokens
    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // Finder completed-feltet på den valgte besked
    const completedUrl = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/contactMessages/${item.id}/completed.json`;

    // Skifter mellem true og false
    const newStatus = !item.completed;

    const response = await fetch(
      `${completedUrl}?auth=${encodeURIComponent(idToken)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": token,
        },
        body: JSON.stringify(newStatus),
      },
    );

    if (!response.ok) {
      throw new Error("Kunne ikke opdatere henvendelsen");
    }

    // Opdaterer visningen, når Firebase har gemt ændringen
    item.completed = newStatus;
  } catch (error) {
    console.error("Fejl ved opdatering:", error);
    statusError.value = "Status kunne ikke opdateres. Prøv igen.";
  } finally {
    updatingId.value = null;
  }
}

function openDeleteDialog(item) {
  selectedMessage.value = item;
  deleteError.value = "";
  deleteDialog.value.showModal();
}

async function deleteMessage() {
  if (isDeleting.value || !selectedMessage.value) return;

  const messageId = selectedMessage.value.id;
  isDeleting.value = true;
  deleteError.value = "";

  try {
    // Finder den indloggede administrator
    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    // Henter tokens
    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // URL til den specifikke kontaktbesked
    const deleteUrl = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/contactMessages/${messageId}.json`;

    // Sletter beskeden i Firebase
    const response = await fetch(
      `${deleteUrl}?auth=${encodeURIComponent(idToken)}`,
      {
        method: "DELETE",
        headers: {
          "X-Firebase-AppCheck": token,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Kunne ikke slette kontaktbeskeden");
    }

    // Fjerner beskeden fra visningen
    messages.value = messages.value.filter((item) => item.id !== messageId);

    deleteDialog.value.close();
    selectedMessage.value = null;
  } catch (error) {
    console.error("Fejl ved sletning:", error);
    deleteError.value = "Beskeden kunne ikke slettes. Prøv igen.";
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <main class="messages-page admin-overview-page">
    <h1>Kontaktbeskeder</h1>
    <p>Her kan du se henvendelser fra hjemmesidens kontaktformular.</p>
    <p v-if="statusError" role="alert">{{ statusError }}</p>

    <!-- Vises mens beskederne hentes -->
    <p v-if="isLoading">Henter beskeder...</p>

    <!-- Vises hvis der opstår en fejl -->
    <p v-else-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Vises hvis der ikke er nogen beskeder -->
    <p v-else-if="messages.length === 0">Der er ingen kontaktbeskeder endnu.</p>

    <!-- Viser alle modtagne beskeder -->
    <section v-else class="admin-card-list">
      <article
        v-for="item in messages"
        :key="item.id"
        class="admin-card"
        :class="{ 'admin-card--completed': item.completed }"
      >
        <h2>{{ item.name }}</h2>

        <p>
          <strong>Telefon: </strong>
          <a :href="`tel:${item.phone}`">{{ item.phone }}</a>
        </p>

        <p>
          <strong>Emne: </strong>
          {{ subjectLabels[item.subject] ?? item.subject }}
        </p>

        <p><strong>Besked: </strong> {{ item.message }}</p>

        <p>
          <strong>Modtaget: </strong>
          {{ new Date(item.createdAt).toLocaleString("da-DK") }}
        </p>

        <div class="admin-card-actions">
          <!-- Markerer henvendelsen som færdig eller ikke færdig -->
          <button
            type="button"
            class="btn-primary"
            :disabled="updatingId === item.id"
            @click="toggleCompleted(item)"
          >
            {{
              updatingId === item.id
                ? "Gemmer..."
                : item.completed
                  ? "Markér som ikke færdig"
                  : "Markér som færdig"
            }}
          </button>

          <!-- Åbner bekræftelsesdialogen -->
          <button
            type="button"
            class="btn-delete"
            @click="openDeleteDialog(item)"
          >
            Slet henvendelse
          </button>
        </div>
      </article>
    </section>

    <!-- Bekræftelsesdialog ved sletning -->
    <dialog
      ref="deleteDialog"
      class="feedback-dialog feedback-dialog--error"
      aria-labelledby="delete-title"
    >
      <form method="dialog">
        <button type="submit" class="dialog-close" aria-label="Luk beskeden">
          ×
        </button>

        <h2 id="delete-title">Slet henvendelse?</h2>

        <p>
          Er du sikker på, at du vil slette henvendelsen fra
          <strong>{{ selectedMessage?.name }}</strong
          >? Handlingen kan ikke fortrydes.
        </p>

        <p v-if="deleteError" class="delete-error" role="alert">
          {{ deleteError }}
        </p>

        <div class="delete-dialog-actions">
          <button
            type="button"
            class="btn-delete"
            :disabled="isDeleting"
            @click="deleteMessage"
          >
            {{ isDeleting ? "Sletter..." : "Ja, slet" }}
          </button>

          <button type="submit" class="btn-primary" :disabled="isDeleting">
            Annuller
          </button>
        </div>
      </form>
    </dialog>
  </main>
</template>
