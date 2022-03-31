<template>
  <v-row justify="center" align="center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="pageComponent">
    <pageComponent :newsId="this.$route.params.id"/>
  </div>
  </v-row>
</template>
<script>
import headerComponent from '../../../components/global/header.vue'
import pageComponent from '../../../components/news/newsPage.vue'
export default {
  components: {
    headerComponent,
    pageComponent
  },
}
</script>
