<template>
  <div class="products-component py-5">
    <h2 class="header-section py-3">News</h2>
    <div class="container text-left">
    <div class="row">
      <div class="col-md-4" v-for="item in list" :key="item.id">
      <div class="product-item" @click="goToPage(item)">
        <div class="product-image">
          <img :src="item.image" alt="product-image">
            <div class="overlay">
              <div class="addToCart d-flex justify-content-center">
                <i class="fas fa-eye" @click="goToPage(item)"></i>
              </div>
            </div>
          </div>
          <div class="product-details d-flex justify-content-center">
              <p>{{ item.title_translate }}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getNews()
    },
    methods: {
      async getNews() {
        const list = await Service.getNews()
        if (list.data.status === true) {
          this.list = list.data.news
        }
      },
      goToPage(i) {
      this.$router.push(this.localePath('/news/' + i.id))
    }
    }
  }
</script>
