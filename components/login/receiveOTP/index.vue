<template>
  <div class="mobile-form-container d-flex flex-column align-items-center" @keyup.enter="_checkSelect">
    <div v-if="step == 1" class="form-step-one d-flex align-items-center justify-content-between">
      <div class="mobile-form bg-white">
        <div class="fpg-logo">
          <img src="@/assets/logo/income-logo.png" alt="logo-fpg" />
        </div>
        <div class="email-required">
          <div class="text-container">
            <div
              class="
                phone-text
                d-flex
                align-items-center
                font-400 font__regular
                text-23
                line-height-14
              "
            >
              {{$t('login.Email_or_SMS')}}
            </div>
            <div
              class="
                unable-detected-text
                d-flex
                align-items-center
                font-400 font__regular
                text-15
                mt--10
                line-height-14
              "
            >
              {{$t('login.tell_us')}}
            </div>
            <div class="radio_button_box">
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio class="mb-3" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Email</b-form-radio>
                <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">SMS</b-form-radio>
              </b-form-group>
            </div>
            <button
              class="
                btn__submit
                d-flex
                align-items-center
                justify-content-center
                flex-row
                bg-NTUC-3
                border-0
                text-white text-14
                font-500
              "
              @click="_checkSelect()"
            >
              {{ $t('btn.submit') }}
            </button>
            <button
              class="
                mt--10
                btn__back
                d-flex
                align-items-center
                justify-content-center
                flex-row
                bg-NTUC-2
                border-0
                text-white text-14
                font-500
              "
              @click="_goBack"
            >
              {{ $t('btn.back') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Mobilephone :forms="forms" @backToSelect="backToSelect" v-if="step == 2" />
    <Email :forms="forms" @backToSelect="backToSelect" v-if="step == 3" />
    <OTP :forms="forms" @backToSelect="backToSelect" v-if="step == 4" />
  </div>
</template>
  
<script>
import { validationMixin } from 'vuelidate';
import OTP from '../OTP/index.vue';
import Mobilephone from '../Mobilephone/index.vue';
import Email from '../Email/index.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  mixins: [validationMixin],
  components: {
    OTP,
    Mobilephone,
    Email
  },
  props: ['forms'],
  data() {
    return {
      step: 1,
      selected: '',
      contryMobi: '',
      formEmail: {
        email: ''
      }
    };
  },
  computed: {
    ...mapGetters('login', ['alldataClaims', 'check', 'firsttimelogin', 'countryCode'])
  },
  methods: {
    ...mapActions('login', ['fetchdataClaim', 'fetchCountryCode', 'handleCheckSubmit']),
    _goBack() {
      this.$emit('backStep');
    },
    backToSelect() {
      this.step = 1
    },
    async _checkSelect() {
      if(!this.selected) return
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.login',
        a1: {
          userid: this.forms.username,
          password: this.forms.password,
          countrycode: '',
          mobilenumber: '',
          emailaddress: '',
          token: '',
          src: 'webpage'
        }
      });
      if(this.check.value.includes('E_MOBILEREQUIRED')) {
        this.step += 1
      } else if(this.check.value.includes('E_EMAILREQUIRED')) {
        this.step += 2
      }
      else {
        this.step += 3
      }
    }
  }
};
</script>


<style scoped>
@import '@/assets/css/login/OTP/otp.css';
</style>

<style>
@import '@/assets/css/style.css';
</style>