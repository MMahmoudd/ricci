import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD3RExyVC8lg1Zb8kG-oIwt7m6WtivwB0g',
        libraries: 'places',
    },
})
