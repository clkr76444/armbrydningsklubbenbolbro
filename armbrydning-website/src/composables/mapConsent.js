import { ref } from 'vue'

const STORAGE_KEY = 'google-maps-consent'

// Henter brugerens tidligere valg
function getSavedConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (saved?.version === 1 && ['accepted', 'rejected'].includes(saved.choice)) {
      return saved.choice
    }
  } catch {
    return null
  }

  return null
}

// Delt reaktiv state for samtykket
export const mapConsent = ref(getSavedConsent())

// Gemmer brugerens valg
export function setMapConsent(choice) {
  if (!['accepted', 'rejected'].includes(choice)) return

  mapConsent.value = choice

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        choice,
        date: new Date().toISOString(),
      }),
    )
  } catch {
    // Valget fungerer stadig, men gemmes ikke efter genindlæsning
  }
}

// Åbner samtykkeindstillingerne igen
export function resetMapConsent() {
  mapConsent.value = null

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Fortsæt uden lagring
  }
}
