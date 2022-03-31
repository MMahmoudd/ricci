<template>
  <div class="container">
    <div class="Ads">
      <a :href="ad.link" class="image" target="_blank" rel="noopener noreferrer">
        <img :src="ad.image" alt="image ad">
      </a>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
export default {
  name: 'ADs',
    data: () => ({
      ad: {},
    }),
    created() {
        this.getADS()
    },
    computed: {

    },
    methods: {
      async getADS() {
        const ads = await Service.getAds()
            if (ads.data.status === true) {
                this.ad = ads.data.ad
            } else {
                this.ErrorMessage = 'Something Error'
                // this.ErrorMessage = getGovernrate.message[0]
                setTimeout(() => {
                    this.ErrorMessage = ''
                  }, 1500)
            }
      },
    }
}
</script>
