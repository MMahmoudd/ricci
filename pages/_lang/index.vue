<template>
  <div class="HomePage text-center">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="categoryComponent">
      <categoryComponent />
    </div>
    <div class="AdsComponent">
      <AdsComponent />
    </div>
    <div class="topProductComponent">
      <topProductComponent />
    </div>
    <div class="AdsComponent">
      <AdsComponent />
    </div>
    <div class="orderNowComponent">
      <orderNowComponent />
    </div>
    <div class="AdsComponent">
      <AdsComponent />
    </div>
    <div class="OurPortfolioComponent">
      <OurPortfolioComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from '../../components/global/header.vue'
import categoryComponent from '../../components/HomePage/Category.vue'
import topProductComponent from '../../components/HomePage/topProduct.vue'
import orderNowComponent from '../../components/HomePage/OrderNow..vue'
import OurPortfolioComponent from '../../components/HomePage/OurPortfolio.vue'
import AdsComponent from '../../components/ads/ads.vue'

export default {
  components: {
    headerComponent,
    categoryComponent,
    topProductComponent,
    orderNowComponent,
    OurPortfolioComponent,
    AdsComponent
  },
}
</script>
