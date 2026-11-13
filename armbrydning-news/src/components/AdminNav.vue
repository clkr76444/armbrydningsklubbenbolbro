<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import logo from "../assets/images/logo.svg";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../firebase";

const menuDialog = ref(null);

// Åbner mobilmenuen
function openMenu() {
  menuDialog.value?.showModal();
}

// Lukker mobilmenuen
function closeMenu() {
  menuDialog.value?.close();
}

// hvis target ikke er det samme som dialogens value, stop funktionen og log klikket
function closeOnBackdrop(event) {
  if (event.target !== menuDialog.value) return;

  // .getBoundingClientRect() bruges til at undersøge dialogens position og størrelse
  // vi gemmer variablen lokalt fordi vi kun skal bruge den i denne funktion, f.eks. hvis brugeren ændrer skærmstørrelse
  const rect = menuDialog.value.getBoundingClientRect();

  // tjekker om klikket skete udenfor dialogen, clientX og clientY er brugerens klikposition på HTML'en
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) closeMenu();
}

// Luk mobilmenuen hvis skærmen bliver bredere end 1280px
function handleResize() {
  if (window.innerWidth >= 1280) {
    closeMenu();
  }
}

// når komponenten mountes, tilføj event listener til browserens resize-event
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

// fjern event listener når komponenten unmountes
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Router til navigation efter logout
const router = useRouter();

async function logOut() {
  try {
    await signOut(auth);
    closeMenu();
    await router.push("/login");
  } catch (error) {
    console.error("Kunne ikke logge ud:", error);
  }
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <!-- Logoet leder til forsiden -->
      <RouterLink to="/" class="site-logo">
        <img :src="logo" alt="Armbrydning Odense logo" />
      </RouterLink>

      <!-- Desktop-navigation til administrationen -->
      <nav class="desktop-nav" aria-label="Administrationsnavigation">
        <RouterLink to="/">Nyheder</RouterLink>
        <RouterLink to="/opret">Opret nyhed</RouterLink>
        <RouterLink to="/henvendelser">Kontaktbeskeder</RouterLink>
        <RouterLink to="/tilmeldinger"> Prøvetræningstilmeldinger </RouterLink>
        <button type="button" class="logout-button" @click="logOut">
          Log ud
        </button>
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
  <dialog
    id="mobile-menu"
    ref="menuDialog"
    class="mobile-menu"
    @click="closeOnBackdrop"
  >
    <button
      type="button"
      class="menu-close"
      aria-label="Luk menu"
      @click="closeMenu"
    >
      ×
    </button>

    <!-- Mobilnavigation til administrationen -->
    <nav class="mobile-nav" aria-label="Administrationsnavigation">
      <RouterLink to="/" @click="closeMenu"> Nyheder </RouterLink>

      <RouterLink to="/opret" @click="closeMenu"> Opret nyhed </RouterLink>

      <RouterLink to="/henvendelser" @click="closeMenu">
        Kontaktbeskeder
      </RouterLink>

      <RouterLink to="/tilmeldinger" @click="closeMenu">
        Prøvetræningstilmeldinger
      </RouterLink>

      <button type="button" class="logout-button" @click="logOut">
        Log ud
      </button>
    </nav>
  </dialog>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as v;

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
  padding-inline: var(--container-padding, 1.5rem);
}

.site-logo {
  display: inline-block;

  img {
    display: block;
    width: 60px;
    height: auto;
  }
}

// DESKTOP-NAVIGATION - SKJULT PÅ MOBIL
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
    font-family: v.$font-body;
    font-size: 0.875rem;
    font-weight: v.$font-regular;
    text-transform: uppercase;
    letter-spacing: 0.08em;
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

// MOBILMENU
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

  // Start lukket og placeret uden for skærmen
  opacity: 0;
  transform: translateX(100%);

  // Sikrer animation ved åbning og lukning
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;
}

// MOBILMENU - ÅBEN
.mobile-menu[open] {
  opacity: 1;
  transform: translateX(0);
}

// Startposition for åbningsanimationen
@starting-style {
  .mobile-menu[open] {
    opacity: 0;
    transform: translateX(100%);
  }
}

// MØRK BAGGRUND BAG MOBILMENUEN
.mobile-menu::backdrop {
  background-color: rgba(v.$color-off-black, 0.85);
  animation: backdrop-fade-in 0.3s ease-out;
}

// LUKKEKNAP
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

// MOBILNAVIGATION
.mobile-nav {
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    min-height: 64px;
    padding: 0.75rem 0;
    color: v.$color-off-white;
    font-size: 1.35rem;
    font-weight: v.$font-light;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid rgba(v.$color-off-white, 0.15);

    &:hover,
    &.router-link-active {
      color: v.$color-lime;
    }
  }

  .logout-button {
    width: 100%;
    min-height: 52px;
    margin-top: 1.5rem;
    font-size: 1.35rem;
    font-weight: v.$font-light;
  }
}

// LOG UD-KNAP - GÆLDER MOBIL OG DESKTOP
.logout-button {
  padding: 0.75rem 1rem;
  background-color: v.$color-red;
  border: 2px solid v.$color-red;
  border-radius: 0.25rem;
  color: v.$color-off-white;
  font: inherit;
  text-transform: uppercase;
  letter-spacing: inherit;
  cursor: pointer;
  font-weight: v.$font-regular;

  &:hover {
    background-color: transparent;
    color: v.$color-red;
  }

  &:focus-visible {
    outline: 2px solid v.$color-red;
    outline-offset: 4px;
  }
}

// ANIMATION AF BAGGRUNDEN
@keyframes backdrop-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

// TILGÆNGELIGHED - REDUCERET BEVÆGELSE
@media (prefers-reduced-motion: reduce) {
  .mobile-menu,
  .mobile-menu::backdrop {
    animation: none;
    transition: none;
  }

  .desktop-nav a::after {
    transition: none;
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
    font-weight: v.$font-extralight;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    a {
      position: relative;
      padding: 0.5rem 0;
      color: v.$color-off-white;
      text-decoration: none;
      white-space: nowrap;

      // Limegrøn streg under aktivt link og ved hover
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: v.$color-lime;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }

      &:hover::after,
      &:focus-visible::after,
      &.router-link-active::after {
        transform: scaleX(1);
      }

      &:hover,
      &.router-link-active {
        color: v.$color-lime;
      }
    }
  }
}
</style>
