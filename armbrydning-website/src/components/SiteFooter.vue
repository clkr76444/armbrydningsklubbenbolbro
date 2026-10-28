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
            <a href="tel:+4521650142">21 65 01 42</a>

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
        <p>© Armbrydning Odense 2026</p>

        <nav aria-label="Footer-navigation">
          <!-- Links tilføjes senere -->
        </nav>
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
  gap: 2.5rem;
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
</style>
