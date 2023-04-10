<template>
  <div class="bg_login_page">
    <div class="bg_content_main position-relative">
      <div class="img_right_login position-absolute" v-if="step == 1 || step == 2">
        <img class="h-100 w-100 img_step_one" :src="images" alt="img-login">
      </div>
      <div class="img_right_login position-absolute" v-else>
        <img class="h-100 w-100 img_step_one" src="@/assets/images/imgfamily.png" alt="img-login">
      </div>
      <div class="main_content d-flex justify-content-center">
        <div class="d-md-none d-flex justify-content-center message_login">
          <b-alert class="d-flex align-items-center" show dismissible>
            <b-icon icon="info-circle" />
            <div class="ml-2">
              <div class="font-500 text-20 title_alert_login">Info</div>
              <div class="text-12 content_alert_login">{{ messageAlert }}</div>
            </div>
          </b-alert>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div
            :class="{'alert_login_mobile': !isCounting ? true : false}"
            class="alert_login text-white text-center text-14" v-if="step == 1">
            <div class="alert_content" v-if="isCounting && step == 1">
              {{ this.convert(this.check.value) }}
            </div>
          </div>
          <div class="login-container d-flex flex-column justify-content-center align-items-center" v-if="step == 1">
            <div :class="isLocked || isCounting ? 'login__form--warn' : 'login__form'"
              class="justify-content-center bg-NTUC-7" @keyup.enter="handleLogin">
              <div class="fpg-logo d-flex justify-content-center mt--10">
                <img src="@/assets/logo/income-logo.png" alt="logo-fpg" />
              </div>
              <div class="amplified_noti d-flex align-items-center justify-content-center">
                <b-avatar class="navbar-avatar bg-NTUC-3">
                  <img src="@/assets/images/imgV.png" class="img_V" alt="logo-fpg" />
                </b-avatar>
                <div class="ml-2 text-NTUC-3 text-16 font-400">{{$t('login.Your_Benefits_amplified')}}</div>
              </div>
              <div class="noti_locked text-warn text-14 font-400" v-if="notiLocked">
                {{ this.convert(this.check.value) }} 
              </div>
              <div class="account-locked d-flex flex-column align-items-center text-center" v-if="isLocked">
                <div class="text-warn font__regular text-20 font-400">
                  {{ $t('login.account-locked.warn') }}
                </div>
                <div class="text-warn text-reason font__regular text-12 mt--5">
                  {{ $t('login.account-locked.reason') }}
                </div>
                <div class="text-warn text-solution font__regular text-12 mt--5">
                  {{ $t('login.account-locked.solution') }}
                </div>
              </div>
              <div :class="checkValidateFormInfo()">
                <b-form autocomplete="off" @submit.stop.prevent="handleLogin">
                  <b-form-group id="form-group-1" class="form-group-login d-flex align-items-center justify-content-center form-group"
                    label-for="input-field-username">
                    <div class="input-label line-height-15 text-black font-400 mb--5 font__regular text-16">
                      {{ $t('login.username') }}
                    </div>
                    <b-form-input autocomplete="off" class="input-field input-username" id="input-field-username"
                      name="input-field-username" v-model="$v.form.username.$model" :state="validateState('username')" />
                    <div v-if="showNameHint">
                      <em class="define-pass text-12">{{ $t('login.name_hint') }}</em>
                    </div>
                  </b-form-group>

                  <b-form-group id="form-group-2"
                    class="form-group-login d-flex align-items-center justify-content-center form-group position-relative"
                    label-for="input-field-password">
                    <div class="input-label line-height-15 text-black font-400 mb--5 font__regular text-16">
                      {{ $t('login.password') }}
                    </div>
                    <b-form-input autocomplete="off" class="input-field input-password" type="password"
                      id="input-field-password" name="input-field-password" v-model="$v.form.password.$model"
                      :state="validateState('password')" />
                    <span
                      :class="$v.form.password.$anyError
                        ? 'icon-formfail-login'
                        : ''"
                      class="position-absolute icon-eye-pass">
                      <b-icon @click="toggleShowPassword" v-if="form.showPassword" for="showPassword" id="showPassword"
                        class="cursor-pointer" :class="checkValidateIconEye()" icon="eye" />
                      <b-icon @click="toggleShowPassword" v-else class="cursor-pointer" :class="checkValidateIconEye()"
                        icon="eye-slash" />
                    </span>
                    <div v-if="showPassHint">
                      <em class="define-pass text-12">{{ $t('login.pass_hint') }}</em>
                    </div>
                    <div v-if="showPassBlank">
                      <em class="define-pass text-12">{{ $t('login.pass_blank') }}</em>
                    </div>
                  </b-form-group>
                </b-form>
                <div class="forget-password mt--15">
                  <a class="
                    line-height-15
                    font__regular
                    text-16 text-NTUC-6 text-decoration-none
                    cursor_pointer
                    font-400
                  " @click="clickForgot">
                    {{ $t('login.forgetPage') }}
                  </a>
                </div>
                <b-button class="
                  btn-login
                  border-0
                  bg-NTUC-3
                  custom-text
                  font-500 font__regular
                  text-14
                  d-flex
                  align-items-center
                  justify-content-center
                " @click="handleLogin">
                  {{ $t('btn.signin') }}
                </b-button>
                <div class="
                  help-container
                  text-NTUC2
                  font-400 font__regular
                  d-flex
                  align-items-start
                  flex-column
                ">
                  <div class="need-help text-16 text-NTUC-2">{{ $t('login.help') }}</div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="help-contact technical-help text-13 mt-1 text-NTUC-2">
                        {{ $t('login.Technical_Issues') }}
                      </div>
                    </div>
                    <div class="ml-3 technical_mail">
                      <div class="mt-1 text-13 mail_support">
                        <a :href="`mailto: TechSupport@BixFlexi.sg`" class="text-NTUC-3 cursor_pointer">{{ $t('login.technical_mail') }}</a>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="
                        help-contact
                        technical-help
                        text-13
                        mt-1
                        align-items-flex-start
                        text-NTUC-2
                      ">
                        {{ $t('login.All_other_matters') }}
                      </div>
                    </div>
                    <div class="ml-3 other_mail">
                      <div class="mt-1 text-13 mail_support">
                        <a :href="`mailto: BIX@income.com.sg`" class="text-NTUC-3 cursor_pointer">{{ $t('login.other-mail') }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ForgotPass @backStep="backStep" v-if="step == 2" />
          <ReceiveOTP :forms="form" @backStep="backStep" v-if="step == 3" />
        </div>
        <div class="d-flex justify-content-end info_content_right">
          <div class="content-right" v-if="step == 1 || step == 2">
            <div class="detail_content_right">
              <div class="text-NTUC-9 font-400 text-48 text_quote">{{ quoteShow }}</div>
              <div class="font-400 text-32 text-NTUC-6">{{$t('login.We_are_with_you')}}</div>
              <div class="d-flex">
                <img src="@/assets/images/imgHeart.png" alt="img_login" class="" />
                <div class="ml-3">
                  <div class="text-NTUC-9 font-500 text-20">{{$t('login.NTUC')}}</div>
                  <div class="text-NTUC-9 font-500 text-16">{{ insuranceShow }}</div>
                  <div class="text-NTUC-9 font-400 text-14">{{$t('login.Find_out')}} <span class="text-NTUC-3 font-400 text-14">{{$t('login.more')}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :isLoading="isLoading" @handleModalShow="handleModalShowBenefit" v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import Mobilephone from '@/components/login/Mobilephone/index.vue';
import Email from '@/components/login/Email/index.vue';
import OTP from '@/components/login/OTP/index.vue';
import Modal from '@/components/modal/loading.vue';
import ForgotPass from '@/components/login/forgotPassWord/index.vue'
import ReceiveOTP from '@/components/login/receiveOTP/index.vue'
import { postAxios } from '@/services/callApi';
import AlertSuccess from '~/components/alertSuccess/index.vue';
export default {
  name: 'login',
  layout: 'login',
  components: {
    Mobilephone,
    Email,
    OTP,
    Modal,
    AlertSuccess,
    ForgotPass,
    ReceiveOTP
  },
  mixins: [validationMixin],
  data() {
    return {
      step: 1,
      emailRequired: false,
      mobileRequired: false,
      isLocked: false,
      isCounting: false,
      checkfogot: false,
      notiLocked: false,
      isLoading: false,
      quoteShow: '',
      insuranceShow: '',
      images: '',
      quoteData: [
        {quote: 'Your first competition', insurance: 'Personal Accident Insurance', img: require('@/assets/images/imgaction.png')},
        {quote: 'Your first trip', insurance: 'Travel Insurance', img: require('@/assets/images/imgtrip.png')},
        {quote: 'Your first car', insurance: 'Driver’s Insurance', img: require('@/assets/images/imgcar.png')},
        {quote: 'Your first home', insurance: 'Enhanced Home Insurance', img: require('@/assets/images/imghome.png')}
      ],
      form: {
        username: '',
        password: '',
        showPassword: false
      },
      checkbenefitsSaved: '',
      brokerMail: '',
      showPassHint: false,
      showNameHint: false,
      showPassBlank: false,
      messageAlert: ''
    };
  },
  validations: {
    form: {
      username: { required },
      password: { required, minLength: minLength(8) }
    }
  },
  computed: {
    ...mapGetters('login', [
      'alldataClaims',
      'check',
      'quickAccessAuthOtp',
      'checkQuickAccess',
      'checkBroker',
      'firsttimelogin',
      'isEmployeeVerified',
      'benefitEnroll',
      'benefitsSaved'
    ]),
    ...mapGetters('firstTimeLogin', ['showFirst']),
    ...mapGetters('alert', ['alertConfig'])
  },
  created() {
    this.getBroker();
    this.getQuotes();
    this.getMessage();
  },
  mounted() {
    if (!!this.$route.query.ticket) {
      if (!!this.$route.query.aid) {
        localStorage.setItem('sx.aid', this.$route.query.aid);
      }
      this.onSSOLink();
    }
  },
  methods: {
    ...mapActions('login', [
      'fetchdataClaim',
      'fetchQuickAccessAuthOTP',
      'fetchBroker',
      'fetchGetRelatedLoginInfo',
      'fetchEmpVerification',
      'fetchBenefit',
      'fetchBenefitSaved'
    ]),
    ...mapActions('benefit', ['getFlexAllocationInfo']),
    ...mapActions('firstTimeLogin', ['handleSetShowFirst', 'changeCurrentStep']),
    ...mapActions('alert', ['_changeAlertConfig']),
    handleModalShowBenefit(value) {
      this.isLoading = value;
    },
    _handleCloseAlert(){
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    },
    backStep(){
      this.step = 1
    },
    goBackToLogin() {
      this.step = 1;
      if (this.mobileRequired) {
        this.mobileRequired = false;
      }
      if (this.emailRequired) {
        this.emailRequired = false;
      }
      localStorage.clear();
    },
    goBack() {
      this.step = 1;
      this.form.username = '';
      this.form.password = '';
    },
    clickForgot() {
      this.step += 1;
    },
    toggleShowPassword() {
      var show = document.getElementById('input-field-password');
      this.form.showPassword = !this.form.showPassword;
      if (!this.form.showPassword) {
        show.type = 'password';
      } else {
        show.type = 'text';
      }
    },
    getQuotes(){
      this.quoteShow = this.quoteData[0].quote
      this.insuranceShow = this.quoteData[0].insurance
      this.images = this.quoteData[0].img
      let i = 1
      setInterval(() => {
        this.quoteShow = this.quoteData[i].quote
        this.insuranceShow = this.quoteData[i].insurance
        this.images = this.quoteData[i].img
        i++
        if(i > this.quoteData.length - 1){
          i = 0
        }
      },4000)
    },
    async getMessage(){
      try{
        const response = await postAxios({
          invoke: "System.execute",
          argc: "2",
          a0: "Leave.getMessageList",
          a1: {
            OrderBy: "StartDate"
          }
        })
        if(response.data.data[0].dt == 'rs') {
          this.messageAlert = response.data.data[0].rows[0][3]
        }
      } catch(e){}
    },
    async onSSOLink() {
      await this.fetchdataClaim({
        invoke: 'System.execute',
        argc: '2',
        a0: 'SSO.login',
        a1: {
          inStr: this.$route.query.ticket,
          aid: this.$route.query.aid
        }
      });
      await this.fetchGetRelatedLoginInfo({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.getRelatedLoginInfo',
        a1: {
          empid: localStorage.getItem('userid')
        }
      });
      // this.$router.push({ name: 'first-time-login-dashboard' });
      this.$router.push({ name: 'first-time-login-employee-verification' });
    },
    async getBroker() {
      const response = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Broker.Get'
      });
      this.brokerMail = JSON.parse(response.data.data[0].value).email;
    },
    async handleLogin() {
      try {
        if (!this.form.username && !this.form.password) {
          this.showNameHint = true;
          this.showPassBlank = true;
        } else if (this.form.username && !this.form.password) {
          this.showPassBlank = true;
          this.showNameHint = false;
        } else if (this.form.password && !this.form.username) {
          this.showNameHint = true;
          this.showPassBlank = false;
        } else if (this.form.password.length < 8) {
          this.showPassHint = true;
          this.showPassBlank = false;
        } else {
          this.showNameHint = false;
          this.showPassBlank = false;
          this.showPassHint = false;
        }
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        let timer = setTimeout(this.handleModalShowBenefit(true), 2000);
        this.handleModalShowBenefit(true);
        await this.fetchdataClaim({
          invoke: 'System.execute',
          argc: '2',
          a0: 'User.login',
          a1: {
            userid: this.form.username,
            password: this.form.password,
            countrycode: '',
            mobilenumber: '',
            emailaddress: '',
            token: '',
            src: 'webpage'
          }
        });
        clearTimeout(timer);
        this.handleModalShowBenefit(false);
        if (this.check.dt == 'default') {
          this.isCounting = false;
          this.isLocked = false;
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
          let isEmployeeVerified =
            localStorage.getItem('isemployeeverified') === 'true' ? true : false;
          this.isLoading = true;
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
              this.isLoading = false;
              this.changeCurrentStep(1);
              this.handleSetShowFirst(true);
              this.$router.push({ name: 'first-time-login-employee-verification' });
            }, 3000);
          }
        } else if (this.form.username && this.form.password != '') {
          this.handleCheckLogin();
        }
      } catch (error) {
        console.log('error', error);
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
      let isfirstEnrollFlag = localStorage.getItem('firstEnrollFlag') === 'true' ? true : false;

      //firstEnrollFlag ---> true, user can enrol --> go to benefits page
      //firstEnrollFlag ---> false, user cannot enrol  --> go to dashboard
      //firstEnrollflag --> check that this is User's first time to enrol in benefits.
      //checkEnrol -- > 1, timer not finished, user can enrol --> go to benefits page
      //checkEnrol ---> 0, timer is finished, user cannot enrol .. go to dashboard.
      //checkEnrol ---> check that benefit enrolment period is still open.

      if (checkEnrol) {
        setTimeout(() => {
          this.isLoading = false;
          // this.$router.push({ name: 'first-time-login-dashboard' });
          this.$router.push({ name: 'first-time-login-employee-verification' });
        }, 3000);
      } else {
        if (!isfirstEnrollFlag) {
          // this.$router.push({ name: 'first-time-login-dashboard' });
          this.$router.push({ name: 'first-time-login-employee-verification' });
        } else if (
          isfirstEnrollFlag ||
          this.checkbenefitsSaved == null ||
          this.checkbenefitsSaved.listOptval.length < 1 ||
          this.checkbenefitsSaved.listCheckBox.length < 1 ||
          this.checkbenefitsSaved.listCheckBoxSub[0].length < 1
        ) {
          setTimeout(() => {
            this.isLoading = false;
            // this.$router.push({ name: 'first-time-login-benefit' });
            this.$router.push({ name: 'first-time-login-employee-verification' });
          }, 3000);
        } else {
          setTimeout(() => {
            this.isLoading = false;
            // this.$router.push({ name: 'first-time-login-benefit-list-benefit' });
            this.$router.push({ name: 'first-time-login-employee-verification' });
          }, 3000);
        }
      }
    },
    handleCheckLogin() {
      if(this.check.value.includes('attempt(s) before your account is locked')){
        this.notiLocked = true;
      } else if (this.check.value.includes('Your account is locked after more than 10 attempt(s)')){
        this.isCounting = false;
        this.isLocked = true;
      } else if (this.check.value.includes('E_MOBILEREQUIRED') || this.check.value.includes('E_EMAILREQUIRED') || this.check.value.includes('E_TOKENREQUIRED')){
        this.step += 2
      }
      else {
        this.isCounting = true;
        this.$v.form.password.$model = '';
        setTimeout(() => {
          this.isCounting = false
        }, 5000);
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: this.convert(this.check.value)
        });
      }
    },
    handleSingpassLogin() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
    },
    validateState(username) {
      const { $dirty, $error } = this.$v.form[username];
      return $dirty ? !$error : null;
    },
    checkValidateFormInfo() {
      if (this.isLocked) {
        return 'mt--30';
      } else if (this.isCounting) {
        return 'form__info--warn';
      } else {
        return 'form__info';
      }
    },
    checkValidateIconEye() {
      if (this.isLocked) {
        return 'icon-eye-locked';
      } else if (this.isCounting) {
        return 'icon-eye-warn';
      } else {
        return 'icon-eye';
      }
    },
    convert(str) {
      return String(str)
        .replaceAll('null:', '')
        .replaceAll(
          'If you have forgotten your password, please click on “Forgot Password” to reset it.',
          ''
        )
        .replaceAll('System.execute$2:E_FAIL:', '');
    }
  },
  watch: {
    'form.password': function(){
      this.showPassBlank = !this.form.password
      if(this.form.password && this.form.password.length < 8){
        this.showPassBlank = false
        this.showPassHint = true
      } else {
        this.showPassHint = false
      }
    },
    'form.username': function(){
      this.showNameHint = !this.form.username
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/login/login.css';
</style>
