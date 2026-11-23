<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ADMIN_UID } from "../config/constants";
import { auth } from "../firebase";

// Formularens værdier
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isSigningIn = ref(false);

// Logger en eksisterende bruger ind
function logIn() {
  if (isSigningIn.value) return;

  errorMessage.value = "";
  successMessage.value = "";
  isSigningIn.value = true;

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Kontrollerer om brugeren er administrator
      if (user.uid !== ADMIN_UID) {
        await signOut(auth);
        errorMessage.value = "Du har ikke adgang til administrationen.";
        password.value = "";
        return;
      }

      successMessage.value = `Du er logget ind som ${user.email}`;
      password.value = "";
    })

    .catch((error) => {
      console.error("Loginfejl:", error.code);
      errorMessage.value = "Login mislykkedes. Kontrollér dine oplysninger.";
    })
    .finally(() => {
      isSigningIn.value = false;
    });
}
</script>

<template>
  <main class="news-editor-page">
    <h1>Admin login</h1>

    <form class="news-form" @submit.prevent="logIn">
      <div class="form-field">
        <label for="login-email">E-mail</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          autocomplete="username"
          placeholder="Indtast din e-mail"
          required
        />
      </div>

      <div class="form-field">
        <label for="login-password">Adgangskode</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Indtast din adgangskode"
          required
        />
      </div>

      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
      <p v-if="successMessage" role="status">{{ successMessage }}</p>

      <button type="submit" class="btn-primary" :disabled="isSigningIn">
        {{ isSigningIn ? "Logger ind..." : "Log ind" }}
      </button>
    </form>
  </main>
</template>
