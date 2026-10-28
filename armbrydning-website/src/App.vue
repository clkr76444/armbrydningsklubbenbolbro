<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <SiteHeader />
  <RouterView />
  <SiteFooter />
</template>
