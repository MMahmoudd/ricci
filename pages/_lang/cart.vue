<template>
  <div class="text-center">
  <div class="headerComponent">
    <headerComponent />
  </div>
  <div class="cartComponent">
    <cartComponent />
  </div>

  </div>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import cartComponent from '../../components/cart/cart.vue'


export default {
  components: {
    headerComponent,
    cartComponent
  },
}
</script>
