<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "firebase/app-check";
import { auth, appCheck } from "../firebase";

// Gemmer tilmeldingerne fra Firebase
const signups = ref([]);

// Holder styr på indlæsning og fejl
const isLoading = ref(true);
const loadError = ref("");

const updatingId = ref(null);
const statusError = ref("");

// Holder styr på den valgte tilmelding
const selectedSignup = ref(null);

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
  "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/trialSignups.json";

onMounted(async () => {
  try {
    // Venter på, at Firebase har afklaret loginstatus
    await auth.authStateReady();

    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    // Henter administratorens ID-token og App Check-token
    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // Henter tilmeldinger fra Firebase
    const response = await fetch(`${url}?auth=${encodeURIComponent(idToken)}`, {
      method: "GET",
      headers: {
        "X-Firebase-AppCheck": token,
      },
    });

    if (!response.ok) {
      throw new Error("Kunne ikke hente tilmeldinger");
    }

    const data = await response.json();

    // Omdanner Firebase-objektet til et array
    signups.value = Object.entries(data ?? {})
      .map(([id, item]) => ({
        id,
        ...item,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Fejl ved hentning af tilmeldinger:", error);
    loadError.value = "Tilmeldingerne kunne ikke hentes.";
  } finally {
    isLoading.value = false;
  }
});

function formatTrainingDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function toggleCompleted(item) {
  if (updatingId.value === item.id) return;

  updatingId.value = item.id;
  statusError.value = "";

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // Finder completed-feltet på den valgte tilmelding
    const completedUrl = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/trialSignups/${item.id}/completed.json`;

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
      throw new Error("Kunne ikke opdatere tilmeldingen");
    }

    item.completed = newStatus;
  } catch (error) {
    console.error("Fejl ved opdatering:", error);
    statusError.value = "Status kunne ikke opdateres. Prøv igen.";
  } finally {
    updatingId.value = null;
  }
}

function openDeleteDialog(item) {
  selectedSignup.value = item;
  deleteError.value = "";
  deleteDialog.value.showModal();
}

async function deleteSignup() {
  if (isDeleting.value || !selectedSignup.value) return;

  const signupId = selectedSignup.value.id;
  isDeleting.value = true;
  deleteError.value = "";

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Ingen bruger er logget ind");

    // Henter administratorens tokens
    const idToken = await user.getIdToken();
    const { token } = await getToken(appCheck);

    // Finder den specifikke tilmelding
    const deleteUrl = `https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app/trialSignups/${signupId}.json`;

    // Sletter tilmeldingen i Firebase
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
      throw new Error("Kunne ikke slette tilmeldingen");
    }

    // Fjerner tilmeldingen fra visningen
    signups.value = signups.value.filter((item) => item.id !== signupId);

    deleteDialog.value.close();
    selectedSignup.value = null;
  } catch (error) {
    console.error("Fejl ved sletning:", error);
    deleteError.value = "Tilmeldingen kunne ikke slettes. Prøv igen.";
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <main class="signups-page admin-overview-page">
    <h1>Tilmeldinger til prøvetræning</h1>
    <p v-if="statusError" role="alert">{{ statusError }}</p>
    <p>
      Her kan du se tilmeldinger til prøvetræning fra hjemmesidens formular.
    </p>

    <!-- Vises mens tilmeldingerne hentes -->
    <p v-if="isLoading">Henter tilmeldinger...</p>

    <!-- Vises hvis der opstår en fejl -->
    <p v-else-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Vises hvis der ikke er nogen tilmeldinger -->
    <p v-else-if="signups.length === 0">Der er ingen tilmeldinger endnu.</p>

    <!-- Viser alle modtagne tilmeldinger -->
    <section v-else class="admin-card-list">
      <article
        v-for="item in signups"
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
          <strong>Træningsdato:</strong>
          {{ formatTrainingDate(item.trainingDate) }} kl. 18.30
        </p>

        <p :class="{ 'sms-requested': item.wantsSmsConfirmation }">
          <strong>SMS-bekræftelse:</strong>
          {{ item.wantsSmsConfirmation ? "Ja, ønskes" : "Nej tak" }}
        </p>

        <p>
          <strong>Modtaget: </strong>
          {{ new Date(item.createdAt).toLocaleString("da-DK") }}
        </p>

        <div class="admin-card-actions">
          <!-- Markerer tilmeldingen som færdig eller ikke færdig -->
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
            Slet tilmelding
          </button>
        </div>
      </article>
    </section>

    <!-- Bekræftelsesdialog ved sletning -->
    <dialog
      ref="deleteDialog"
      class="feedback-dialog feedback-dialog--error"
      aria-labelledby="delete-signup-title"
    >
      <form method="dialog">
        <button
          type="submit"
          class="dialog-close"
          aria-label="Luk beskeden"
          :disabled="isDeleting"
        >
          ×
        </button>

        <h2 id="delete-signup-title">Slet tilmelding?</h2>

        <p>
          Er du sikker på, at du vil slette tilmeldingen fra
          <strong>{{ selectedSignup?.name }}</strong
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
            @click="deleteSignup"
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
