<script setup>
import { ref } from 'vue'
import ImageTextSection from '../components/ImageTextSection.vue'
import PageHero from '../components/PageHero.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import TrialForm from '../components/TrialForm.vue'

const clubAddress = 'Middelfartvej 114, 5200 Odense V'

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clubAddress)}`

const testimonials = [
  {
    name: 'Silas',
    age: 16,
    quote:
      'Inden jeg startede, var jeg bange for at skade min arm. Men jeg blev taget godt imod, og folk var meget imødekommende. Alle snakker med alle, og fællesskabet betyder meget for mig. Det er sjovt at træne, og man får hjælp af gode trænere.',
    image: 'images/portrait1.webp',
  },
  {
    name: 'Darya',
    age: 22,
    quote:
      'Jeg begyndte egentlig, fordi jeg gerne ville vinde over min kæreste og vise, at jeg også er stærk! Men allerede til min første træning fik jeg en masse gode tips og tricks af Thomas. Det var sjovt, og jeg var overrasket over, hvor stærk jeg var.',
    image: 'images/portraitDarya.webp',
  },
  {
    name: 'Drake',
    age: 18,
    quote:
      'Jeg fik virkelig mange brugbare informationer og teknikker fra starten af. Det overraskede mig, hvor lidt det egentlig handler om styrke. Jeg troede, styrke spillede en stor rolle, men teknikken er langt vigtigere.',
    image: 'images/portrait3.webp',
  },
]

const activeTestimonial = ref(0)

function nextTestimonial() {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
}

function previousTestimonial() {
  activeTestimonial.value =
    (activeTestimonial.value - 1 + testimonials.length) % testimonials.length
}
</script>

<template>
  <main class="become-member-page">
    <PageHero title="Bliv armbryder" scroll-target="trial-signup">
      <template #description>
        Hos Armbrydning Odense er der plads til alle.
        <br />
        Fortæl os at du kommer til prøvetræning og læs mere om at være ny i klubben.
      </template>
    </PageHero>

    <section id="trial-signup" class="trial-signup section-bg--secondary">
      <div class="trial-signup__inner">
        <h2>
          Vi står <span class="highlight">klar</span>
          til at tage imod dig!
        </h2>

        <p>
          Din første træning skal være en god oplevelse!
          <br />
          Fortæl os, at du kommer, så sørger vi for at være klar til at tage imod dig.
        </p>
        <p class="trial-signup__notice">
          Tilmelding er <strong>ikke</strong> nødvendig – du kan også bare møde op!
        </p>

        <!-- Prøvetræningsformular -->
        <div class="trial-signup__form">
          <TrialForm />
        </div>
      </div>
    </section>

    <ImageTextSection
      image="/images/2.webp"
      image-alt="Medlemmer af Armbrydning Odense"
      image-right
      image-format="portrait"
      button-text="Fortæl os at du kommer"
      button-to="#trial-signup"
      button-variant="primary"
    >
      <template #heading> Step 1 - <span class="highlight">Find en dag</span> </template>

      <h3>Det første skridt er helt simpelt!</h3>

      <p>
        Find en træningsdag, der passer dig, og kig forbi klubben i Bolbro. <br />Du behøver ikke
        tilmelde dig på forhånd, men du er altid velkommen til at give os besked om, at du kommer.
        Så sørger vi for, at der står en klar til at tage imod dig.
      </p>
    </ImageTextSection>

    <ImageTextSection
      image="/images/8.webp"
      image-alt="Medlemmer, der træner armbrydning"
      image-format="portrait"
      background-variant="secondary"
      button-text="Find vej til klubben"
      :button-href="mapsUrl"
      button-variant="secondary"
    >
      <template #heading> Step 2 - <span class="highlight">Come as you are!</span> </template>

      <p>
        Du behøver ikke have særligt udstyr eller kende reglerne på forhånd. Tag noget tøj på, du
        kan bevæge dig i, og medbring gerne en drikkedunk.
      </p>
      <p>
        Når du kommer til klubben, tager vi imod dig og viser dig rundt. Du får mulighed for at møde
        de andre medlemmer, høre lidt om sporten og få en fornemmelse af stemningen.
      </p>
      <p>Vi sørger for at du føler dig som en del af fællesskabet!</p>
    </ImageTextSection>

    <ImageTextSection
      image="/images/12.webp"
      image-alt="To personer, der træner armbrydning"
      image-right
      image-format="portrait"
      button-text="Læs mere om priser og kontingenter"
      button-to="/praktisk-info"
      button-variant="secondary"
    >
      <template #heading>Step 3: <span class="highlight">Din første træning</span> </template>

      <p>
        Nu skal du selv prøve kræfter med armbrydning! Vi starter med at vise dig de grundlæggende
        teknikker, så du kan lære sporten at kende i dit eget tempo.
      </p>

      <p>
        Du behøver ikke kunne noget på forhånd! Vi hjælper dig undervejs, svarer på dine spørgsmål
        og sørger for, at du får en god introduktion til sporten.
      </p>

      <p>
        Det vigtigste er ikke, hvor stærk du er, men at du har lyst til at lære noget nyt og have
        det sjovt sammen med os.
      </p>

      <p>
        Hvis du finder ud af, at armbrydning er noget for dig, hjælper vi dig selvfølgelig med at
        blive medlem!
      </p>
    </ImageTextSection>

    <section class="testimonials-section section-bg--secondary">
      <ScrollReveal>
        <div class="testimonials-section__inner">
          <h2>
            Hør det fra <span class="highlight">dem</span>, der er
            <span class="highlight">med</span>
          </h2>

          <p class="testimonials-section__intro">
            Hvordan er det egentlig at starte til armbrydning? Hør, hvad vores medlemmer siger.
          </p>

          <div class="testimonials-section__carousel">
            <div aria-live="polite" aria-atomic="true">
              <Transition name="testimonial" mode="out-in">
                <TestimonialCard
                  :key="activeTestimonial"
                  v-bind="testimonials[activeTestimonial]"
                />
              </Transition>
            </div>

            <div class="testimonials-section__controls">
              <button type="button" aria-label="Forrige udtalelse" @click="previousTestimonial">
                ‹
              </button>

              <div class="testimonials-section__dots">
                <button
                  v-for="(testimonial, index) in testimonials"
                  :key="testimonial.name"
                  type="button"
                  :aria-label="`Vis udtalelse fra ${testimonial.name}`"
                  :aria-pressed="activeTestimonial === index"
                  :class="{ 'is-active': activeTestimonial === index }"
                  @click="activeTestimonial = index"
                ></button>
              </div>

              <button type="button" aria-label="Næste udtalelse" @click="nextTestimonial">›</button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// Trial signup section styles
.trial-signup {
  padding: 4rem 1.5rem;
  text-align: center;
}

.trial-signup__inner {
  max-width: 600px;
  margin-inline: auto;

  h2 {
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

// Testimonials section styles
.testimonials-section {
  padding: 5rem 1.5rem;
}

.testimonials-section__inner {
  max-width: 740px;
  margin-inline: auto;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
  }
}

.testimonials-section__intro {
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.testimonials-section__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;

  > button {
    border: 0;
    background: none;
    color: v.$color-lime;
    font-size: 2.5rem;
    cursor: pointer;
  }
}

.testimonials-section__dots {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  button {
    width: 12px;
    height: 12px;
    min-width: 12px;
    padding: 0;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background-color: v.$color-dark-gray;
    cursor: pointer;

    &.is-active {
      background-color: v.$color-lime;
    }
  }
}

.testimonial-enter-active,
.testimonial-leave-active {
  transition: opacity 0.3s ease;
}

.testimonial-enter-from,
.testimonial-leave-to {
  opacity: 0;
}

// PRØVETRÆNINGSFORMULAR
.trial-signup__form {
  margin-top: 2rem;
  text-align: left;
}

.trial-signup__notice {
  margin-top: 1.5rem;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-enter-active,
  .testimonial-leave-active {
    transition: none;
  }
}
</style>
