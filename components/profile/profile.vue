<template>
  <div class="profile-component container">
  <h2 class="text-center header-section">{{$t('profile.myAccount')}}</h2>
  <b-tabs content-class="mt-3" align="center">
    <b-tab :title="$t('profile.account')" active>
      <account />
    </b-tab>
    <b-tab :title="$t('profile.myOrder')">
      <myOrder />
    </b-tab>
  </b-tabs>
</div>
</template>
<script>
// import { ServiceFactory } from '../../services/ServiceFactory'
import account from './account.vue'
import myOrder from './myOrders.vue'

// const Service = ServiceFactory.get('profile')
export default {
  name: 'products',
  components: {
    account,
    myOrder,
  },
    data: () => ({
        // UserData: {},
    }),
    created() {
        // this.getUserData()
    },
    computed: {

    },
    methods: {
      // async getUserData() {
      //   const UserData = await Service.getUserData()
      //       if (UserData.data.status === true) {
      //           this.UserData = UserData.data.data
      //       } else {
      //           this.ErrorMessage = 'Something Error'
      //           // this.ErrorMessage = getGovernrate.message[0]
      //           setTimeout(() => {
      //               this.ErrorMessage = ''
      //             }, 1500)
      //       }
      // }
    }
}
</script>
