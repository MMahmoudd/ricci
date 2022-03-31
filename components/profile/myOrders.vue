<template>
  <div class="account myOrders-component">
    <b-table :items="orders" :fields="fields">
      <template #cell(Order)="item">
        <b class="text-color">{{ item.item.id }}</b>
      </template>
      <template #cell(Date)="item">
        <p>{{ item.item.created_at }}</p>
      </template>
      <template #cell(Status)="item">
        <b class="text-color">{{ item.item.status }}</b>
      </template>
      <template #cell(Total)="item">
        <p>{{ item.item.total }} LE</p>
      </template>
      <template #cell(Actions)="item">
        <p class="text-color click" @click="showData(item.item)">
          <i class="fa fa-eye"></i>
        </p>
      </template>
    </b-table>
    <b-modal v-model="showDetails" size="xl" centered title="BootstrapVue">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button
          class="close"
          size="sm"
          variant="outline-danger"
          @click="close()"
        >
          <i class="fas fa-times"></i>
        </b-button>
      </template>
      <h2 class="header-section text-center mb-5">
        {{ $t("profile.orderDetails") }}
      </h2>
      <div
        class="row text-center mb-3"
        v-for="item in product.producuts"
        :key="item.id"
      >
        <div class="col-md-4 price">
          {{ item.qty }}
        </div>
        <div class="col-md-4 price">
          {{ item.productable.name_translate }} {{ item.size_name }}
        </div>
        <div class="col-md-4 price">
          {{ item.total_price }}
        </div>
      </div>
      <div class="row mt-5 text-center">
        <div class="col-md-4 price">
          {{ $t("profile.addressCastoumer") }}
        </div>
        <div class="col-md-8" v-if="product.address">
          <p v-text="product.address.street_address" />
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";

const Service = ServiceFactory.get("orders");
export default {
  name: "products",
  data: () => ({
    showDetails: false,
    product: {},
    orders: [],
    fields: ["Order", "Date", "Status", "Total", "Actions"],
  }),
  created() {
    this.getUserOrder();
  },
  computed: {},
  methods: {
    async getUserOrder() {
      const UserOrders = await Service.getOrders();
      if (UserOrders.status === true) {
        this.orders = UserOrders.my_orders;
      } else {
        this.ErrorMessage = "Something Error";
        // this.ErrorMessage = getGovernrate.message[0]
        setTimeout(() => {
          this.ErrorMessage = "";
        }, 1500);
      }
    },
    showData(productItem) {
      this.showDetails = true;
      this.product = productItem;
    },
  },
};
</script>
