<template>
  <div class="mobile-form-container d-flex flex-column align-items-center" @keyup.enter="_checkOTP">
    <div class="form-step-otp d-flex align-items-center justify-content-between">
      <div class="mobile-form bg-white">
        <div class="fpg-logo">
          <img src="@/assets/logo/income-logo.png" alt="logo-fpg" />
        </div>
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
            {{ $t('OTP.otp') }}
          </div>
          <div
            class="unable-detected-text d-flex font-400 font__regular text-16 mt--10 line-height-14"
          >
            <span v-if="successOTP">{{ $t('OTP.send') }}{{ convert(check.value) }}</span>
          </div>
          <div class="otp_expired text-center font-400 font__regular text-15 mt--10 line-height-14">
            <span class="" v-if="failOTP">{{ convert(check.value) }}</span>
          </div>
          <div class="userInput">
            <v-otp-input
              class="d-flex justify-content-between text-center text-20 font__regular bg-white"
              input-classes="otp-code-input-login text-center border-0"
              separator=""
              :num-inputs="6"
              :should-auto-focus="true"
              :is-input-num="true"
              :v-model="OTP"
              @on-complete="handleOnComplete"
            />
          </div>
          <div
            class="
              otp-expire
              d-flex
              align-items-center
              justify-content-center
              text-center text-16 text-NTUC-1
              font__regular
              line-height-15
            "
            v-if="timeOtp"
          >
            OTP will expire in {{ count }}s
          </div>
          <h5
            class="
              unable-detected-text
              d-flex
              align-items-center
              font-400 font__regular
              text-16
              mt--10
              text-center
              line-height-15
              justify-content-center
            "
            v-if="resendOTP"
          >
            Please click
            <span class="text-NTUC-1 cursor_pointer px-1" @click="_resendOTP"> here </span> to
            resend OTP code
          </h5>
        </div>
        <b-button
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
          :disabled="checkSubmit"
          @click="_checkOTP"
        >
          {{ $t('btn.submit') }}
        </b-button>
        <b-button
          v-if="timeOtp === false"
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
          "
          @click="_goBack"
        >
          {{ $t('btn.back') }}
        </b-button>
      </div>
    </div>
    <Modal
      :modalShowBenefit="modalShowBenefit"
      @handleModalShow="handleModalShowBenefit"
      v-if="modalShowBenefit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import Modal from '../Modal/index.vue';
