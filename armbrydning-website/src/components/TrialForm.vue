<script setup>
import { ref } from 'vue'

const name = ref('')
const phone = ref('')
const wantsSmsConfirmation = ref(false)

const nameError = ref('')
const phoneError = ref('')

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
</script>

<template>
  <form class="trial-form" @submit.prevent>
    <!-- Navn -->
    <fieldset class="trial-form__field">
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
      <p v-if="nameError" class="trial-form__error" role="alert">
        {{ nameError }}
      </p>
    </fieldset>

    <!-- Telefonnummer -->
    <fieldset class="trial-form__field">
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
      <p v-if="phoneError" class="trial-form__error" role="alert">
        {{ phoneError }}
      </p>
    </fieldset>

    <!-- Vælg træningsdag -->
    <fieldset class="trial-form__field">
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
    <button type="submit" class="btn btn--primary" disabled>Send tilmelding</button>
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

// FORMULARFELTER
.trial-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  margin: 0;
  padding: 0.5rem 1rem 1rem;
  border: 1px solid transparent;
  border-radius: 8px;

  &:focus-within {
    border-color: v.$color-lime;
  }

  legend {
    margin-bottom: 0.5rem;
    color: v.$color-lime;
    font-weight: v.$font-medium;
  }

  input,
  select {
    width: 100%;
    min-width: 0;
    padding: 0.75rem 1rem;
    background-color: v.$color-off-white;
    color: v.$color-off-black;
    border: 1px solid v.$color-off-black;
    border-radius: 8px;
    font: inherit;

    &:focus-visible {
      outline: 2px solid v.$color-lime;
      outline-offset: 2px;
    }
  }

  select {
    appearance: none; //fjerner standard dropdown-pil

    // Egen dropdown-pil
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%231B1E1D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3E%3C/svg%3E");

    background-repeat: no-repeat;
    background-size: 18px;
    background-position: right 1rem center;

    padding-right: 3rem;
    cursor: pointer;
  }
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

// FEJLTEKSTER IFBM. VALIDERING AF NAVN OG TELEFONNUMMER
.trial-form__error {
  margin: 0;
  color: v.$color-red;
  font-size: 0.875rem;
  text-align: left;
}

.trial-form__field input[aria-invalid='true'] {
  border-color: v.$color-red;
}

@media (min-width: v.$breakpoint-tablet) {
  .trial-form > button {
    width: auto;
  }
}
</style>
