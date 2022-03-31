<template>
  <div class="page-component">
    <div v-if="details.title" class="container">
      <h2 class="header-section text-center">{{details.title}}</h2>
      <p v-html="details.description"></p>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
export default {
  name: 'pages',
  props: ['pageId'],
  data: () => ({
    details: {}
  }),
  created() {
    this.getPageById()
  },
  methods: {
    async getPageById() {
      const pages = await Service.getPageById(+this.pageId)
      if (pages.data.status === true) {
        this.details = pages.data.page
      }
    },
  }
}
</script>
