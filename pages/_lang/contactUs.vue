<template>
  <div class="HomePage text-center">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="contactUsComponent">
      <contactUsComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import contactUsComponent from '../../components/contactUs/contactUs.vue'

export default {
  components: {
    headerComponent,
    contactUsComponent,
  },
}
</script>
