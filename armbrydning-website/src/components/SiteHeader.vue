<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/images/logo.svg'

const menuDialog = ref(null)

// Åbner mobilmenuen
function openMenu() {
  menuDialog.value?.showModal()
}

// Lukker mobilmenuen
function closeMenu() {
  menuDialog.value?.close()
}

// hvis target ikke er det samme som dialogens value, stop funktionen og log klikket
function closeOnBackdrop(event) {
  if (event.target !== menuDialog.value) return

  // .getBoundingClientRect() bruges til at undersøge dialogens position og størrelse
  // vi gemmer variablen lokalt fordi vi kun skal bruge den i denne funktion, f.eks. hvis brugeren ændrer skærmstørrelse
  const rect = menuDialog.value.getBoundingClientRect()

  // tjekker om klikket skete udenfor dialogen, clientX og clientY er brugerens klikposition på HTML'en
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom

  if (clickedOutside) closeMenu()
}

// Luk mobilmenuen hvis skærmen bliver bredere end 1280px
function handleResize() {
  if (window.innerWidth >= 1280) {
    closeMenu()
  }
}

// når komponenten mountes, tilføj event listener til browserens resize-event
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// fjern event listener når komponenten unmountes
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <!-- Logoet leder til forsiden -->
      <RouterLink to="/" class="site-logo">
        <img :src="logo" alt="Armbrydning Odense logo" />
      </RouterLink>

      <!-- Desktop-navigation -->
      <nav class="desktop-nav" aria-label="Hovednavigation">
        <RouterLink to="/om-klubben">Om klubben</RouterLink>
        <RouterLink to="/kontakt">Kontakt</RouterLink>
        <RouterLink to="/nyheder">Nyheder</RouterLink>
        <RouterLink to="/praktisk-info">Praktiske oplysninger</RouterLink>
        <RouterLink to="/bliv-armbryder" class="btn btn--primary"> Bliv armbryder </RouterLink>
      </nav>

      <!-- Burgermenu til mobil og tablet -->
      <button
        type="button"
        class="menu-toggle"
        aria-label="Åbn menu"
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        @click="openMenu"
      >
        <span class="menu-toggle__label">Menu</span>
        <span class="menu-toggle__icon" aria-hidden="true">
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </header>

  <!-- Mobilmenu med backdrop, lavet som dialog for at kunne bruge presets af browserens dialog-element -->
  <dialog id="mobile-menu" ref="menuDialog" class="mobile-menu" @click="closeOnBackdrop">
    <button type="button" class="menu-close" aria-label="Luk menu" @click="closeMenu">×</button>

    <nav class="mobile-nav" aria-label="Mobilnavigation">
      <RouterLink to="/om-klubben" @click="closeMenu"> Om klubben </RouterLink>
      <RouterLink to="/kontakt" @click="closeMenu"> Kontakt </RouterLink>
      <RouterLink to="/nyheder" @click="closeMenu"> Nyheder </RouterLink>
      <RouterLink to="/praktisk-info" @click="closeMenu"> Praktiske oplysninger </RouterLink>
      <RouterLink to="/bliv-armbryder" class="btn btn--primary" @click="closeMenu">
        Bliv armbryder
      </RouterLink>
    </nav>
  </dialog>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// HEADER - MOBILE FIRST
.site-header {
  background-color: v.$color-off-black;
}

.site-header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding: 1rem 1.5rem;
  padding-inline: var(--container-padding);
}

.site-logo {
  display: inline-block;

  img {
    display: block;
    width: 60px;
    height: auto;
  }
}

// DESKTOP-NAVIGATION ER SKJULT PÅ MOBIL
.desktop-nav {
  display: none;
}

