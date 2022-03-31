<template>
  <div class="registerPage">
    <div class="headerComponent">
      <headerComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/register/register.vue'

export default {
  components: {
    headerComponent,
  },
  layout: 'login',
}
</script>
