<script setup>
import { ref } from 'vue'

const menuDialog = ref(null)

// Åbner mobilmenuen
function openMenu() {
  menuDialog.value?.showModal()
}

// Lukker mobilmenuen
function closeMenu() {
  menuDialog.value?.close()
}
</script>

<template>
  <header class="site-header">
    <!-- Logoet leder til forsiden -->
    <RouterLink to="/" class="site-logo"> Armbrydning Odense </RouterLink>

    <!-- Desktop-navigation -->
    <nav class="desktop-nav" aria-label="Hovednavigation">
      <RouterLink to="/om-klubben">Om klubben</RouterLink>
      <RouterLink to="/kontakt">Kontakt</RouterLink>
      <RouterLink to="/nyheder">Nyheder</RouterLink>
      <RouterLink to="/praktisk-info">Praktiske oplysninger</RouterLink>
      <RouterLink to="/bliv-armbryder" class="nav-cta"> Bliv armbryder </RouterLink>
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
      ☰
    </button>
  </header>

  <!-- Mobilmenu med backdrop -->
  <dialog id="mobile-menu" ref="menuDialog" class="mobile-menu">
    <button type="button" class="menu-close" aria-label="Luk menu" @click="closeMenu">×</button>

    <nav class="mobile-nav" aria-label="Mobilnavigation">
      <RouterLink to="/om-klubben" @click="closeMenu"> Om klubben </RouterLink>
      <RouterLink to="/kontakt" @click="closeMenu"> Kontakt </RouterLink>
      <RouterLink to="/nyheder" @click="closeMenu"> Nyheder </RouterLink>
      <RouterLink to="/praktisk-info" @click="closeMenu"> Praktiske oplysninger </RouterLink>
      <RouterLink to="/bliv-armbryder" class="nav-cta" @click="closeMenu">
        Bliv armbryder
      </RouterLink>
    </nav>
  </dialog>
</template>
