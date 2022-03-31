<template>
  <div class="text-center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="listGalleryComponent">
    <listComponent />
  </div>

  </div>
</template>
<script>
import headerComponent from '../../../components/global/header.vue'
import listComponent from '../../../components/gallery/list.vue'


export default {
  components: {
    headerComponent,
    listComponent
  },
}
</script>
