<template>
  <main class="not-found-page">
    <!-- Navigation tilbage til nyhedsoversigten -->
    <nav class="breadcrumb-nav" aria-label="Brødkrummesti">
      <ol class="breadcrumbs">
        <li>
          <RouterLink to="/">Oversigt over nyheder</RouterLink>
        </li>
        <li aria-current="page">Siden findes ikke</li>
      </ol>
    </nav>

    <h1>404</h1>
    <h2>Siden blev ikke fundet</h2>

    <p>Siden findes ikke eller er blevet slettet.</p>

    <RouterLink to="/" class="btn-primary"> Tilbage til forsiden </RouterLink>
  </main>
</template>
