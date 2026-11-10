<script setup>
import PageHero from '../components/PageHero.vue'
import ImageTextSection from '../components/ImageTextSection.vue'
import MembershipCard from '../components/MembershipCard.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import FaqAccordion from '../components/FaqAccordion.vue'

const clubAddress = 'Middelfartvej 114, 5200 Odense V'

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clubAddress)}`

const memberships = [
  {
    ageGroup: 'Licens',
    price: 200,
    paymentPeriod: 'Engangsbetaling',
    description: 'Obligatorisk for alle nye medlemmer. Gælder for altid.',
    variant: 'license',
  },
  {
    ageGroup: '10 - 17 år',
    price: 200,
    paymentPeriod: 'Pr. kvartal',
    description: 'Kontingent for medlemmer fra 10 til 18 år.',
  },
  {
    ageGroup: '18 - 24 år',
    price: 400,
    paymentPeriod: 'Pr. kvartal',
    description: 'Kontingent for medlemmer fra 18 til 24 år.',
  },
  {
    ageGroup: '25+ år',
    price: 600,
    paymentPeriod: 'Pr. kvartal',
    description: 'Kontingent for medlemmer på 25 år og derover.',
  },
]

const faqs = [
  {
    question: 'Skal jeg være stærk for at starte?',
    answer: [
      'Nej, slet ikke!',
      'Armbrydning handler om meget mere end styrke. Teknik og taktik spiller også en stor rolle, og det er noget, du lærer hen ad vejen.',
      'Du behøver altså hverken erfaring eller store overarme for at være med.',
    ],
  },
  {
    question: 'Kan jeg komme til træning uden at være medlem?',
    answer: [
      'Ja, selvfølgelig!',
      'Du er altid velkommen til at komme forbi til en prøvetræning og se, om armbrydning er noget for dig.',
      'Du behøver ikke tilmelde dig på forhånd, men du må meget gerne give os besked om, at du kommer. Så sørger vi for, at der står nogen klar til at tage imod dig.',
    ],
  },
  {
    question: 'Hvor og hvornår træner I?',
    answer: [
      'Vi træner hver tirsdag og torsdag fra kl. 18.30 til 20.00.',
      'Du finder os på Middelfartvej 114, 5200 Odense V, i Bolbro.',
    ],
  },
  {
    question: 'Kan jeg deltage i konkurrencer som nybegynder?',
    answer: [
      'Ja, selvfølgelig!',
      'Du behøver ikke være erfaren for at deltage i konkurrencer. Du skal blot have et medlemskab, licens og en trøje med klubbens logo.',
      'Er du i tvivl om, hvordan du kommer i gang, hjælper vi dig gerne med det praktiske.',
    ],
  },
]
</script>

<template>
  <main class="practical-info-page">
    <PageHero title="Praktiske oplysninger" scroll-target="training-info">
      <template #description>
        Her finder du alt det praktiske om træningstider, medlemskab og kontingent.
        <br />
      </template>
    </PageHero>

    <div id="training-info">
      <ImageTextSection
        image="/images/klubfront.webp"
        image-alt="En gruppe medlemmer, der træner armbrydning"
        image-format="landscape"
        image-right
        background-variant="secondary"
        button-text="Find vej til klubben"
        :button-href="mapsUrl"
        button-variant="secondary"
      >
        <template #heading> Her finder <span class="highlight">du os</span> </template>
        <p>
          Vi holder til i Bolbro i Odense V sammen med Phoenix judoklub.<br />Her mødes vi to gange
          om ugen for at dyrke armbrydning. Uanset om du er erfaren eller helt ny, er du altid
          velkommen til at kigge forbi!
        </p>
        <p>
          Vi træner hver <strong>tirsdag</strong> og <strong>torsdag</strong> fra
          <strong>kl. 18.30 til 20.00.</strong>
        </p>

        <h3>Adresse</h3>
        <p>
          Middelfartvej 114
          <br />
          5200 Odense V
        </p>
      </ImageTextSection>

      <ImageTextSection
        image="/images/4.webp"
        image-alt="Medlemmer af Armbrydning Odense"
        image-format="portrait"
        button-text="Bliv armbryder"
        button-to="/bliv-armbryder"
        button-variant="primary"
      >
        <template #heading>
          <span class="highlight">Medlem i klubben</span>
        </template>

        <p>
          Har du fået smag for armbrydning og lyst til at blive en del af fællesskabet? Så er det
          heldigvis nemt at blive medlem hos os!
        </p>

        <p>
          Du behøver ikke have erfaring eller bestemte forudsætninger for at være med. Hos os er der
          plads til både dig, der gerne vil dyrke armbrydning for hyggens skyld, og dig, der drømmer
          om at udvikle dig og deltage i konkurrencer.
        </p>

        <p>
          Christel hjælper dig med indmeldelsen og sørger for, at du får styr på alt det praktiske.
        </p>
      </ImageTextSection>

      <section id="kontingenter" class="membership-section section-bg--secondary">
        <ScrollReveal>
          <div class="membership-section__inner">
            <h2>Priser og <span class="highlight">kontingenter</span></h2>

            <p class="membership-section__intro">
              Alle nye medlemmer betaler en engangslicens på 200 kr. samt kontingent efter alder.
              <br />
              Henvend dig til Christel for yderligere information.
            </p>

            <div class="membership-section__grid">
              <MembershipCard
                v-for="membership in memberships"
                :key="membership.ageGroup"
                v-bind="membership"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section class="faq-section">
        <ScrollReveal>
          <div class="faq-section__inner">
            <h2>Ofte stillede <span class="highlight">spørgsmål</span></h2>

            <p class="faq-section__intro">
              Vi ved godt, at der kan dukke en masse spørgsmål op, når man overvejer at begynde på
              en ny sport. Derfor har vi samlet svarene på nogle af de spørgsmål, vi oftest møder.
            </p>

            <FaqAccordion :faqs="faqs" />
          </div>
        </ScrollReveal>
      </section>

      <section class="contact-cta section-bg--secondary">
        <ScrollReveal>
          <div class="contact-cta__inner">
            <h2>Fik du ikke <span class="highlight">svar på dit spørgsmål?</span></h2>

            <p>Bare rolig! Vi hjælper dig gerne.</p>

            <p>
              Hvis du stadig sidder med spørgsmål om medlemskab, træning eller noget helt tredje, så
              er du altid velkommen til at tage fat i os.
            </p>

            <p>Send os en besked, eller giv os et kald, så hjælper vi dig videre.</p>

            <RouterLink to="/kontakt" class="btn btn--secondary"> Kontakt os </RouterLink>
          </div>
        </ScrollReveal>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables' as v;

.membership-section {
  padding: 5rem 1.5rem;
  background-color: v.$bg-primary;
}

.membership-section__inner {
  max-width: 1200px;
  margin-inline: auto;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
  }
}

.membership-section__intro {
  max-width: 650px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.membership-section__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 360px;
  margin-inline: auto;
}

.faq-section {
  padding: 5rem 1.5rem;
  background-color: v.$bg-primary;
}

.faq-section__inner {
  max-width: 900px;
  margin-inline: auto;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
  }
}

.faq-section__intro {
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.contact-cta {
  padding: 4rem 1.5rem 6rem;
  background-color: v.$bg-primary;
  text-align: center;
}

.contact-cta__inner {
  max-width: 700px;
  margin-inline: auto;

  h2 {
    margin-bottom: 2rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .btn {
    margin-top: 1.5rem;
  }
}

// Tablet
@media (min-width: v.$breakpoint-tablet) {
  .membership-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 700px;
  }
}

// Desktop
@media (min-width: v.$breakpoint-desktop) {
  .membership-section__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-width: 1100px;
  }
}
</style>
