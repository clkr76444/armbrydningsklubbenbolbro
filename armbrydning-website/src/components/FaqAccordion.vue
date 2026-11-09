<script setup>
defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="faq-accordion">
    <details v-for="faq in faqs" :key="faq.question" class="faq-accordion__item">
      <summary>
        {{ faq.question }}
        <span class="faq-accordion__arrow" aria-hidden="true"></span>
      </summary>

      <div class="faq-accordion__answer">
        <p v-for="(paragraph, index) in faq.answer" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </details>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 670px;
  margin-inline: auto;
}

.faq-accordion__item {
  overflow: hidden;
  border-radius: 8px;
  background-color: v.$color-dark-gray;

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;
    background-color: v.$color-lime;
    color: v.$color-off-black;
    font-weight: v.$font-bold;
    text-transform: uppercase;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &:focus-visible {
      outline: 3px solid v.$color-off-white;
      outline-offset: -4px;
    }
  }
}

.faq-accordion__arrow {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-right: 2px solid v.$color-off-black;
  border-bottom: 2px solid v.$color-off-black;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.faq-accordion__item[open] .faq-accordion__arrow {
  transform: rotate(225deg);
}

.faq-accordion__answer {
  padding: 1.5rem;
  text-align: left;

  p {
    line-height: 1.6;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-accordion__arrow {
    transition: none;
  }
}
</style>
