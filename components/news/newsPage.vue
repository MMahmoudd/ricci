<template>
  <div class="gallery-page-component py-5">
    <div v-if="details.title_translate" class="container">
      <h2 class="header-section text-center">{{details.title_translate}}</h2>
      <div class="image">
        <img :src="details.image" alt="gallery image">
      </div>
      <p v-html="details.description_translate"></p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
export default {
  name: 'pages',
  props:['newsId'],
  data: () => ({
    details: {}
  }),
  created() {
    this.getNewsById()
  },
  methods: {
    async getNewsById() {
      const item = await Service.getNewsById(+this.newsId)
      if (item.data.status === true) {
        this.details = item.data.news
      }
    },
  }
}
</script>
