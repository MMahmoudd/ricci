<template>
  <div class="products-component">
    <div class="container">
      <div class="pt-3" v-for="item in productsTest" :key="item.id">
        <h4 v-if="item.products.length > 0" class="header-section">
          {{ item.categoryName }}
        </h4>
        <div class="row">
          <div
            class="menue-items col-md-3"
            v-for="product in item.products"
            :key="product.id"
          >
            <div class="product-item" @click="showProductDetails(product)">
              <div class="product-image">
                <img :src="product.image" alt="product-image" />
                <div class="overlay">
                  <div class="addToCart d-flex justify-content-center">
                    <i
                      class="fas fa-eye"
                      @click="showProductDetails(product)"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="product-details d-flex justify-content-between mt-1">
                <p class="product_title">{{ product.name_translate }}</p>
                <strong
                  ><p class="product_price">
                    {{ product.sizes[0].price }} LE
                  </p></strong
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showDetails" size="xl" centered title="BootstrapVue">
      <template #modal-header>
        <div></div>
      </template>

      <!-- Emulate built in modal header close button action -->
      <b-button
        class="close"
        size="sm"
        variant="outline-danger"
        @click="close()"
      >
        <i class="fas fa-times"></i>
      </b-button>
      <div class="d-flex">
        <div class="img">
          <img :src="product.image" alt="product.image" />
        </div>
        <div class="content">
          <h4>{{ product.name_translate }}</h4>
          <p v-html="product.description_translate"></p>
          <!-- <p>{{ $t("sizes") }}:</p> -->
          <div class="row">
            <div class="col-md-3" v-for="size in product.sizes" :key="size.id">
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio
                  v-model="selecetdSize"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  :value="size"
                >
                  {{ size.name }}
                  <span class="price"
                    ><strong> ( {{ " " + size.price }} L.E )</strong>
                  </span></b-form-radio
                >
              </b-form-group>
            </div>
          </div>
          <div v-if="selecetdSize.quantity >= 0" class="quantity text-center">
            <i
              class="add fas fa-plus"
              @click="increaseSelecetdSize(selecetdSize)"
            ></i>
            <span class="font-weight-bold mx-2">{{
              selecetdSize.quantity
            }}</span>
            <i
              class="minus fas fa-minus"
              @click="decreaseSelecetdSize(selecetdSize, i)"
            ></i>
          </div>
        </div>
      </div>
      <hr />
      <div class="row" v-if="product.addson">
        <div class="col-md-3" v-for="addon in product.addson" :key="addon.id">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="selecetdSize.selectedAddons"
              :aria-describedby="ariaDescribedby"
              name="flavour-2"
            >
              <b-form-checkbox :value="addon">
                {{ addon.name_translate }}
                <span class="price">
                  <strong>{{ "  " + addon.price }}L.E </strong></span
                >
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
      <div v-if="selecetdSize.id" class="row actions">
        <b-button class="btn" @click="increase()"
          ><i class="fas fa-shopping-cart"></i>
          {{ $t("global.addToCart") }}
        </b-button>
      </div>
    </b-modal>
    <div class="alert-div">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ $t("global.itemAdded") }}
        <nuxt-link :to="localePath('/cart')">{{
          $t("global.goToCart")
        }}</nuxt-link>
      </b-alert>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const CategoryService = ServiceFactory.get("Category");
export default {
  name: "products",
  props: ["allProducts"],
  data: () => ({
    disabled: true,
    showDetails: false,
    product: {},
    categories: [],
    finalProducts: [],
    selectedAddons: [],
    dismissSecs: 5,
    dismissCountDown: 0,
    selecetdSize: {
      selectedAddons: [],
    },
  }),
  computed: {
    productsTest() {
      if (this.categories.length > 0) {
        const all = [];
        this.categories.forEach((category) => {
          const test = this.allProducts.filter((product) => {
            if (product.main_category_id === category.id) {
              return true;
            }
          });
          if (test.length > 0) {
            all.push({ categoryName: category.name_translate, products: test });
          }
        });
        this.finalProducts = all;
      }
      return this.finalProducts;
    },
    productsState() {
      return this.$store.state.products;
    },
  },
  created() {
    this.fetchAllCategories();
  },
  methods: {
    async fetchAllCategories() {
      this.dataLoading = true;
      const items = await CategoryService.getAllCategories();
      this.categories = items.categories;
      this.dataLoading = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    increaseSelecetdSize(selecetdSize) {
      // console.log(this.selecetdSize)
      selecetdSize.quantity += 1;
    },
    decreaseSelecetdSize(selecetdSize, i) {
      if (selecetdSize.quantity >= 2) {
        selecetdSize.quantity -= 1;
      }
    },
    increase() {
      this.$store.commit("addItem", this.selecetdSize);
      this.dismissCountDown = this.dismissSecs;
      this.selecetdSize = {
        selectedAddons: [],
      };
    },
    decrease() {
      if (this.product.quantity >= 1) {
        this.$store.commit("decrease", this.selecetdSize);
      }
    },
    showProductDetails(productItem) {
      // console.log('test', productItem)
      this.showDetails = true;
      this.product = productItem;
    },
    close() {
      this.selecetdSize.quantity = 1;
      this.showDetails = false;
    },
  },
};
</script>
