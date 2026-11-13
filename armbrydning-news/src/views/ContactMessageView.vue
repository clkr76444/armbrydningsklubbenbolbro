<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "firebase/app-check";
import { auth, appCheck } from "../firebase";

// Gemmer kontaktbeskederne fra Firebase
const messages = ref([]);

// Holder styr på indlæsning og fejl
const isLoading = ref(true);
const loadError = ref("");

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
</script>

<template>
  <main class="messages-page">
    <h1>Kontaktbeskeder</h1>
    <p>Her kan du se henvendelser fra hjemmesidens kontaktformular.</p>

    <!-- Vises mens beskederne hentes -->
    <p v-if="isLoading">Henter beskeder...</p>

    <!-- Vises hvis der opstår en fejl -->
    <p v-else-if="loadError" role="alert">{{ loadError }}</p>

    <!-- Vises hvis der ikke er nogen beskeder -->
    <p v-else-if="messages.length === 0">Der er ingen kontaktbeskeder endnu.</p>

    <!-- Viser alle modtagne beskeder -->
    <section v-else>
      <article v-for="item in messages" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p><strong>Telefon:</strong> {{ item.phone }}</p>
        <p>
          <strong>Emne:</strong>
          {{ subjectLabels[item.subject] ?? item.subject }}
        </p>
        <p><strong>Besked:</strong> {{ item.message }}</p>
        <p>
          <strong>Modtaget:</strong>
          {{ new Date(item.createdAt).toLocaleString("da-DK") }}
        </p>
      </article>
    </section>
  </main>
</template>
