<script setup>
import PageHero from '../components/PageHero.vue'
import ImageTextSection from '../components/ImageTextSection.vue'
</script>

<template>
  <main class="about-page">
    <PageHero
      title="Om klubben"
      description="Læs om vores historie, mød menneskene bag klubben og få et indblik i de værdier, der samler os. For hos os handler om udvikling, gode oplevelser og fællesskab."
    />

    <ImageTextSection
      title="Armbrydning for alle"
      image="/images/1.webp"
      image-alt="Medlemmer af Armbrydning Odense"
      image-right
      image-format="portrait"
      background-variant="secondary"
      button-text="Kontakt os"
      button-to="/kontakt"
      button-variant="secondary"
    >
      <template #heading> Armbrydning for <span class="highlight">alle</span> </template>

      <p>
        Hos Armbrydning Odense brænder vi for at dele vores interesse for sporten med så mange som
        muligt. <br />
        <br />Vi er en del af WAF (World Armwrestling Federation), og vi ønsker at gøre sporten mere
        tilgængelig for alle - uanset alder, køn, erfaring eller funktionsnedsættelser.
      </p>

      <h3>Sammen om sporten</h3>
      <p>
        Vi har allerede været ude og vise sporten frem til blandt andet Sportslørdag og SKØNFEST
        samt undervist skoleklasser.<br />
        Vi elsker at samarbejde med skoler, foreninger og organisationer for mennesker med
        funktionsnedsættelser, så endnu flere får mulighed for at opleve armbrydning. Uanset om det
        handler om at introducere unge til sporten eller skabe nye oplevelser gennem fælles
        aktiviteter, er vi altid åbne for nye idéer og samarbejder.
      </p>
      <h3>Har du en idé til et samarbejde?</h3>
      <p>Så vil vi gerne høre fra dig!</p>
    </ImageTextSection>
  </main>
</template>
