<template>
  <div class="HomePage text-center">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="chosenProductsComponent">
      <chosenProductsComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import chosenProductsComponent from '../../components/checkout/chosenProducts.vue'

export default {
  components: {
    headerComponent,
    chosenProductsComponent,
  },
}
</script>
