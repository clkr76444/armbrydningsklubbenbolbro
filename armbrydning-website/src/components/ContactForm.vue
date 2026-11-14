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

// Valideringsfejl for de enkelte felter
const nameError = ref('')
const phoneError = ref('')
const subjectError = ref('')
const messageError = ref('')

// VALIDERING AF FORMULARFELTER -----------------------

// Kontrollerer at navnet indeholder 2-100 tegn
function validateName() {
  const trimmedName = name.value.trim()

  nameError.value =
    trimmedName.length >= 2 && trimmedName.length <= 100
      ? ''
      : 'Indtast et navn på mellem 2 og 100 tegn.'
}

// Kontrollerer at telefonnummeret er gyldigt
function validatePhone() {
  // Fjerner mellemrum, parenteser og bindestreger
  const cleanedPhone = phone.value.replace(/[\s()-]/g, '')

  const isValid = /^\+?\d{8,15}$/.test(cleanedPhone)

  phoneError.value = isValid ? '' : 'Indtast et gyldigt telefonnummer.'
}

// Kontrollerer at brugeren har valgt et gyldigt emne
function validateSubject() {
  const validSubjects = ['start', 'general', 'sponsor', 'other']

  subjectError.value = validSubjects.includes(subject.value) ? '' : 'Vælg venligst et emne.'
}

// Kontrollerer at beskeden indeholder 10-2000 tegn
function validateMessage() {
  const trimmedMessage = message.value.trim()

  messageError.value =
    trimmedMessage.length >= 10 && trimmedMessage.length <= 2000
      ? ''
      : 'Beskeden skal indeholde mellem 10 og 2000 tegn.'
}

// INDSENDELSE AF KONTAKTFORMULAR -----------------------

async function sendMessage() {
  if (isSending.value) return

  successMessage.value = ''
  errorMessage.value = ''

  // Validerer alle formularfelter inden indsendelse
  validateName()
  validatePhone()
  validateSubject()
  validateMessage()

  // Stopper indsendelsen hvis et eller flere felter er ugyldige
  if (nameError.value || phoneError.value || subjectError.value || messageError.value) {
    return
  }

  // Finder tidspunktet for sidste indsendelse
  const lastSent = Number(localStorage.getItem('contactLastSent') || 0)

  // Kontrollerer om der er gået 15 minutter
  const cooldown = 15 * 60 * 1000

  if (Date.now() - lastSent < cooldown) {
    errorMessage.value = 'Vent 15 minutter, før du sender igen.'
    return
  }

  isSending.value = true

  try {
    const messagesRef = dbRef(database, 'contactMessages')
    const newMessageRef = push(messagesRef)

    const newMessage = {
      name: name.value.trim(),
      phone: phone.value.replace(/[\s()-]/g, ''),
      subject: subject.value,
      message: message.value.trim(),
      createdAt: serverTimestamp(),
    }

    await set(newMessageRef, newMessage)

    // Gemmer tidspunktet efter en vellykket indsendelse
    localStorage.setItem('contactLastSent', String(Date.now()))

    successMessage.value = 'Din besked er sendt!'

    // Nulstiller formularen efter en vellykket indsendelse
    name.value = ''
    phone.value = ''
    subject.value = ''
    message.value = ''

    nameError.value = ''
    phoneError.value = ''
    subjectError.value = ''
    messageError.value = ''
  } catch (error) {
    console.error('Fejl ved indsendelse:', error)
    errorMessage.value = 'Beskeden kunne ikke sendes. Prøv igen.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="sendMessage" novalidate>
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
        :aria-invalid="!!nameError"
        :aria-describedby="nameError ? 'contact-name-error' : undefined"
        @blur="validateName"
        @input="nameError = ''"
        minlength="2"
        maxlength="100"
        required
      />

      <p v-if="nameError" id="contact-name-error" class="form-field-error" role="alert">
        {{ nameError }}
      </p>
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
        :aria-invalid="!!phoneError"
        :aria-describedby="phoneError ? 'contact-phone-error' : undefined"
        @blur="validatePhone"
        @input="phoneError = ''"
        minlength="8"
        maxlength="20"
        required
      />

      <p v-if="phoneError" id="contact-phone-error" class="form-field-error" role="alert">
        {{ phoneError }}
      </p>
    </fieldset>

    <!-- Emne -->
    <fieldset class="contact-form__field">
      <legend id="contact-subject-label">Emne</legend>

      <select
        id="contact-subject"
        v-model="subject"
        aria-labelledby="contact-subject-label"
        :aria-invalid="!!subjectError"
        :aria-describedby="subjectError ? 'contact-subject-error' : undefined"
        @blur="validateSubject"
        @change="subjectError = ''"
        required
      >
        <option disabled value="">Vælg emne</option>
        <option value="start">Jeg vil gerne starte til armbrydning</option>
        <option value="general">Jeg har et generelt spørgsmål</option>
        <option value="sponsor">Jeg er interesseret i at blive sponsor</option>
        <option value="other">Andet</option>
      </select>

      <p v-if="subjectError" id="contact-subject-error" class="form-field-error" role="alert">
        {{ subjectError }}
      </p>
    </fieldset>

    <!-- Besked -->
    <fieldset class="contact-form__field">
      <legend id="contact-message-label">Din besked</legend>

      <textarea
        id="contact-message"
        v-model="message"
        placeholder="Skriv din besked her..."
        aria-labelledby="contact-message-label"
        :aria-invalid="!!messageError"
        :aria-describedby="messageError ? 'contact-message-error' : undefined"
        @blur="validateMessage"
        @input="messageError = ''"
        rows="6"
        minlength="10"
        maxlength="2000"
        required
      ></textarea>

      <p v-if="messageError" id="contact-message-error" class="form-field-error" role="alert">
        {{ messageError }}
      </p>
    </fieldset>

    <!-- Send-knap -->
    <button type="submit" class="btn btn--primary" :disabled="isSending">
      {{ isSending ? 'Sender...' : 'Send besked' }}
    </button>

    <!-- Feedback efter indsendelse -->
    <p v-if="successMessage" class="form-message form-message--success" role="status">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" class="form-message form-message--error" role="alert">
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

  // Rød kant på ugyldige formularfelter
  input[aria-invalid='true'],
  select[aria-invalid='true'],
  textarea[aria-invalid='true'] {
    border-color: v.$color-red;
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
