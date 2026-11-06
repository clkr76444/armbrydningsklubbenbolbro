<script setup>
import PageHero from '../components/PageHero.vue'
import ImageTextSection from '../components/ImageTextSection.vue'
</script>

<template>
  <main class="about-page">
    <PageHero
      title="Om klubben"
      description="Læs om vores historie, mød menneskene bag klubben og få et indblik i de værdier, der samler os. For hos os handler om udvikling, gode oplevelser og fællesskab."
      scroll-target="about-intro"
    />

    <ImageTextSection
      id="about-intro"
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

    <ImageTextSection
      title="Klubbens værdier"
      image="/images/2.webp"
      image-alt="Armbrydere under træning"
      image-format="portrait"
    >
      <template #heading> Klubbens <span class="highlight">værdier</span> </template>
      <p>
        Hos Armbrydning Odense tager vi sporten seriøst, men der skal også være plads til at have
        det sjovt. Vi tror på, at vi bliver bedre, når vi udfordrer hinanden, lærer sammen og har et
        godt fællesskab.
      </p>

      <p></p>
      <h3>Fællesskab</h3>
      <p>
        Hos os handler det om mere end armbrydning. Vi hjælper hinanden, deler gode oplevelser og
        sørger for, at nye føler sig velkomne. Der er plads til både seriøs træning og gode grin.
      </p>
      <h3>Udvikling</h3>
      <p>
        Ingen er eksperter fra starten. Vi deler vores erfaringer, lærer nye teknikker og hjælper
        hinanden med at blive bedre. Uanset dit niveau er der altid plads til at udvikle sig.
      </p>
      <p></p>
      <h3>Respekt</h3>
      <p>
        Konkurrencen kan være intens, men respekten kommer altid først. Vi møder hinanden i
        øjenhøjde og giver plads til forskellige mennesker, niveauer og ambitioner.
      </p>
    </ImageTextSection>
  </main>
</template>
