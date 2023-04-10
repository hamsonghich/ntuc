<template>
  <div class="bg-image-forgot bg-white d-flex align-items-center">
    <div class="forgot-form-container d-flex flex-column align-items-start">
      <div class="notification-form mb--15 green-noti" v-if="isSuccess">
        <div
          class="
            title-notify
            text-center text-14
            font__regular
            text-white
            d-flex
            align-items-center
            justify-content-center
          "
        >
          {{ convert(this.messageForgot) }}
        </div>
      </div>
      <div class="notification-form mb--15 red-noti" v-if="isFailed">
        <div
          class="
            title-notify
            text-center text-14
            font__regular
            text-white
            d-flex
            align-items-center
            justify-content-center
          "
        >
          {{ convert(this.messageForgot) }}
        </div>
      </div>
      <div class="forgot-form bg-white">
        <div class="fpg-logo">
          <img src="@/assets/logo/income-logo.png" alt="logo-fpg" />
        </div>
        <div class="askAccount line-height-12 text-black font-400 mt--30 font__regular text-16">
          {{ $t('forgetPass.askAccount') }}
          <a class="text-decoration-none cursor_pointer" @click="clickLogin">
            {{ $t('btn.signin') }}
          </a>
        </div>
        <div class="credentials mt--30">
          <h2
            class="
              forgot-title
              line-height-16
              font-400
              d-flex
              align-items-center
              font__regular
              text-24
            "
          >
            {{ $t('forgetPass.title') }}
          </h2>
          <p
            v-if="!passwordError && !userIdError"
            class="
              forgot-slogan
              line-height-19
              mt--10
              font-400
              d-flex
              align-items-center
              text-center
              font__regular
              text-15
              mb-0
            "
          >
            {{ $t('forgetPass.slogan') }}
          </p>
        </div>
        <b-form class="form-password mt--10">
          <div class="title line-height-15 mb--10 text-black font__regular text-16">
            {{ $t('forgetPass.forgetPassword') }}
          </div>
          <b-form-group id="form-group-userId" class="mb-0">
            <b-form-input
              class="form-input text-16"
              v-model="$v.form.UserId.$model"
              :state="validateState('UserId')"
              :placeholder="$t('forgetPass.input-userId')"
              :disabled="this.form.Email != null ? true : false"
            />
          </b-form-group>
          <b-form-group id="form-group-dob" class="mb-0">
            <DatetimePicker
              :placeholder="placeholder"
              v-model="$v.form.DateOfBirth.$model"
              :state="validateState('DateOfBirth')"
              :options="options"
              :disabled="this.form.Email != null ? true : false"
            />
          </b-form-group>
        </b-form>
        <div class="separation-line mt--20"></div>
        <b-form class="form-userId mt--10">
          <div class="title font-400 mb--10 text-black font__regular text-16">
            {{ $t('forgetPass.forgetUserId') }}
          </div>
          <b-form-group id="form-group-email" class="mb-0">
            <b-form-input
              class="form-input text-16"
              type="email"
              v-model="$v.form.Email.$model"
              :state="validateState('Email')"
              :placeholder="$t('forgetPass.input-email')"
              :disabled="(this.form.UserId || this.form.DateOfBirth) != null"
            />
          </b-form-group>
          <div class="text-warn line-height-10">
            <p
              class="
                text-NTUC-6
                mb--20
                font__regular
                line-height-10
                font-400
                mt--10
                text-12
                d-flex
                align-items-center
              "
            >
              {{ $t('forgetPass.warn') }}
            </p>
          </div>
        </b-form>
        <b-button
          class="
            btn-submit
            border-0
            mt--20
            bg-NTUC-3
            custom-text
            font__regular font-500
            text-14
            d-flex
            flex-row
            align-items-center
            justify-content-center
          "
          :disabled="(form.UserId || form.DateOfBirth || form.Email) == null"
          @click="onSubmit"
        >
          {{ $t('btn.submit') }}
        </b-button>
        <b-button
          class="
            btn-submit
            border-0
            mt--10
            bg-NTUC-2
            custom-text
            font__regular font-500
            text-14
            d-flex
            flex-row
            align-items-center
            justify-content-center
          "
          @click="_goToLogin"
        >
          {{ $t('btn.back') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import DatetimePicker from '../../components/datetimePicker/index.vue';
import { validationMixin } from 'vuelidate';
import { email } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import { EXCEPTION } from '../../utils/constants/statusResponse';
export default {
  layout: 'login',
  mixins: [validationMixin],
  components: {
    datePicker,
    DatetimePicker
  },
  validations: {
    form: {
      UserId: {},
      DateOfBirth: {},
      Email: { email }
    }
  },
  data() {
    return {
      isSuccess: false,
      isFailed: false,
      placeholder: 'Date of Birth',
      messageForgot: '',
      form: {
        UserId: null,
        DateOfBirth: null,
        Email: null
      },
      options: {
        format: 'DD MMM YYYY',
        useCurrent: false
      },
      passwordError: false,
      userIdError: false
    };
  },
  computed: { ...mapGetters('forgotPass', ['resetPassword', 'changeUserID']) },
  watch: {
    'form.Email': function () {
      if (this.form.Email == '') {
        this.form.Email = null;
      }
    }
  },
  methods: {
    ...mapActions('forgotPass', ['fetchresetPassword', 'fetchchangeUserid']),
    _formatTimeCallApi(time) {
      return this.$dayjs(time).format('YYYY-MM-DD');
    },
    convert(str) {
      return String(str)
        .replaceAll('null:null:Reset Password Error (RSP001).', '')
        .replaceAll(
          'If you have forgotten your password, please click on “Forgot Password” to reset it.',
          ''
        )
        .replaceAll('System.execute$2:E_FAIL:', '');
    },
    _goToLogin() {
      this.$router.push({ name: 'login' });
    },
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      if ((this.form.UserId || this.form.DateOfBirth) != null) {
        await this.fetchresetPassword({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Leave.ResetPassword',
          a1: {
            UserId: this.form.UserId,
            DOB: this._formatTimeCallApi(this.form.DateOfBirth),
            SendEmail: '1'
          }
        });
        if (this.resetPassword.dt == EXCEPTION) {
          this.isFailed = true;
          this.isSuccess = false;
          this.messageForgot = this.resetPassword.value;
        } else {
          this.isFailed = false;
          this.isSuccess = true;
          this.messageForgot = this.resetPassword.value;
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 2000);
        }
      } else {
        await this.fetchchangeUserid({
          invoke: 'System.execute',
          argc: '2',
          a0: 'User.ForgetUserID',
          a1: {
            emailaddress: this.form.Email
          }
        });
        if (this.changeUserID.dt == EXCEPTION) {
          this.isFailed = true;
          this.isSuccess = false;
          this.messageForgot = this.changeUserID.value;
        } else {
          this.isFailed = false;
          this.isSuccess = true;
          this.messageForgot = this.changeUserID.value;
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 2000);
        }
      }
    },
    validateState(username) {
      const { $dirty, $error } = this.$v.form[username];
      return $dirty ? !$error : null;
    },
    clickLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/login/forgot/forgot.css';
</style>

<style>
@import '@/assets/css/style.css';
</style>
