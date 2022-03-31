import axios from 'axios'
import { API_URL } from '../../config/index'
const Login = {
    state: {
        isLoading: false,
        loginErrorMessage: null,
        loginSuccessful: false,
        userData: {},
        token: '',

    },
    mutations: {
        resetState(state) {
            state.isLoading = true
            state.loginErrorMessage = null
            state.loginSuccessful = false
        },
        // Logout
        logout(state) {
            localStorage.removeItem('token')
            state.token = ''
            this.$cookies.remove('token')
            this.$router.push('/login')
        },
        addTokenToState(state, token) {
            state.token = token
        },
        loginErrorMessage(state, error) {
            state.loginErrorMessage = error
        }
    },
    actions: {
        doLogin({ commit, state, dispatch }, loginData) {
            commit('resetState')
            const userData = {
                email: loginData.email,
                password: loginData.password,
            }

            axios.post(`${API_URL}/login`, userData)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token)
                        this.$cookies.set('token', response.data.token)
                        state.token = response.data.token
                        localStorage.setItem('userData', JSON.stringify(response.data.user))
                        this.$router.push(this.localePath('/profile'))
                    } else {
                        commit('loginErrorMessage', response.data.errors.email[0] || response.data.errors.password[0] || response.data.message)
                        state.isLoading = true
                    }
                })
                .catch(error => {
                    commit('loginErrorMessage', error.response.data.message || error.response.data.errors.email[0] || error.response.data.errors.password[0])
                    state.isLoading = true
                })
        },
    },
    getters: {},
}

export default Login