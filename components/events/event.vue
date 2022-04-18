<template>
  <div class="products-component py-5">
    <h2 class="header-section py-3">{{ $t("global.event") }}</h2>

    <!-- <div class="container text-left">
      {{ list }}
    </div> -->
    <div class="col-md-4" v-for="item in list" :key="item.id">
      <div class="product-image">
        <a :href="item.link">
          <img :src="item.image" alt="product-image" />
        </a>
      </div>

      <div class="product-details d-flex justify-content-center">
        <p>{{ item.title_translate }}</p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
// const eventsServices = ServiceFactory.get("events");
const Services = ServiceFactory.get("pages");

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      debugger;
      const list = await Services.getEvents();
      if (list.data.status === true) {
        this.list = list.data.events;
      }
    },

    goToPage(i) {
      this.$router.push(this.localePath("/event/" + i.id));
    },
  },
};
</script>
