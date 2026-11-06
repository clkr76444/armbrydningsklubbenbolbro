<script setup>
defineProps({
  target: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a :href="`#${target}`" class="scroll-indicator" aria-label="Scroll til næste sektion">
    <span class="scroll-indicator__text"> Scroll ned </span>

    <svg class="scroll-indicator__arrow" viewBox="0 0 100 124" fill="none" aria-hidden="true">
      <path d="M10 10 L50 50 L90 10" />
      <path d="M10 43 L50 83 L90 43" />
      <path d="M10 76 L50 116 L90 76" />
    </svg>
  </a>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.scroll-indicator {
  position: absolute;
  bottom: var(
    --scroll-indicator-bottom,
    1.5rem
  ); // Vi gør det muligt at ændre indikatorens placering fra dens parent-komponent
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  color: v.$color-off-white;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid v.$color-lime;
    outline-offset: 6px;
  }
}

.scroll-indicator__text {
  font-family: v.$font-body;
  font-size: 0.75rem;
  font-weight: v.$font-extralight;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.scroll-indicator__arrow {
  width: 4rem;
  height: auto;
  stroke: v.$color-lime;
  stroke-width: 9;
  stroke-linejoin: miter;
  stroke-linecap: square;

  animation: scroll-bounce 2s ease-in-out infinite;

  // Gør de nederste pile mere transparente
  path:nth-child(2) {
    opacity: 0.6;
  }

  path:nth-child(3) {
    opacity: 0.3;
  }
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-indicator__arrow {
    animation: none;
  }
}
</style>
