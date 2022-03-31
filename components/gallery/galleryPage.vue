<template>
  <div class="gallery-page-component py-5">
    <div v-if="details.title_translate" class="container">
      <h2 class="header-section text-center">{{details.title_translate}}</h2>
      <div v-for="image in details.galleryImages" :key="image.id">
        <img :src="image.url" alt="gallery image">
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
export default {
  name: 'pages',
  props:['galleryId'],
  data: () => ({
    details: {}
  }),
  created() {
    this.getGalleryById()
  },
  methods: {
    async getGalleryById() {
      const item = await Service.getGalleryById(+this.galleryId)
      if (item.data.status === true) {
        this.details = item.data.gallery
      }
    },
  }
}
</script>
