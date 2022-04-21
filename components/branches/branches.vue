<template>
  <div class="branches-component">
    <div class="container">
      <h2 class="text-center header-section">
        {{ $t("branches.branches") }}
      </h2>
      <div v-if="data.length > 0" class="row details">
        <div v-for="(item, i) in data" :key="i" class="col-md-6">
          <GmapMap
            :center="{ lat: +item.lat, lng: +item.long }"
            :zoom="11"
            map-type-id="terrain"
            style="width: auto; height: 300px"
          >
            <GmapMarker
              :position="position"
              :clickable="false"
              :draggable="false"
              @click="center = position"
            />
          </GmapMap>
          <h3 class="text-center header-section">{{ item.name_translate }}</h3>

          <!-- <div class="row workdays">
            <div class="col-md-4">
              {{$t('branches.workdays')}}
            </div>
            <div class="col-md-8">
              {{item.work_days}}
            </div>
          </div> -->
          <div class="d-flex justify-content-center w-100">
            <div class="phone m-1 text-left col-md-6">
              <i class="fas fa-phone-alt m-1"></i>
              {{ item.phone }}
            </div>
            <div class="card row-md-4">
              <div class="col Times">
                <div class="col-md-12">
                  {{ $t("branches.timesofWork") }}
                </div>
                <div class="col-md-12">
                  {{ item.time_from }}
                </div>
                <div class="col-md-12">
                  {{ item.time_to }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h4>{{ $t("branches.noBranchesYet") }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from "../../services/ServiceFactory";
const BranchesService = ServiceFactory.get("Branches");
export default {
  name: "Branches",
  data: () => ({
    data: [],
    position: { lat: 0, lng: 0 },
  }),
  created() {
    this.fetchAllItems();
  },
  methods: {
    async fetchAllItems() {
      this.dataLoading = true;
      const items = await BranchesService.getAllBranchess();
      this.data = items.branches;
      this.data.forEach((item) => {
        this.position.lat = +item.lat;
        this.position.lng = +item.long;
      });
      console.log("this.position", this.position);
      this.dataLoading = false;
    },
  },
};
</script>