// BURGERKNAP
.menu-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  padding: 0.5rem;

  background: transparent;
  border: none;
  color: v.$color-off-white;
  cursor: pointer;

  &__label {
    font-size: 0.875rem;
    font-weight: v.$font-regular;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-family: v.$font-body;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 6px;

    span {
      display: block;
      height: 2px;
      background-color: v.$color-off-white;
      transition: width 0.25s ease;
    }

    span:first-child {
      width: 24px;
    }

    span:last-child {
      width: 16px;
    }
  }

  &:hover &__icon span:last-child {
    width: 24px;
  }

  &:hover,
  &:active {
    color: v.$color-lime;

    .menu-toggle__icon span {
      background-color: v.$color-lime;
    }
  }

  &:focus-visible {
    outline: 2px solid v.$color-lime;
    outline-offset: 4px;
  }
}

// MOBILMENU - default/lukket tilstand
.mobile-menu {
  position: fixed;
  inset: 0 0 0 auto;
  margin: 0;
  width: min(420px, 92vw);
  height: 100dvh;
  max-height: 100dvh;
  padding: 5.5rem 2rem 2rem;

  background-color: v.$color-off-black;
  color: v.$color-off-white;
  border: none;
  box-shadow: -16px 0 48px rgba(0, 0, 0, 0.3);
  overflow-y: auto;

  //Animation af mobilmenuen ved åbning, vi starter med at skjule den og flytte den ud af skærmen
  opacity: 0;
  transform: translateX(100%);
  // display og overlay transitions bruges til at sikre korrekt animation af dialogen
  // allow-discrete bruges til at holde dialogen synlig under mens animationen afspilles.
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;
}

// MENUENS ÅBNE TILSTAND
.mobile-menu[open] {
  opacity: 1;
  transform: translateX(0);
}

// STARTPOSITION VED ÅBNING: når dialogen vises, skal menuen starte skjult og flyttet ud af skærmen
// Bruges fordi dialog-elementet er skjult som default, og vi ønsker at animere det fra en startposition udenfor skærmen og ind i visningen, når funktionen åbner menuen.
@starting-style {
  .mobile-menu[open] {
    opacity: 0;
    transform: translateX(100%);
  }
}

// MØRK BACKDROP
.mobile-menu::backdrop {
  background-color: rgba(v.$color-off-black, 0.85);
  animation: backdrop-fade-in 0.3s ease-out;
}

// LUKKEKNAP I MOBILMENUEN
.menu-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;

  background: transparent;
  border: none;
  color: v.$color-off-white;
  font-size: 2rem;
  cursor: pointer;

  &:hover,
  &:active {
    color: v.$color-lime;
  }

  &:focus-visible {
    outline: 2px solid v.$color-lime;
    outline-offset: 4px;
  }
}

// LINKS I MOBILMENUEN
.mobile-nav {
  display: flex;
  flex-direction: column;

  a:not(.btn) {
    display: flex;
    align-items: center;
    min-height: 64px;
    padding: 0.75rem 0;
    color: v.$color-off-white;
    font-size: 1.35rem;
    font-weight: v.$font-medium;
    text-decoration: none;
    border-bottom: 1px solid rgba(v.$color-off-white, 0.15);

    &:hover {
      color: v.$color-lime;
    }
  }

  // Kun placering af CTA i mobilmenuen
  .btn {
    width: 100%;
    min-height: 52px;
    margin-top: 2.5rem;
  }
}

// ANIMATIONER
@keyframes menu-slide-in {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes backdrop-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

// RESPEKTERER BRUGERE MED REDUCERET BEVÆGELSE
@media (prefers-reduced-motion: reduce) {
  .mobile-menu,
  .mobile-menu::backdrop {
    animation: none; // keyframes fjernes for brugere med reduceret bevægelse
    transition: none; // Fjern bløde overgange for brugere med reduceret bevægelse
  }
}

// DESKTOP - FRA 1280PX
@media (min-width: v.$breakpoint-desktop) {
  .menu-toggle {
    display: none;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    a:not(.btn) {
      color: v.$color-off-white;
      text-decoration: none;
      white-space: nowrap;

      &:hover {
        color: v.$color-lime;
      }
    }
  }
}
</style>
