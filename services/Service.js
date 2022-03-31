import axios from 'axios'
import cookie from 'cookie'

if(process.browser === true) {
    axios.defaults.headers['locale'] = cookie.parse(document.cookie).i18n_redirected
}

// console.log(process)
export default axios.create({

})
