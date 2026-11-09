<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reference til elementet, som skal animeres
const revealRef = ref(null)

// Holder styr på, om elementet er synligt
const isVisible = ref(false)

let observer

onMounted(() => {
  // Hvis browseren ikke understøtter IntersectionObserver,
  // vises indholdet med det samme
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  // Holder øje med, hvornår elementet bliver synligt
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true

        // Stopper observeren efter første visning
        observer.disconnect()
      }
    },
    {
      threshold: 0.1,
    },
  )

  observer.observe(revealRef.value)
})

// Stopper observeren, når komponenten fjernes
onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="revealRef" class="scroll-reveal" :class="{ 'is-visible': isVisible }">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);

  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

// Respekter brugerens indstillinger for animationer
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
