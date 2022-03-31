<template>
  <div class="contact-us-component">
    <h2 class="header-section">{{$t('contactUs.contactUs')}}</h2>
    <div class="container text-left">
      <p class="header-section font-weight-bold">{{$t('contactUs.getInTouch')}}</p>
      <p class="content">
        {{$t('contactUs.phone')}}: {{info.phone}}
        <br>
        {{$t('contactUs.address')}}: {{info.address}}
      </p>
      <div class="contact-form">
            <b-form @submit.prevent="onSubmit()" v-if="show">
            <div class="row">
              <div class="col-md-4">
                <b-form-group
                  id="input-group-1"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    :placeholder="$t('contactUs.namePlaceholder')"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group id="input-group-2" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    type="email"
                    :placeholder="$t('contactUs.emailPlaceholder')"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group id="input-group-4" label-for="input-4">
                  <b-form-input
                    id="input-4"
                    v-model="form.phone"
                    :placeholder="$t('contactUs.phone')"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group id="input-group-3" label-for="textarea">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.message"
                    :placeholder="$t('contactUs.messagePlaceholder')"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="submit-button text-right mt-3">
              <b-button type="submit">{{$t('contactUs.send')}}</b-button>
            </div>
              <div class="mt-5">
              <b-alert
                v-if="registerErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ registerErrorMessage }}
            </b-alert>
            <b-alert
                v-if="registerSuccessMessage"
                show
                class="text-center alert"
                dismissible
                variant="success"
              >
                {{ registerSuccessMessage }}
            </b-alert>
            </div>
            </b-form>
        </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
const commonService = ServiceFactory.get('common')

  export default {
    data() {
      return {
        info : {
          phone: '',
          address : ''
        },
        form: {
          email: '',
          name: '',
          message: '',
          phone: ''
        },
        show: true,
        dismissSecs: 5,
        dismissCountDown: 0,
        registerSuccessMessage: '',
        registerErrorMessage: ''

      }
    },
    created () {
      this.getPhone()
    },
    methods: {
      async getPhone () {
          try {
            const {data} = await commonService.getSettings()
            const {settings, status} = data
            const {phone1 : phone, address} = settings
            this.info = {phone, address}
          }catch(err) {
            console.log(err)
          }
},
     async onSubmit() {
        const sendMassage = await Service.sendMassage(this.form)
        if (sendMassage.status === 200) {
          this.registerSuccessMessage = 'Message Sent Successfully'
          setTimeout(() => {
              this.form = {
                email: '',
                name: '',
                message: '',
                phone: ''
              }
              this.registerSuccessMessage = ''
            }, 1500)
        } else {
          this.registerErrorMessage = sendMassage.message[0]
          setTimeout(() => {
              this.registerErrorMessage = ''
            }, 1500)
        }
      },
    }
  }
</script>
