<template>
  <div class="topProduct-component">
    <div class="container">
      <h2 class="header-section">{{$t('home.topProducts')}}</h2>
      <div class="topProduct-items pt-5">
        <ProductComponent :allProducts="data" />
        <nuxt-link to="/menu">{{$t('home.seeMore')}}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
import ProductComponent from '../global/products.vue'
const topProductService = ServiceFactory.get('Products')
export default {
  name: 'topProduct',
  components: {
    ProductComponent,
  },
  data: () => ({
    data: [],
    }),
    created() {
      this.fetchAllItems()
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const items = await topProductService.getAllTopItems()
        this.data = items.top_items
        this.dataLoading = false
      },
    }
}
</script>
