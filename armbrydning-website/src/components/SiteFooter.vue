<script setup>
import logo from '../assets/images/logo.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import instagramIcon from '../assets/icons/instagram.svg'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- Footerens hovedindhold -->
      <div class="site-footer__main">
        <!-- Logo -->
        <RouterLink to="/" class="site-footer__logo">
          <img :src="logo" alt="Armbrydning Odense" />
        </RouterLink>

        <!-- Træningstider -->
        <section class="site-footer__section">
          <h2>Træningstider</h2>
          <dl class="site-footer__schedule">
            <div class="site-footer__schedule-row">
              <dt>Tirsdag</dt>
              <dd>18.30 - 20.00</dd>
            </div>
            <div class="site-footer__schedule-row">
              <dt>Torsdag</dt>
              <dd>18.30 - 20.00</dd>
            </div>
          </dl>
        </section>

        <!-- Kontakt -->
        <section class="site-footer__section">
          <h2>Kontakt os</h2>
          <address class="site-footer__contact">
            <a href="mailto:kontakt@armbrydningodense.dk">kontakt@armbrydningodense.dk</a>
            <a href="tel:+4521650142">+45 21 65 01 42</a>

            <p>
              Middelfartvej 114
              <br />
              5000 Odense
            </p>
          </address>
        </section>

        <!-- Sociale medier -->
        <section class="site-footer__section">
          <h2>Sociale medier</h2>
          <ul class="site-footer__socials">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61594674340584"
                target="_blank"
                rel="noopener"
              >
                <img :src="facebookIcon" alt="" />
                <span>Facebook</span>
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/armbrydning/?hl=da" target="_blank" rel="noopener">
                <img :src="instagramIcon" alt="" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <!-- Nederste del af footeren -->
      <div class="site-footer__bottom">
        <nav class="site-footer__bottom-nav" aria-label="Footer-navigation">
          <RouterLink to="/privatlivspolitik">Privatlivspolitik</RouterLink>
          <RouterLink to="/bliv-sponsor">Bliv sponsor</RouterLink>
        </nav>
        <p>© Armbrydning Odense 2026</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as v;

// FOOTER
.site-footer {
  //background-color: v.$color-lime;
  background: linear-gradient(to bottom, v.$bg-primary 0%, v.$color-lime 30px, v.$color-lime 100%);

  color: v.$color-off-black;
  padding: 50px 1.5rem 3rem;
}

.site-footer__inner {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
}

// FOOTER MAIN - MOBILE FIRST
.site-footer__main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

// FOOTER LOGO
.site-footer__logo {
  justify-self: start;

  img {
    display: block;
    width: 100px;
    height: auto;
  }
}

// FOOTER OVERSKRIFTER
.site-footer__section {
  h2 {
    margin: 0 0 1rem;
    font-family: v.$font-heading;
    font-size: 1.125rem;
    font-weight: v.$font-regular;
    line-height: 1.3;
    text-transform: uppercase;
    color: v.$color-off-black;
  }
}

// FOOTER TRÆNINGSTIDER
.site-footer__schedule {
  margin: 0;

  &-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  dt {
    font-weight: v.$font-bold;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
  }
}

// FOOTER CONTACT
.site-footer__contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  font-style: normal;

  a {
    color: v.$color-off-black;
    text-decoration: none;
    overflow-wrap: anywhere;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid v.$color-off-black;
      outline-offset: 4px;
    }
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
}

// FOOTER SOCIALS
.site-footer__socials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  padding: 0;
  list-style: none;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;

    color: v.$color-off-black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid v.$color-off-black;
      outline-offset: 4px;
    }
  }

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
}

// FOOTER BUND - SPONSOR, PRIVATLIVSPOLITIK OG COPYRIGHT
.site-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid v.$color-off-black;

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: v.$font-regular;
  }
}

.site-footer__bottom-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  a {
    color: v.$color-off-black;
    font-size: 0.875rem;
    text-decoration: none;
    font-weight: v.$font-medium;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }
}
</style>
