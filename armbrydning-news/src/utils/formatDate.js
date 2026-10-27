// Omdanner dato fra YYYY-MM-DD til DD/MM-YYYY
// export betyder at funktionen er tilgængelig for andre JavaScript-filer.

// opretter en funktion til at formatere datoer fra YYYY-MM-DD til DD/MM-YYYY
export function formatDate(date) {
  // Tjekker om input er en gyldig streng, ellers returneres "Dato ukendt"
  if (typeof date !== "string" || !date.trim()) {
    return "Dato ukendt";
  }
  // const year, month, day gemmer de tre dele af datoen i hver sin variabel
  // const year, month, day gemmer de tre dele af datoen i hver sin variabel
  const [year, month, day] = date.split("-"); // datoen opdeles ved hjælp af bindestregerne.
  // returnerer datoen i dden ønskede rækkefølge.
  return `${day}/${month}-${year}`;
}
