<template>
  <v-row justify="center" align="center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="pageComponent">
    <pageComponent :pageId="this.$route.params.page"/>
  </div>
  </v-row>
</template>
<script>
import headerComponent from '../../../components/global/header.vue'
import pageComponent from '../../../components/global/page.vue'
export default {
  components: {
    headerComponent,
    pageComponent
  },
}
</script>
