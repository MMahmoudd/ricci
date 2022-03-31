<template>
  <div class="cart-component">
    <h2 class="header-section">{{$t('cart.myCart')}}</h2>
    <div class="container">
      <div class="row" v-if="products.length > 0">
      <!-- <div class="row justify-content-between w-100">
        <div class="col-md-3">الاسم</div>
        <div class="col-md-3">الحجم</div>
        <div class="col-md-1">السعر</div>
        <div class="col-md-5 text-right">الاجمالي</div>
      </div> -->
          <div class="cart-item" v-for="(item, i) in products" :key="item.id">
              <div class="cart-image">
                  <!--<img :src="allProducts.filter(product => item.item_id === product.id)[0].image" alt="product-image">-->
                  <img :src="item.item_image" alt="product-image">
              </div>
            <div class="cart-details row">
              <p class="font-weight-bold text-left col-sm-3" @click="showProductDetails(item)">
              <!--{{ allProducts.filter(product => item.item_id === product.id)[0].name_translate }}-->
              {{ item.item_name }}
              </p>
              <p class="font-weight-bold text-left col-sm-2">
              {{ item.name }}
              </p>
              <p class="font-weight-bold text-left main-color col-sm-2">{{ item.price }} LE</p>
              <div v-if="item.quantity > 0" class="quantity text-left col-sm-3">
                <i class="add fas fa-plus" @click="increase(item)"></i>
                <span class="font-weight-bold mx-2">{{item.quantity}}</span>
                <i class="minus fas fa-minus" @click="decrease(item, i)"></i>
              </div>
              <p class="font-weight-bold col-sm-2 text-right">
              {{ item.totalPriceWithAddons }}LE</p>
            </div>
            <b-button class="delete" @click="deleteProductFromCart(item)">
              x
            </b-button>
          </div>
          <div class="tatal-details d-flex justify-content-between">
            <div class="back">
              <nuxt-link :to="localePath('/')"><i class="fas fa-arrow-left"></i>  {{$t('cart.backToShop')}}</nuxt-link>
            </div>
            <div class="total">
              <p class="font-weight-bold mr-3"><span class="header-section">{{$t('cart.subtotal')}}:</span>  {{ total }} L.E</p>
            </div>
          </div>
          <div class="shop">
            <b-button @click="continueShipping()" class="btn">
              {{$t('cart.continue')}}
            </b-button>
          </div>
      </div>
      <div v-else>
        {{$t('cart.noItemsInCart')}}
      </div>
      <div class="mt-5">
              <b-alert
                v-if="ErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ ErrorMessage }}
            </b-alert>
            <b-alert
                v-if="SuccessMessage"
                show
                class="text-center alert"
                dismissible
                variant="success"
              >
                {{ SuccessMessage }}
            </b-alert>
            </div>
    </div>
        <b-modal
        v-model="showDetails"
        size="xl"
        centered
        title="BootstrapVue"
        >
        <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-button class="close" size="sm" variant="outline-danger" @click="close()">
            <i class="fas fa-times"></i>
          </b-button>
        </template>
          <div class="d-flex">
            <div class="img">
              <img :src="product.item_image" alt="image">
            </div>
            <div class="content">
              <h4>{{product.item_name}}</h4>
              <p>{{$t('cart.sizeSelcted')}}: {{product.name}}</p>
              <div v-if="product.selectedAddons">
              <div class="row border" v-for="(addon) in product.selectedAddons" :key="addon.id">
                <p class="col-md-6">{{$t('cart.addOnName')}}: <span class="price">{{addon.name_translate}}</span> </p>
                <p class="col-md-6">{{$t('cart.addOnPrice')}}: <span class="price">{{addon.price}}</span></p>
              </div>
              </div>
            </div>
          </div>
      </b-modal>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const CartService = ServiceFactory.get('Cart')

export default {
  name: 'products',
  data: () => ({
    product: {},
    allProducts: [],
    ErrorMessage: '',
    SuccessMessage: '',
    showDetails: false,
    product: {},
  }),
  computed: {
    products() {
      return this.$store.state.products;
    },
    total() {
      return this.$store.state.products.reduce((p, item) => p + +item.totalPriceWithAddons, 0)
    },
    // totalWithAddons() {
    //   return this.$store.state.products.forEach()
    // },
  },
  methods: {
    showProductDetails(productItem){
      this.showDetails = true
      this.product = productItem
    },
    increase(item, index) {
      this.$store.commit("increase", item);
    },
    decrease(item, index) {
      if (this.products[index].quantity >= 1) {
        this.$store.commit("decrease", item);
      }
    },
    deleteProductFromCart (item) {
      this.$store.commit("delete", item);
    },
    showProductDetails(item) {
      this.showDetails = true
      this.product = item
    },
    async continueShipping () {
      if (localStorage.getItem('token')) {
        const cartData = this.products.map(item => {
          return ({
            id: item.item_id,
            qty: item.quantity,
            size_name: item.name,
            addons: item.selectedAddons || []
        })
        })
        const formData = new FormData()
        /**
         * ? converting the json object to a form-data format
         */
        function buildFormData (formData, data, parentKey) {
          if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
              buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
            })
          } else {
            const value = data == null ? '' : data

            formData.append(parentKey, value)
          }
        }
        buildFormData(formData, {items: cartData})
        const sendData = await CartService.sendCartData(formData)
        if (sendData.status === 200) {
          this.SuccessMessage = 'Cart Sent Success'
          setTimeout(() => {
            this.SuccessMessage = ''
            this.$router.push(this.localePath('/checkout'))
            // this.$store.commit("resetCart");
          }, 1500)
        } else {
          this.ErrorMessage = sendData
          // setTimeout(() => {
          //     this.$router.push('/login')
          //   }, 1500)
        }
      } else {
        this.$router.push(this.localePath('/login'))
      }
    }
  }
}
</script>
