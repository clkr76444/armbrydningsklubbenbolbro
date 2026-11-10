<script setup>
import ContactForm from '../components/ContactForm.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <main class="contact-page">
    <PageHero
      title="Kontakt"
      description="Har du spørgsmål om armbrydning, medlemskab eller klubben? Så er du altid velkommen til at kontakte os!"
      scroll-target="contact-content"
    />

    <section id="contact-content" class="contact-section">
      <ScrollReveal>
        <div class="contact-section__inner">
          <div class="contact-section__grid">
            <!-- Venstre kolonne: Kontaktoplysninger -->
            <div class="contact-section__info">
              <h2>Du vil <span class="highlight">kontakte os</span></h2>

              <p>
                Du er altid velkommen til at tage fat i os, hvis der er noget, du gerne vil vide.
              </p>

              <div class="contact-section__details">
                <!-- Telefon -->
                <div class="contact-section__detail">
                  <span class="contact-section__icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path
                        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.11.35.03.74-.25 1.02l-2.2 2.19z"
                      />
                    </svg>
                  </span>

                  <div>
                    <h3>Telefon</h3>
                    <a href="tel:+4521650142">+45 21 65 01 42</a>
                  </div>
                </div>

                <!-- E-mail -->
                <div class="contact-section__detail">
                  <span class="contact-section__icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path
                        d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
                      />
                    </svg>
                  </span>

                  <div>
                    <h3>E-mail</h3>
                    <a href="mailto:kontakt@armbrydningodense.dk"> kontakt@armbrydningodense.dk </a>
                  </div>
                </div>
              </div>

              <img
                src="/images/faellesbillede.webp"
                alt="Medlemmer af Armbrydning Odense"
                class="contact-section__image"
                loading="lazy"
              />
            </div>

            <!-- Højre kolonne: Kontaktformular -->
            <div class="contact-section__form">
              <h2>Vi skal <span class="highlight">kontakte dig</span></h2>

              <p>Udfyld formularen, så kan vi vende tilbage til dig.</p>

              <ContactForm />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// KONTAKTSIDEN - MOBILE FIRST
.contact-section {
  padding: 4rem 1.5rem;
  background-color: v.$bg-primary;
}

.contact-section__inner {
  max-width: 1200px;
  margin-inline: auto;
}

.contact-section__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

.contact-section__info,
.contact-section__form {
  min-width: 0;

  h2 {
    margin-bottom: 1.5rem;
    font-family: v.$font-heading;
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-transform: uppercase;
  }

  > p {
    margin-bottom: 2rem;
    line-height: 1.6;
  }
}

// TELEFON OG E-MAIL
.contact-section__details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-section__detail {
  display: flex;
  align-items: center;
  gap: 1rem;

  > div {
    min-width: 0;
  }

  h3 {
    margin: 0 0 0.35rem;
    color: v.$color-lime;
    font-size: 1.125rem;
    font-weight: v.$font-medium;
  }

  a {
    color: v.$color-off-white;
    text-decoration: none;
    overflow-wrap: anywhere;

    &:hover {
      color: v.$color-lime;
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid v.$color-lime;
      outline-offset: 4px;
    }
  }
}

// FÆLLES IKONSTYLING
.contact-section__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background-color: v.$bg-secondary;
  border-radius: 8px;

  svg {
    display: block;
    width: 24px;
    height: 24px;
    color: v.$color-lime;
  }
}

.contact-section__image {
  display: block;
  width: 98%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center top;
  border-radius: 8px;
}

// TABLET OG DESKTOP
@media (min-width: v.$breakpoint-tablet) {
  .contact-section {
    padding-block: 5rem;
  }

  .contact-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
    align-items: start;
  }
}
</style>