export default {
  components: {
    Modal
  },
  mixins: [validationMixin],
  data() {
    return {
      OTP: '',
      count: 120,
      timeOtp: true,
      myToid: null,
      resendOTP: true,
      successOTP: true,
      failOTP: false,
      modalShowBenefit: false,
      checkbenefitsSaved: ''
    };
  },
  props: ['forms', 'contryMobi', 'phoneNumber', 'email', 'currenStep'],
  created() {
    this.countDown();
  },
  computed: {
    ...mapGetters('login', [
      'alldataClaims',
      'check',
      'quickAccessAuthOtp',
      'checkQuickAccess',
      'firsttimelogin',
      'isEmployeeVerified',
      'benefitEnroll',
      'benefitsSaved',
      'checkSubmit'
    ]),
    ...mapGetters('firstTimeLogin', ['showFirst'])
  },
  methods: {
    ...mapActions('login', [
      'fetchdataClaim',
      'fetchQuickAccessAuthOTP',
      'fetchGetRelatedLoginInfo',
      'fetchEmpVerification',
      'fetchBenefit',
      'fetchBenefitSaved',
      'handleCheckSubmit'
    ]),
    ...mapActions('benefit', ['getFlexAllocationInfo']),
    ...mapActions('firstTimeLogin', ['handleSetShowFirst', 'changeCurrentStep']),
    handleModalShowBenefit(value) {
      this.modalShowBenefit = value;
    },
    _goBack() { 
      this.$emit('backToSelect');
    },
    countDown() {
      this.timeOtp = true;
      if (this.count > 0) {
        clearTimeout(this.myToid);
        this.myToid = setTimeout(() => {
          this.count--;
          this.countDown();
        }, 1000);
        this.resendOTP = false;
      } else {
        this.timeOtp = false;
        this.successOTP = false;
        this.resendOTP = true;
      }
    },
    handleOnComplete(value) {
      this.handleCheckSubmit(false);
      this.OTP = value;
    },
    async _checkOTP() {
      let timer = setTimeout(this.handleModalShowBenefit(true), 2000);
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.login',
        a1: {
          userid: this.forms.username,
          password: this.forms.password,
          countrycode: this.contryMobi ? this.contryMobi : '',
          mobilenumber: this.phoneNumber ? this.phoneNumber : '',
          emailaddress: this.email ? this.email : '',
          token: this.OTP,
          src: 'webpage'
        }
      });
      clearTimeout(timer);
      this.handleModalShowBenefit(false);

      this.successOTP = false;
      this.failOTP = true;
      if (this.check.dt === 'default' && this.OTP.length) {
        this.failOTP = false;
        localStorage.setItem('username', this.forms.username);
        await this.fetchGetRelatedLoginInfo({
          invoke: 'System.execute',
          argc: '2',
          a0: 'User.getRelatedLoginInfo',
          a1: {
            empid: localStorage.getItem('userid')
          }
        });
        await this.fetchEmpVerification({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Employee.VerificationPrompt'
        });
        await this.fetchBenefit({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Flex.WebGetCountDownBarPeriod',
          a1: {
            employee: localStorage.getItem('userid')
          }
        });
        let displayFlag = JSON.parse(this.benefitEnroll.value).displayflag;
        let flexperiodid = JSON.parse(this.benefitEnroll.value).flexperiodid;
        await this.fetchBenefitSaved({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Flex.WebLoadSave',
          a1: {
            employee: localStorage.getItem('userid'),
            flexperiod: flexperiodid
          }
        });
        this.checkbenefitsSaved = JSON.parse(this.benefitsSaved.data.properties);
        let consentagreementflag = this.firsttimelogin.consentagreement.consentagreementflag;
        let isPasswordChanged = this.firsttimelogin.isPasswordChanged;
        let isUsernameChanged = this.firsttimelogin.isUsernameChanged;
        this.modalShowBenefit = true;
        let isEmployeeVerified =
          localStorage.getItem('isemployeeverified') === 'true' ? true : false;
        let isFirstTime = localStorage.getItem('first_time_login') === 'true' ? true : false;

        if (consentagreementflag) {
          if (!isPasswordChanged && isFirstTime) {
            this.goToEmployee(2, true);
          } else if (!isPasswordChanged && !isFirstTime) {
            this.goToEmployee(2, true);
          } else if (isPasswordChanged && !isUsernameChanged && isFirstTime) {
            this.goToEmployee(3, true);
          } else if (isPasswordChanged && !isFirstTime) {
            if (isEmployeeVerified) {
              this.handleCheckCaseLogin();
            } else {
              setTimeout(() => {
                this.$router.push({ name: 'first-time-login-employee-verification' });
                this.handleSetShowFirst(false);
              }, 3000);
            }
          }
        } else {
          setTimeout(() => {
            this.modalShowBenefit = false;
            this.changeCurrentStep(1);
            this.handleSetShowFirst(true);
            this.$router.push({ name: 'first-time-login-employee-verification' });
          }, 3000);
        }
      }
    },
    goToEmployee(tab, show) {
      setTimeout(() => {
        this.changeCurrentStep(tab);
        this.handleSetShowFirst(show);
        this.$router.push({ name: 'first-time-login-employee-verification' });
      }, 3000);
    },
    async handleCheckCaseLogin() {
      const getEnrolFlag = await this.getFlexAllocationInfo({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Flex.GetFlexAllocationInfo',
        a1: {
          employee: localStorage.getItem('empid')
        }
      });
      let checkEnrol = getEnrolFlag.data.properties.enrolflag === 0 ? true : false;

      //firstEnrollFlag ---> true, user can enrol --> go to benefits page
      //firstEnrollFlag ---> false, user cannot enrol  --> go to dashboard
      //firstEnrollflag --> check that this is User's first time to enrol in benefits.
      //checkEnrol -- > 1, timer not finished, user can enrol --> go to benefits page
      //checkEnrol ---> 0, timer is finished, user cannot enrol .. go to dashboard.
      //checkEnrol ---> check that benefit enrolment period is still open.

      let firstEnrollFlag = localStorage.getItem('firstEnrollFlag') === 'true' ? true : false;
      if (checkEnrol) {
        setTimeout(() => {
          this.modalShowBenefit = false;
          this.$router.push({ name: 'first-time-login-dashboard' });
        }, 3000);
      } else {
        if (!firstEnrollFlag) {
          this.$router.push({ name: 'first-time-login-dashboard' });
        } else if (
          firstEnrollFlag ||
          this.checkbenefitsSaved == null ||
          this.checkbenefitsSaved.listOptval.length < 1 ||
          this.checkbenefitsSaved.listCheckBox.length < 1 ||
          this.checkbenefitsSaved.listCheckBoxSub[0].length < 1
        ) {
          setTimeout(() => {
            this.modalShowBenefit = false;
            this.$router.push({ name: 'first-time-login-benefit' });
          }, 3000);
        } else {
          setTimeout(() => {
            this.modalShowBenefit = false;
            this.$router.push({ name: 'first-time-login-benefit' });
          }, 3000);
        }
      }
    },
    async _resendOTP() {
      this.handleCheckSubmit(true);
      this.timeOtp = true;
      this.successOTP = true;
      this.resendOTP = false;
      let timer = setTimeout(this.handleModalShowBenefit(true), 2000);
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.login',
        a1: {
          userid: this.forms.username,
          password: this.forms.password,
          countrycode: this.contryMobi ? this.contryMobi : '',
          mobilenumber: this.phoneNumber ? this.phoneNumber : '',
          emailaddress: this.email ? this.email : '',
          token: this.OTP,
          src: 'webpage'
        }
      });
      clearTimeout(timer);
      this.handleModalShowBenefit(false);
      this.count = 120;
      this.countDown();
    },
    convert(str) {
      if (str.includes('been send to your email')) {
        return String(str).replaceAll(
          'System.execute$2:E_TOKENREQUIRED:Your OTP has been send to your email,',
          ''
        );
      } else if (str.includes('to your mobile via SMS') && str.includes('E_TOKENREQUIRED')) {
        return String(str).replaceAll(
          'System.execute$2:E_TOKENREQUIRED:Your OTP has been sent to',
          ''
        );
      } else if (str.includes('E_TOKENINVALID')) {
        return String(str).replaceAll('System.execute$2:E_TOKENINVALID:', '');
      } else if (str.includes('E_TOKENEXPIRED')) {
        return String(str).replaceAll('System.execute$2:E_TOKENEXPIRED:', '');
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