<template>
  <div class="wrapper">
    <navbarComponent />
      <div class="pages">
        <Nuxt />
      </div>
    <FooterComponent />
  </div>
</template>

<script>
import navbarComponent from '../components/layout/navbar.vue'
import FooterComponent from '../components/layout/footer.vue'
export default {
  components: {
    navbarComponent,
    FooterComponent
  },
  data () {
    return {
    }
  }
}
</script>
