<template>
  <div class="wrapper">
    <navbarComponent />
    <div class="pages">
      <Nuxt />
    </div>
    <div class="justify-content-center">
      <a
        id="over"
        href="https://foodclub-eg.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
        style="position: fixed"
      >
        foodclub
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
