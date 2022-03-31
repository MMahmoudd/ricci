<template>
  <div>
    <b-form @submit.prevent="submit" class="d-flex">
      <b-input
        v-model="couponNumber"
        class="d-inline-block"
        :placeholder="$t('checkout.couponPlaceholder')"
      />
      <b-button class="delete" type="submit">{{
        !loading ? $t("checkout.submitCoupon") : "..."
      }}</b-button>
    </b-form>
    <div class="alert-div">
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
</template>

<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const cartService = ServiceFactory.get("Cart");

export default {
  name: "Coupon",
  props: ["coupon"],
  data: () => ({
    loading: false,
    SuccessMessage: "",
    ErrorMessage: "",
    couponNumber: "",
  }),

  methods: {
    async submit() {
      this.loading = true;
      const response = await cartService.getCouponData(this.couponNumber);

      if (response.message && response.status === "200") {
        // TODO: Add $t
        this.SuccessMessage = "تم تطبيق الخصم بنجاح";
        
        this.$emit("input", {
          coupon: this.couponNumber,
          discount_amount: response.data.discount_amount,
          discount_type: response.data.type,
        });
        this.couponNumber = "";
      } else {
        // TODO: Add $t
        this.ErrorMessage = "هذا الكود غير متاح";
      }

      setTimeout(() => {
        this.SuccessMessage = "";
        this.ErrorMessage = "";
      }, 1500);

      this.loading = false;

      //   this.$store.commit("applyCoupon", { payload: response.data.discount_amount })
    },
  },
};
</script>

<style scoped>

.couponContainer input[type="text"] {
  width: 250px;
  margin: 0px 10px;
}

.delete {
  width: fit-content;
  background-color: #a3080b;
  border: none;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -ms-border-radius: 30px;
  -o-border-radius: 30px;
  padding: 7px 15px;
}

.alert-div {
  position: fixed;
  z-index: 100;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 10px);
  -webkit-transform: translate(-50%, 10px);
  -moz-transform: translate(-50%, 10px);
  -ms-transform: translate(-50%, 10px);
  -o-transform: translate(-50%, 10px);
}

.alert-div .alert {
  color: #fff;
}

.alert-success {
  /* color: #155724; */
  background-color: #47c665;
  border-color: #2ab94b;
}

.alert-danger {
  /* color: #721c24; */
  background-color: #e14351;
  border-color: #c53141;
}
</style>