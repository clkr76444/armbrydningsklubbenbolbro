<script setup>
import { ref, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SiteFooter from "./components/SiteFooter.vue";
import AdminNav from "./components/AdminNav.vue";
import { ADMIN_UID } from "./config/constants";

const isAdmin = ref(false);

const unsubscribe = onAuthStateChanged(auth, (user) => {
  isAdmin.value = user?.uid === ADMIN_UID;
});

onUnmounted(unsubscribe);
</script>

<template>
  <AdminNav v-if="isAdmin" />
  <RouterView />
  <SiteFooter />
</template>
