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

    <ImageTextSection
      title="Klubbens historie"
      image="/images/4.webp"
      image-alt="Medlemmer fra Armbrydning Odense"
      image-right
      image-format="landscape"
    >
      <template #heading> Klubbens <span class="highlight">historie</span> </template>

      <p>Det hele startede med en lidt skør idé på Fyns MC Festival for mange år siden.</p>
      <p>
        Her blev der afholdt et amatørmesterskab i armbrydning, og det viste sig hurtigt, at vi var
        flere, der syntes, sporten var ret sjov!
      </p>
      <p>
        Idéen om at starte en klub begyndte at vokse, men dengang var der ikke rigtig nogen
        muligheder for at gå til armbrydning i Odense.
      </p>
      <p><strong>Derfor besluttede vi os for at gøre noget ved det.</strong></p>
      <p>
        I 2022 fik vi lov til at låne lokaler hos judoklubben Kodokan, og i vinteren 2022/23 kom
        klubben for alvor i gang. Siden har vi været vidt omkring med armbrydningen - fra
        Sportslørdag og SKØNFEST til DM-ugen og undervisning af skoleklasser. I dag holder vi til
        sammen med Phoenix Judo i hjertet af Bolbro, hvor vi arbejder på at gøre sporten tilgængelig
        for endnu flere.
      </p>
    </ImageTextSection>

    <ImageTextSection
      title="Lyst til at være med?"
      image="/images/3.webp"
      image-alt="To personer, der træner armbrydning"
      image-format="portrait"
      background-variant="secondary"
      button-text="Fortæl os at du kommer"
      button-to="/bliv-armbryder"
      button-variant="primary"
    >
      <template #heading> Lyst til at <span class="highlight">være med?</span> </template>

      <h3>Kom forbi til en træning og se, om armbrydning er noget for dig!</h3>
      <p>
        Du behøver hverken erfaring eller store overarme for at starte.<br />
        Vi hjælper dig med at lære sporten at kende, viser dig de grundlæggende teknikker og giver
        dig mulighed for at udvikle dig i dit eget tempo.
      </p>
      <p>
        Hos os er der plads til både dig, der bare er nysgerrig og gerne vil prøve noget nyt, og
        dig, der har ambitioner om at blive bedre og måske deltage i konkurrencer.
      </p>
      <p><strong>Vil du gerne have, at vi ved, du kommer?</strong></p>
      <p>Så kan du give os besked på forhånd, så vi står klar til at tage imod dig.</p>
    </ImageTextSection>
  </main>
</template>
