<template>
  <v-row justify="center" align="center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="menuComponent">
    <menuComponent />
  </div>
  </v-row>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import menuComponent from '../../components/menuPage/menu.vue'

export default {
  components: {
    headerComponent,
    menuComponent,
  },
}
</script>
