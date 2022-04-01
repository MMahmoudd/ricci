<template>
  <p class="font-weight-bold mr-3" v-show="finally_amount > 0">
    <span class="header-section"> {{ $t("checkout.discount") }}: </span>
    - {{ finally_amount || 0 }} L.E
  </p>
</template>

<script>
export default {
  name: "discountText",

  props: ["amount", "type", "total"],

  data: () => ({}),

  computed: {
    finally_amount() {
      if (this.amount && this.amount) {
        if (this.type === "percentage") {
          return (this.total * (this.amount / 100)).toFixed(2);
        } else if (this.type === "fixed") {
          return this.amount;
        }
      }
    },
  },
};
</script>
