<script setup>
defineProps({
  ageGroup: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paymentPeriod: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'standard',
  },
})
</script>

<template>
  <article class="membership-card" :class="{ 'membership-card--license': variant === 'license' }">
    <h3>{{ ageGroup }}</h3>

    <p class="membership-card__price">{{ price }} kr.</p>

    <p class="membership-card__period">{{ paymentPeriod }}</p>

    <p class="membership-card__description">
      {{ description }}
    </p>
  </article>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

.membership-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
  padding: 1.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: v.$color-dark-gray;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    font-weight: v.$font-medium;
    color: v.$color-lime;
  }
}

.membership-card__price {
  font-size: 1.5rem;
  font-weight: v.$font-bold;
  color: v.$color-lime;
}

.membership-card__period {
  font-weight: v.$font-medium;
}

.membership-card__description {
  font-size: 0.875rem;
  line-height: 1.5;
}

.membership-card--license {
  background-color: #303d30;
  border-color: v.$color-lime;
}

@media (max-width: 799px) {
  .membership-card {
    padding: 1.25rem;
  }
}
</style>
