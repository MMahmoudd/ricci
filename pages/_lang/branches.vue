<template>
  <v-row justify="center" align="center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="branchesComponent">
    <branchesComponent />
  </div>
  </v-row>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import branchesComponent from '../../components/branches/branches.vue'
export default {
  components: {
    headerComponent,
    branchesComponent
  },
}
</script>
