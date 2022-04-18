<template>
  <div class="menu-component py-5">
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-10">
          <h2 class="header-section text-left">
            <strong>{{ $t("menu.menu") }}</strong>
          </h2>
          <div v-if="products.length > 0">
            <ProductComponent class="pt-5" :allProducts="products" />
          </div>
          <div v-else>
            {{ $t("global.noData") }}
          </div>
        </div>
        <div class="col-md-2">
          <h2 class="header-section text-left">{{ $t("menu.category") }}</h2>
          <div class="menue-items pt-5">
            <div class="all">
              <b-form-group v-slot="{ ariaDescribedby1 }">
                <b-form-radio
                  @change="fetchAllItems()"
                  v-model="selected"
                  :aria-describedby="ariaDescribedby1"
                  name="some-radios"
                  >{{ $t("menu.all") }}</b-form-radio
                >
              </b-form-group>
            </div>
            <div v-for="item in categories" :key="item.id">
              <div class="category-item text-left">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    @change="
                      (value) => {
                        changeCategory(value);
                        fetchAllItems();
                      }
                    "
                    v-model="selected"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    :value="item.id"
                    >{{ item.name_translate }}</b-form-radio
                  >
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- <h4 class="header-section text-left pt-3">Filter By Price</h4>
          <div class="range-filter">
            <div class='range-slider'>
              <input type="range" min="1" max="500" step="1" v-model="sliderMin" @change="fetchAllItems()">
              <input type="range" min="1" max="500" step="1" v-model="sliderMax" @change="fetchAllItems()">
            </div>
            <p class="pt-3"><span>Price {{ sliderMin }} LE</span> : <span>{{ sliderMax }}LE</span></p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
import ProductComponent from "../global/products.vue";
const CategoryService = ServiceFactory.get("Category");
const topProductService = ServiceFactory.get("Products");
export default {
  name: "topProduct",
  components: {
    ProductComponent,
  },
  data: () => ({
    products: [],
    categories: [],
    selected: "",
    minAngle: 1,
    maxAngle: 500,
    data: [],
  }),
  computed: {
    sliderMin: {
      get: function () {
        var val = parseInt(this.minAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      },
    },
    sliderMax: {
      get: function () {
        var val = parseInt(this.maxAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      },
    },
  },
  created() {
    this.selected = +this.$route.query.category || "";
    this.fetchAllItems(), this.fetchAllCategories();
  },
  methods: {
    changeCategory(value) {
      this.$router.push({ query: { category: value } });
    },
    async fetchAllItems() {
      // this.$router.push({query: {category : this.selected}})
      this.dataLoading = true;
      const items = await topProductService.getAllProducts(this.selected);
      this.products = items.items;
      this.dataLoading = false;
    },
    async fetchAllCategories() {
      this.dataLoading = true;
      const items = await CategoryService.getAllCategories();
      this.categories = items.categories;
      this.dataLoading = false;
    },
  },
};
</script>
