<template>
  <div class="profilePage">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="profileComponent">
      <profileComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import profileComponent from '../../components/profile/profile.vue'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    profileComponent
  },
}
</script>
