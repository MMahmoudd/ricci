<template>
  <div class="search-component">
    <div class="image">
        <b-form-input type="search" v-model="search" @input="fetchAllItems" />
    </div>
    <div class="container">
      <h2 class="header-section text-center pt-3">{{$t('search.results')}}</h2>
      <div v-if="products.length > 0 || search.length <= 0" class="row pt-3">
          <ProductComponent class="pt-3" :allProducts="products" />
      </div>
      <div v-else>
        <h4>{{$t('search.noResults')}}</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
import ProductComponent from '../global/products.vue'
const ProductService = ServiceFactory.get('Products')
export default {
  name: 'topProduct',
  components: {
    ProductComponent,
  },
  data: () => ({
    products: [],
    search: '',
    }),
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        if(this.search) {
          const items = await ProductService.getsearchedProducts(this.search)
          this.products = items.items
        } else {
          this.products === []
        }

        this.dataLoading = false
      },
    }
}
</script>
