<template>
  <div class="branches-component">
    <div class="container">
    <h2 class="text-center header-section">
          {{$t('branches.branches')}}
        </h2>
      <div v-if="data.length > 0" class="row details">
        <div v-for="(item, i) in data" :key="i" class="col-md-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6906.838927460915!2d31.1951871!3d30.0535087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584191608c2285%3A0x40efde2c88472e8e!2sMcDonald&#39;s%20Shehab%20-%20Mohandiseen!5e0!3m2!1sen!2seg!4v1641686947153!5m2!1sen!2seg" height="300" style="border:0; width:100%" allowfullscreen="true" loading="lazy"></iframe>
          <h3 class="text-center header-section">{{item.name_translate}}</h3>
          <div class="phone">
            <i class="fas fa-phone-alt"></i>
            {{item.phone}}
          </div>
          <div class="row workdays">
            <div class="col-md-4">
              {{$t('branches.workdays')}}
            </div>
            <div class="col-md-8">
              {{item.work_days}}
            </div>
          </div>
          <div class="row Times">
            <div class="col-md-4">
              {{$t('branches.timesofWork')}}
            </div>
            <div class="col-md-4">
              {{item.time_from}}
            </div>
            <div class="col-md-4">
              {{item.time_to}}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h4>{{$t('branches.noBranchesYet')}}</h4>
      </div>
  </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const BranchesService = ServiceFactory.get('Branches')
export default {
  name: 'Branches',
  data: () => ({
    data: [],
  }),
  created() {
    this.fetchAllItems()
  },
  methods: {
    async fetchAllItems () {
        this.dataLoading = true
        const items = await BranchesService.getAllBranchess()
        this.data = items.branches
        this.dataLoading = false
      },
  }
}
</script>
