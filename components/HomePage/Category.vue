<template>
  <div class="category-component">
    <div class="container">
      <h2 class="header-section">{{ $t("home.category") }}</h2>
      <b-carousel controls>
        <b-carousel-slide v-for="(slide, sIndex) in data" :key="sIndex">
          <template v-slot:img>
            <b-row align-v="center" align-h="center">
              <b-col
                cols="12"
                md="3"
                sm="4"
                class="mb-3 d-inline-flex justify-content-center"
                style=""
                v-for="(item, i) in slide"
                :key="i"
              >
                <nuxt-link
                  :to="{ path: '/menu', query: { category: item.id } }"
                  class="category-item mt-2"
                >
                  <div class="category-image">
                    <img :src="item.image" alt="category-image" />
                    <!-- <img src="../../assets/images/Component 3 – 1.png" alt="category-image"> -->
                  </div>
                  <p class="category-name">
                    {{ item.name_translate }}
                  </p>
                </nuxt-link>
              </b-col>
            </b-row>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const CategoryService = ServiceFactory.get("Category");
export default {
  name: "Category",
  data: () => ({
    data: [],
  }),
  created() {
    this.fetchAllItems();
  },
  methods: {
    async fetchAllItems() {
      this.dataLoading = true;
      const items = await CategoryService.getAllCategories();
      this.data = this.chunk(items.categories, 4);
      // console.log(this.data)
      this.dataLoading = false;
    },

    chunk(array, n) {
      return Array.from(Array(Math.ceil(array.length / n)), (_, i) =>
        array.slice(i * n, i * n + n)
      );
    },
  },
};
</script>

<style>
.category-component .carousel-control-next,
.category-component .carousel-control-prev {
  width: auto !important;
}

.category-component .carousel-control-prev .carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23a3080b' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
}

.category-component .carousel-control-next .carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23a3080b' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
}
</style>
