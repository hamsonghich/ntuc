<template>
  <div class="mobile-form-container d-flex flex-column align-items-center" @keyup.enter="_checkOTP">
    <div v-if="step == 1" class="d-flex align-items-center justify-content-between">
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
              {{ $t('Email.email') }}
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
              {{ $t('Email.unable_dectect') }}
            </div>
            <div class="input-email-group">
              <b-form-group class="mt--20 mb-0">
                <div
                  class="
                    input-name
                    d-flex
                    align-items-center
                    text-16
                    font-400 font__regular
                    text-black
                    line-height-15
                    mb-1
                  "
                >
                  {{ $t('Email.title') }}
                </div>
                <b-form-input
                  class="form-input-email"
                  v-model="$v.formEmail.email.$model"
                  :state="validateStateEmail('email')"
                />
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
              @click="_checkOTP()"
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
    <OTP
      v-if="step == 2"
      @_goBack="_goBack"
      :forms="forms"
      :contryMobi="contryMobi"
      :email="formEmail.email"
    />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import OTP from '../OTP/index.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  mixins: [validationMixin],
  components: {
    OTP
  },
  props: ['forms'],
  data() {
    return {
      step: 1,
      contryMobi: '',
      formEmail: {
        email: ''
      }
    };
  },
  validations: {
    formEmail: {
      email: { required, email }
    }
  },
  computed: {
    ...mapGetters('login', ['alldataClaims', 'check', 'firsttimelogin', 'countryCode'])
  },
  methods: {
    ...mapActions('login', ['fetchdataClaim', 'fetchCountryCode', 'handleCheckSubmit']),
    submitFormEmail() {
      this.$v.formEmail.$touch();
      if (this.$v.formEmail.$anyError) {
        return;
      }
    },
    _goBack() {
      this.$emit('backToSelect');
    },
    validateStateEmail(fieldName) {
      const { $dirty, $error } = this.$v.formEmail[fieldName];
      return $dirty ? !$error : null;
    },
    async _checkOTP() {
      this.$v.formEmail.$touch();
      if (this.$v.formEmail.$anyError) {
        return;
      }
      localStorage.setItem('countrycode', this.contryMobi);
      localStorage.setItem('emailaddress', this.formEmail.email);
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.login',
        a1: {
          userid: this.forms.username,
          password: this.forms.password,
          countrycode: this.contryMobi,
          mobilenumber: '',
          emailaddress: this.formEmail.email,
          token: '',
          src: 'webpage'
        }
      });
      if ((this.countryCode && this.formEmail.email) != '') {
        this.step = 2;
        this.handleCheckSubmit(true);
      } else {
        this.$v.formEmail.$touch();
        this.step = 1;
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