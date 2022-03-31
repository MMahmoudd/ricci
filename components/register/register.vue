<template>
  <div class="register-component">
    <div class="row">
      <div class="col-md-6 m-0 p-0">
        <div class="img">
          <img src="../../assets/images/login.png" alt="login image">
        </div>
      </div>
      <div class="col-md-6 m-0 p-0">
        <div class="login-form">
            <b-form @submit.prevent="registerSubmit()" v-if="show">
              <h2 class="header-section text-center">{{$t('register.register')}}</h2>
              <b-form-group
                id="input-group-3"
                label-for="input-3"
                :label="$t('register.nameLabel')"
                class="mt-5 text-left"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.name"
                  type="text"
                  :placeholder="$t('register.namePlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>
                <b-form-group
                id="input-group-4"
                label-for="input-4"
                :label="$t('register.phoneLabel')"
                class="text-left"
              >
                <b-form-input
                  id="input-4"
                  v-model="form.phone"
                  type="tel"
                  :placeholder="$t('register.phonePlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                class="text-left"
                label="Email"
                :description="$t('register.emailDescription')"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  :placeholder="$t('register.emailPlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group class="text-left" id="input-group-2"
              :label="$t('register.passwordLabel')" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  :placeholder="$t('register.passwordPlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>
              <b-button type="submit">{{$t('register.register')}}</b-button>
              <div class="mt-1">
              <b-alert
                v-if="registerErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ registerErrorMessage }} <nuxt-link :to="localePath('/')"> {{$t('global.goToHome')}} </nuxt-link>
            </b-alert>
            <b-alert
              v-if="registerSuccessMessage"
              show
              class="text-center alert"
              dismissible
              variant="success"
            >
              {{registerSuccessMessage}}
            </b-alert>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const RegisterService = ServiceFactory.get('Register')
  export default {
    data() {
      return {
        form: {
          name: '',
          phone: '',
          email: '',
          password: '',
        },
        registerErrorMessage: '',
        registerSuccessMessage: '',
        show: true,
        dismissSecs: 5,
        dismissCountDown: 0
      }
    },
    computed: {
    products() {
      return this.$store.state.products;
    },
    },
    methods: {
      async registerSubmit () {
        const register = await RegisterService.registerUser(this.form)
        if (register.status === 200) {
          this.registerSuccessMessage = 'Welcome ' + register.data.data.name
          this.$store.commit('addTokenToState', register.data.token)
          if (this.products.length > 0) {
            setTimeout(() => {
              this.$router.push(this.localePath('/cart'))
            }, 1500)
          } else {
            setTimeout(() => {
              this.$router.push(this.localePath('/'))
            }, 1500)
          }
        } else {
          this.registerErrorMessage = register.email || register.phone || register.name || register.password
        }
    },
    }
  }
</script>

