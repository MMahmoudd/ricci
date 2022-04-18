<template>
  <div class="wrapper">
    <navbarComponent />
    <div class="pages">
      <Nuxt />
    </div>
    <div class="justify-content-center">
      <a
        href="https://foodclub-eg.com/"
        target="_blank"
        rel="noopener noreferrer"
        style="position: fixed"
      >
        <img id="over" src="../assets/images/Foodclup.jpg" />
      </a>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import navbarComponent from "../components/layout/navbar.vue";
import FooterComponent from "../components/layout/footer.vue";
export default {
  components: {
    navbarComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
};
</script>
