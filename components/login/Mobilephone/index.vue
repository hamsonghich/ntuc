<template>
  <div class="mobile-form-container d-flex flex-column align-items-center" @keyup.enter="_getOTP">
    <div v-if="step == 1" class="d-flex align-items-center justify-content-between">
      <div class="mobile-form bg-white">
        <div class="fpg-logo">
          <img src="@/assets/logo/income-logo.png" alt="logo-fpg" />
        </div>
        <div class="mobilephone-required">
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
              {{ $t('Mobilephone.phone_number') }}
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
              {{ $t('Mobilephone.unable_dectect') }}
            </div>
          </div>
          <div class="input-mobile-group">
            <b-form-group class="mb-0">
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
                {{ $t('Mobilephone.country_code') }}
              </div>
              <Autocomplete
                :value="contryMobi"
                :valueAttribute="'id'"
                :displayAttribute="'name'"
                :itemText="'name'"
                :itemValue="'id'"
                @changeValue="value => (this.contryMobi = value)"
                class="set-width"
                :optionDropdowns="countryCodemobi"
                :filter="true"
              />
            </b-form-group>
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
                {{ $t('Mobilephone.mobile_phone') }}
              </div>
              <b-form-input
                class="form-input"
                v-model="$v.formMobile.phoneNumber.$model"
                :state="validateState('phoneNumber')"
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
            "
            @click="_getOTP()"
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
              bg-NTUC-3
              border-0
              text-white text-14
            "
            @click="_goBack()"
          >
            {{ $t('btn.back') }}
          </button>
        </div>
      </div>
    </div>
    <OTP
      v-else-if="step == 2"
      :forms="forms"
      @_goBack="_goBack"
      :contryMobi="contryMobi"
      :phoneNumber="formMobile.phoneNumber"
    />
    <Modal
      :modalShowBenefit="modalShowBenefit"
      @handleModalShow="handleModalShowBenefit"
      v-if="modalShowBenefit"
    />
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import OTP from '../OTP/index.vue';
import Autocomplete from '../../../components/autocomplete/';
import { mapGetters, mapActions } from 'vuex';
import Modal from '../Modal/index.vue';
export default {
  mixins: [validationMixin],
  components: {
    OTP,
    Autocomplete,
    Modal
  },
  props: ['forms'],
  data() {
    return {
      step: 1,
      countryCodemobi: [],
      contryMobi: '',
      formMobile: {
        phoneNumber: ''
      },
      modalShowBenefit: false
    };
  },
  validations: {
    formMobile: {
      phoneNumber: { required, minLength: minLength(8) }
    }
  },
  computed: {
    ...mapGetters('login', ['alldataClaims', 'check', 'firsttimelogin', 'countryCode'])
  },
  created() {
    this.countryCodeoption();
  },
  methods: {
    ...mapActions('login', ['fetchdataClaim', 'fetchCountryCode', 'handleCheckSubmit']),
    handleModalShowBenefit(value) {
      this.modalShowBenefit = value;
    },
    validateState(fieldName) {
      const { $dirty, $error } = this.$v.formMobile[fieldName];
      return $dirty ? !$error : null;
    },
    _goBack() {
      this.$emit('backToSelect');
    },
    async _getOTP() {
      this.$v.formMobile.$touch();
      if (this.$v.formMobile.$anyError) {
        return;
      }
      localStorage.setItem('countrycode', this.contryMobi);
      localStorage.setItem('mobilenumber', this.formMobile.phoneNumber);
      this.handleModalShowBenefit(true);
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.login',
        a1: {
          userid: this.forms.username,
          password: this.forms.password,
          countrycode: this.contryMobi,
          mobilenumber: this.formMobile.phoneNumber,
          emailaddress: '',
          token: '',
          src: 'webpage'
        }
      });
      this.handleModalShowBenefit(false);
      if ((this.countryCode && this.formMobile.phoneNumber) != '') {
        this.step = 2;
        this.handleCheckSubmit(true);
      } else {
        this.$v.formMobile.$touch();
        this.step = 1;
      }
    },
    async countryCodeoption() {
      await this.fetchCountryCode({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.List.Select',
        a1: {
          ListGroup: '12'
        }
      });
      this.countryCodemobi = this.countryCode.map(el => {
        return {
          id: el[0],
          name: el[1]
        };
      });
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