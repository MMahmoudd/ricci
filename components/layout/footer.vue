<template>
  <div id="footer">
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <div class="logo">
              <img src="../../assets/images/VegasLogo.svg" alt="logo" />
              <div>{{ info.phone }}</div>
              <!-- <div>15727</div> -->
              <div class="social">
                <a :href="links.facebook" target="_blank"
                  ><i class="fab fa-facebook-square"></i
                ></a>
                <a :href="links.instagram" target="_blank"
                  ><i class="fab fa-instagram"></i
                ></a>
                <a :href="links.twitter" target="_blank">
                  <i class="tiktok">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fff"
                      viewBox="0 0 448 512"
                    >
                      <!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                      />
                    </svg>
                  </i>
                </a>
                <a :href="links.youtube" target="_blank">
                  <i class="fab fa-youtube-square"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-2">
            <h4>{{ $t("global.menu") }}</h4>

            <ul class="menu-list">
              <li v-for="category in categories" :key="category.id">
                <nuxt-link :to="localePath(`/menu?category=${category.id}`)">
                  {{ category.name_translate }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="col-md-2">
            <div class="my-account">
              <h4>{{ $t("global.information") }}</h4>
              <p v-for="i in pages" :key="i.id">
                <a @click="goToPage(i)">{{ i.title }}</a>
              </p>
            </div>
          </div>

          <div class="col-md-3">
            <div class="my-account">
              <h4>{{ $t("global.pages") }}</h4>
              <!-- <p>
                <nuxt-link :to="localePath('/profile')">{{$t('global.myAccount')}}</nuxt-link>
              </p>
              <p>
                <nuxt-link :to="localePath('/profile')">{{$t('global.orderHistory')}}</nuxt-link>
              </p> -->
              <p>
                <nuxt-link :to="localePath('/contactUs')">{{
                  $t("global.contactUs")
                }}</nuxt-link>
              </p>
              <p>
                <nuxt-link :to="localePath('/gallery')">{{
                  $t("global.gallery")
                }}</nuxt-link>
              </p>
              <p>
                <nuxt-link :to="localePath('/news')">{{
                  $t("global.news")
                }}</nuxt-link>
              </p>
            </div>
          </div>

          <div class="col-md-3">
            <h4>{{ $t("global.ourBranches") }}</h4>
            <p>
              <nuxt-link :to="localePath('branches')">
                {{ $t("global.ourBranches") }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const Service = ServiceFactory.get("pages");
const commonService = ServiceFactory.get("common");
const categoryService = ServiceFactory.get("Category");

export default {
  name: "footer",
  data: () => ({
    pages: [],
    links: {
      facebook: "",
      twitter: "",
      youtube: "",
      instagram: "",
    },
    info: {
      phone: "",
    },
    categories: [],
  }),
  created() {
    this.getPages();
    this.getSettings();
    this.getCategories();
  },
  methods: {
    async getPages() {
      const pages = await Service.getPages();
      if (pages.data.status === true) {
        this.pages = pages.data.pages;
      }
    },
    async getSettings() {
      try {
        const response = await commonService.getSettings();

        const { data } = response;
        const { status, settings } = data;
        if (status !== true) {
          throw new Error("Error");
        }
        const { facebook, twitter, instagram, youtube } = settings;
        this.links = {
          facebook,
          twitter,
          instagram,
          youtube,
        };

        const { phone1: phone } = settings;
        this.info = { phone };
      } catch (error) {
        console.log({ error });
      }
    },

    async getCategories() {
      try {
        const { categories, status } = await categoryService.getAllCategories();
        this.categories = categories.slice(0, 5);
        if (!status) {
          throw new Error("ERROR");
        }
      } catch (error) {}
    },
    goToPage(i) {
      this.$router.push(this.localePath("/pages/" + i.id));
    },
  },
};
</script>
