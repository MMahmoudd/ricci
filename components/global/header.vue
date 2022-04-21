<template>
  <div class="sliderHeader-component">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      indicators
      controls
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide v-for="image in images" :key="image.id">
        <template #img>
          <img
            class="img-Responsive"
            :src="image.image"
            alt="Responsive image"
          />
        </template>
        <a
          class="btn"
          :href="localePath(`/menu?category=60`)"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t("home.orderNow") }}
        </a>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { ServiceFactory } from "../../services/ServiceFactory";

const Service = ServiceFactory.get("pages");
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      images: [],
    };
  },
  created() {
    this.getSliderData();
  },
  methods: {
    async getSliderData() {
      const SliderData = await Service.getSlider();
      if (SliderData.data.status === true) {
        this.images = SliderData.data.sliders;
      } else {
        this.ErrorMessage = "Something Error";
        // this.ErrorMessage = getGovernrate.message[0]
        setTimeout(() => {
          this.ErrorMessage = "";
        }, 1500);
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
