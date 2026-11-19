<template>
  <main class="not-found-page">
    <h1>404</h1>
    <h2>Siden blev ikke fundet</h2>

    <p>Siden findes ikke eller er blevet slettet.</p>

    <RouterLink to="/" class="btn btn--primary"> Tilbage til forsiden </RouterLink>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// 404-SIDE
.not-found-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 4rem;
  text-align: center;

  h1 {
    color: v.$color-lime;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 1.2rem;
    letter-spacing: 0.05em;
  }

  p {
    margin-bottom: 2rem;
  }

  .btn--primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  // TABLET OG DESKTOP
  @media (min-width: v.$breakpoint-tablet) {
    padding: 5rem 2rem;
  }
}
</style>
