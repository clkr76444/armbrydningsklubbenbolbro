<script setup>
import { ref } from 'vue'
import { ref as dbRef, push, set, serverTimestamp } from 'firebase/database'
import { database } from '../firebase'

const name = ref('')
const phone = ref('')
const wantsSmsConfirmation = ref(false)

const nameError = ref('')
const phoneError = ref('')

// Status på indsendelsen
const isSending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Validerer navnet
function validateName() {
  const trimmedName = name.value.trim()

  nameError.value = trimmedName.length >= 2 ? '' : 'Indtast et navn på mindst 2 tegn.'
}

// Validerer telefonnummeret
function validatePhone() {
  // Fjerner mellemrum, bindestreger og parenteser
  const cleanedPhone = phone.value.replace(/[\s()-]/g, '')

  // Tillader valgfrit + og 8-15 cifre
  const isValid = /^\+?\d{8,15}$/.test(cleanedPhone)

  phoneError.value = isValid ? '' : 'Indtast et gyldigt telefonnummer.'
}

// Træningsdato for prøvetræning valgt af brugeren
const trainingDate = ref('')

// Finder de næste fire træningsdage (tirsdag og torsdag)
const trainingDates = []
const today = new Date()

// Start med at finde dagen efter i dag, og fortsæt indtil vi har de næste fire træningsdage (tirsdag og torsdag)
for (let i = 1; trainingDates.length < 4; i++) {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)

  // Tjek om datoen er en tirsdag (2) eller torsdag (4)
  if (date.getDay() === 2 || date.getDay() === 4) {
    const value = [
      date.getFullYear(), // hent nuværende år
      String(date.getMonth() + 1).padStart(2, '0'), //sikre at måneden altid har to cifre
      String(date.getDate()).padStart(2, '0'), // sikre at dagen altid har to cifre
    ].join('-') //tilføj - mellem år, måned og dag

    // value skal bruges til firebase, label er den læsevenlige dato
    //når javascript finder en tirsdag eller en torsdag kører denne kode
    // Den pusher datoen til vores array med træningsdage
    trainingDates.push({
      value,
      label: date.toLocaleDateString('da-DK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    })
  }
}

async function sendSignup() {
  // Forhindre dobbeltindsendelse
  if (isSending.value) return

  //Valider inputfelterne
  validateName()
  validatePhone()

  if (nameError.value || phoneError.value || !trainingDate.value) return

  const lastSent = Number(localStorage.getItem('trialLastSent') || 0)

  if (Date.now() - lastSent < 15 * 60 * 1000) {
    successMessage.value = ''
    errorMessage.value = 'Vent 15 minutter, før du tilmelder dig igen.'
    return
  }

  isSending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    //Finder placeringen i Firebase
    const signupsRef = dbRef(database, 'trialSignups')
    const newSignupRef = push(signupsRef)

    // Oplysningerne vi vil gemme i firebase
    const newSignup = {
      name: name.value.trim(),
      phone: phone.value.replace(/[\s()-]/g, ''),
      trainingDate: trainingDate.value,
      wantsSmsConfirmation: wantsSmsConfirmation.value,
      createdAt: serverTimestamp(),
    }

    // Gemmer tilmeldingen i Firebase
    await set(newSignupRef, newSignup)
    localStorage.setItem('trialLastSent', String(Date.now()))

    successMessage.value = 'Tilmeldingen er sendt!'

    // Nulstil formularfelterne
    name.value = ''
    phone.value = ''
    trainingDate.value = ''
    wantsSmsConfirmation.value = false
  } catch (error) {
    console.error('Fejl ved tilmelding:', error)
    errorMessage.value = 'Tilmeldingen kunne ikke sendes. Prøv igen.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <form class="trial-form" @submit.prevent="sendSignup">
    <!-- Navn -->
    <fieldset class="form-field">
      <legend id="trial-name-label">Dit navn</legend>

      <input
        id="trial-name"
        v-model="name"
        type="text"
        autocomplete="name"
        placeholder="Indtast dit navn"
        aria-labelledby="trial-name-label"
        maxlength="100"
        @blur="validateName"
        @input="nameError = ''"
        :aria-invalid="!!nameError"
        required
      />
      <p v-if="nameError" class="form-field-error" role="alert">
        {{ nameError }}
      </p>
    </fieldset>

    <!-- Telefonnummer -->
    <fieldset class="form-field">
      <legend id="trial-phone-label">Telefonnummer</legend>

      <input
        id="trial-phone"
        v-model="phone"
        type="tel"
        autocomplete="tel"
        placeholder="Indtast dit telefonnummer"
        aria-labelledby="trial-phone-label"
        maxlength="20"
        @blur="validatePhone"
        @input="phoneError = ''"
        :aria-invalid="!!phoneError"
        required
      />
      <p v-if="phoneError" class="form-field-error" role="alert">
        {{ phoneError }}
      </p>
    </fieldset>

    <!-- Vælg træningsdag -->
    <fieldset class="form-field">
      <legend id="trial-date-label">Hvornår kommer du?</legend>

      <select id="trial-date" v-model="trainingDate" aria-labelledby="trial-date-label" required>
        <option disabled value="">Vælg en træningsdag</option>

        <option v-for="date in trainingDates" :key="date.value" :value="date.value">
          {{ date.label }} - kl. 18.30
        </option>
      </select>
    </fieldset>

    <!-- Valgfri SMS-bekræftelse -->
    <label class="trial-form__checkbox">
      <input v-model="wantsSmsConfirmation" type="checkbox" />
      <span> Jeg vil gerne modtage en bekræftelse på SMS </span>
    </label>

    <!-- Aktiveres når sikker indsendelse er implementeret -->
    <button type="submit" class="btn btn--primary" :disabled="isSending">
      {{ isSending ? 'Sender...' : 'Send tilmelding' }}
    </button>

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

// PRØVETRÆNINGSFORMULAR - MOBILE FIRST
.trial-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin-inline: auto;
}

// SMS-BEKRÆFTELSE
.trial-form__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-inline: 1rem;
  cursor: pointer;
  line-height: 1.5;

  input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin: 0.125rem 0 0;
    accent-color: v.$color-lime;
  }
}

// SEND-KNAP
.trial-form > button {
  width: calc(100% - 2rem);
  align-self: center;
}

@media (min-width: v.$breakpoint-tablet) {
  .trial-form > button {
    width: auto;
  }
}
</style>
