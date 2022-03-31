<template>
  <div class="loginPage">
    <div class="headerComponent">
      <headerComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/login/login.vue'

export default {
  components: {
    headerComponent,
  },
  layout: 'login',
}
</script>
