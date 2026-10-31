// ref gør variabler reaktive, så Vue kan spore ændringer og opdatere UI'en automatisk
import { ref } from 'vue'

// Gemmer nøgle af samtykket som opbevarer brugerens samtykke i localStorage, som er lokal lagring i browseren
const STORAGE_KEY = 'google-maps-consent'

// Henter brugerens tidligere valg
function getSavedConsent() {
  try {
    // (localStorage.GetItem(STORAGE_KEY) - vi leder efter det gemte samtykke fra localStorage
    // JSON.parse = Omdanner det gemte JSON-objekt til et JavaScript-objekt
    // Hvis der ikke er noget gemt samtykke, vil saved være null
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))

    // Vi kigger efter to betingelser: version skal være 1, og choice skal være enten 'accepted' eller 'rejected'
    // Vi gemmer kun samtykket, hvis det er gyldigt (version 1 og choice er 'accepted' eller 'rejected')
    // .? = Optional chaining, tjekker om saved eksisterer før vi tilgår version og choice
    if (saved?.version === 1 && ['accepted', 'rejected'].includes(saved.choice)) {
      return saved.choice
    }
    // Hvis samtykket ikke er gyldigt, returnerer vi null
  } catch {
    return null
  }

  // Hvis der opstår en fejl under hentning af samtykket, fanges det af catch-blokken og vi returnerer null
  return null
}

// Delt reaktiv state for samtykket
export const mapConsent = ref(getSavedConsent())

// Gemmer brugerens valg
// Hvis ikke valget er 'accepted' eller 'rejected', ignoreres det via. early return
export function setMapConsent(choice) {
  if (!['accepted', 'rejected'].includes(choice)) return

  // Vi gemmer kun samtykket, hvis det er gyldigt (accepted eller rejected)
  mapConsent.value = choice

  // Prøv at gemme samtykket i localStorage som JSON-objekt.
  // json objektet indeholder version, choice og dato for samtykket
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

// Nulstiller brugerens samtykke - sletter det fra både reaktiv state og localStorage
export function resetMapConsent() {
  mapConsent.value = null

  // Slet samtykket fra localStorage, hvis det findes
  try {
    localStorage.removeItem(STORAGE_KEY)
    // Hvis sletningen fejler, fanges det af catch-blokken, og vi logger fejlen i konsollen. Vi har allerede nulstillet den reaktive state, så UI'et er opdateret korrekt.
  } catch (error) {
    console.error('Kunne ikke slette samtykke:', error)
  }
}
