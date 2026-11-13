<script setup>
import { ref } from 'vue'
import { ref as dbRef, push, set, serverTimestamp } from 'firebase/database'
import { database } from '../firebase'

const name = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

const isSending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function sendMessage() {
  if (isSending.value) return

  isSending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const messagesRef = dbRef(database, 'contactMessages')
    const newMessageRef = push(messagesRef)

    const newMessage = {
      name: name.value.trim(),
      phone: phone.value.trim(),
      subject: subject.value,
      message: message.value.trim(),
      createdAt: serverTimestamp(),
    }

    await set(newMessageRef, newMessage)

    successMessage.value = 'Din besked er sendt!'

    name.value = ''
    phone.value = ''
    subject.value = ''
    message.value = ''
  } catch (error) {
    console.error('Fejl ved indsendelse:', error)
    errorMessage.value = 'Beskeden kunne ikke sendes. Prøv igen.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="sendMessage">
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
        minlength="2"
        maxlength="100"
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
        minlength="8"
        maxlength="20"
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
        minlength="10"
        maxlength="2000"
        required
      ></textarea>
    </fieldset>

    <!-- Aktiveres når Firebase er implementeret -->
    <button type="submit" class="btn btn--primary" disabled>Send besked</button>
    <p v-if="successMessage" role="status">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" role="alert">
      {{ errorMessage }}
    </p>
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
