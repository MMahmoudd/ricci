import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
    registerUser(data) {
        return Service.post(`${resource}/register`, {
                ...data
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('response', response)
                    localStorage.setItem('token', response.data.token)
                    // this.$cookies.set('token', response.data.token)
                    localStorage.setItem('userData', JSON.stringify(response.data.data))
                    return response
                }
            })
            .catch(error => {
                return error.response.data.errors
            })
    },
}
