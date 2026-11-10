<script setup>
import { ref } from 'vue'

const name = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')
</script>

<template>
  <form class="contact-form" @submit.prevent>
    <!-- Navn -->
    <fieldset class="contact-form__field">
      <legend id="contact-name-label">Dit navn</legend>

      <input
        id="contact-name"
        v-model="name"
        type="text"
        autocomplete="name"
        placeholder="Indtast dit navn"
        aria-labelledby="contact-name-label"
        required
      />
    </fieldset>

    <!-- Telefonnummer -->
    <fieldset class="contact-form__field">
      <legend id="contact-phone-label">Telefonnummer</legend>

      <input
        id="contact-phone"
        v-model="phone"
        type="tel"
        autocomplete="tel"
        placeholder="Indtast dit telefonnummer"
        aria-labelledby="contact-phone-label"
        required
      />
    </fieldset>

    <!-- Emne -->
    <fieldset class="contact-form__field">
      <legend id="contact-subject-label">Emne</legend>

      <select
        id="contact-subject"
        v-model="subject"
        aria-labelledby="contact-subject-label"
        required
      >
        <option disabled value="">Vælg emne</option>
        <option value="start">Jeg vil gerne starte til armbrydning</option>
        <option value="general">Jeg har et generelt spørgsmål</option>
        <option value="sponsor">Jeg er interesseret i at blive sponsor</option>
        <option value="other">Andet</option>
      </select>
    </fieldset>

    <!-- Besked -->
    <fieldset class="contact-form__field">
      <legend id="contact-message-label">Din besked</legend>

      <textarea
        id="contact-message"
        v-model="message"
        placeholder="Skriv din besked her..."
        aria-labelledby="contact-message-label"
        rows="6"
        required
      ></textarea>
    </fieldset>

    <!-- Aktiveres når Firebase er implementeret -->
    <button type="submit" class="btn btn--primary" disabled>Send besked</button>
  </form>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// KONTAKTFORMULAR - MOBILE FIRST
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
}

// FORMULARFELTER
.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  margin: 0;
  padding: 0.5rem 1rem 1rem;
  border: 1px solid transparent;
  border-radius: 8px;

  // Fremhæver feltet, når brugeren arbejder i det
  &:focus-within {
    border-color: v.$color-lime;
  }

  legend {
    margin-bottom: 0.5rem;
    color: v.$color-lime;
    font-weight: v.$font-medium;
  }

  input,
  select,
  textarea {
    display: block;
    width: 100%;
    min-width: 0;
    padding: 0.75rem 1rem;
    background-color: v.$color-off-white;
    color: v.$color-off-black;
    border: 1px solid v.$color-off-black;
    border-radius: 8px;
    font: inherit;
  }

  textarea {
    min-height: 180px;
    resize: vertical;
  }

  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid v.$color-lime;
    outline-offset: 2px;
  }
}

// SEND-KNAP - MOBILE FIRST
.contact-form > button {
  width: calc(100% - 2rem);
  align-self: center;
}

// TABLET OG DESKTOP
@media (min-width: v.$breakpoint-tablet) {
  .contact-form > button {
    width: auto;
  }
}
</style>
