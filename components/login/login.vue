<template>
  <div class="login-component">
    <div class="row">
      <div class="col-md-6 m-0 p-0">
        <div class="img">
          <img src="../../assets/images/login.png" alt="login image">
        </div>
      </div>
      <div class="col-md-6 m-0 p-0">
        <div class="login-form">
            <b-form @submit.prevent="onSubmit()" v-if="show">
              <h2 class="header-section text-center">{{$t('login.login')}}</h2>
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                class="mt-5 text-left"
                :description="$t('login.emailDescription')"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  :placeholder="$t('login.emailPlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  :placeholder="$t('login.passwordPlaceholder')"
                  required
                ></b-form-input>
              </b-form-group>
              <b-button type="submit">{{$t('login.login')}}</b-button>
              <div class="register">
                <nuxt-link :to="localePath('/register')">{{$t('register.createNew')}}</nuxt-link>
              </div>
              <div class="mt-5">
              <b-alert
                v-if="loginErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ loginErrorMessage }} <nuxt-link :to="localePath('/')"> {{$t('global.goToHome')}} </nuxt-link>
            </b-alert>
            </div>
            </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show: true,
        dismissSecs: 5,
        dismissCountDown: 0
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.login.isLoading,
        loginErrorMessage: state => state.login.loginErrorMessage,
        loginSuccessful: state => state.login.loggingIn,
      }),
      },
    methods: {
      ...mapActions([
        'doLogin',
      ]),
      onSubmit(event) {
        this.$store.dispatch('doLogin',{
          email: this.form.email.split(" ").join(""),
          password: this.form.password,
        })
      },
    }
  }
</script>
