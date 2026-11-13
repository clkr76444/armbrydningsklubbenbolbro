<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
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
    .then((userCredential) => {
      const user = userCredential.user;
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
    <h1>Administratorlogin</h1>

    <form class="news-form" @submit.prevent="logIn">
      <fieldset>
        <legend id="login-email-label">E-mail</legend>
        <input
          id="login-email"
          v-model="email"
          type="email"
          autocomplete="username"
          placeholder="Indtast din e-mail"
          aria-labelledby="login-email-label"
          required
        />
      </fieldset>

      <fieldset>
        <legend id="login-password-label">Adgangskode</legend>
        <input
          id="login-password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Indtast din adgangskode"
          aria-labelledby="login-password-label"
          required
        />
      </fieldset>

      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
      <p v-if="successMessage" role="status">{{ successMessage }}</p>

      <button type="submit" class="btn-primary" :disabled="isSigningIn">
        {{ isSigningIn ? "Logger ind..." : "Log ind" }}
      </button>
    </form>
  </main>
</template>
