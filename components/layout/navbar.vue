<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand :to="localePath('/')">
        <img src="../../assets/images/VegasLogo.svg" alt="logo" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link :to="localePath('/')">{{ $t("global.home") }}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/menu')">{{
              $t("global.menu")
            }}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/news')">{{
              $t("global.news")
            }}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/gallery')">{{
              $t("global.gallery")
            }}</nuxt-link>
          </b-nav-item>

          <b-nav-item>
            <nuxt-link :to="localePath('/contactUs')">{{
              $t("global.contactUs")
            }}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/event')">{{
              $t("global.event")
            }}</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link :to="localePath('/branches')">{{
              $t("global.branches")
            }}</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="text-center">
            <b-form-group>
              <div
                v-for="locale in $i18n.locales"
                :key="locale.code"
                @click="switchLocalePath(locale.code)"
              >
                <p v-if="locale.code !== $i18n.locale">{{ locale.code }}</p>
              </div>
            </b-form-group>
          </b-nav-item>
          <b-nav-item class="text-center">
            <nuxt-link :to="localePath('/search')">
              <i class="fa fa-search"></i>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item class="text-center">
            <nuxt-link :to="localePath('/cart')">
              <i class="fa fa-shopping-cart"
                ><span class="qty" v-if="products > 0">{{ products }}</span></i
              >
            </nuxt-link>
          </b-nav-item>
          <b-nav-item class="text-center">
            <nuxt-link :to="localePath('/checkout')">
              <i class="fa fa-clipboard-check"></i>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item class="text-center">
            <nuxt-link :to="localePath('/profile')">
              <i class="fa fa-user"></i>
            </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: false,
      options: [
        { text: "ar", value: "ar" },
        { text: "en", value: "en" },
      ],
    };
  },
  computed: {
    products() {
      return this.$store.state.products.length;
    },
  },
  methods: {
    async switchLocalePath(lang) {
      // console.log('this.currentLocation', this.$router)
      this.$cookies.set("i18n_redirected", lang);
      this.$i18n.locale = lang;
      window.location.href = "/" + lang;
    },
  },
};
</script>
