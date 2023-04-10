<template>
  <div class="container-step2 pr-3">
    <h4 class="title-step2 mt--30 font-400 text-24">{{ $t('firstTime.password') }}</h4>
    <div v-if="this.alert.isShow">
      <div v-if="this.alert.type == 'success'" class="green-aleart rounded px-3 py-2 text-white">
        {{ $t('firstTime.save_pass') }}
      </div>
      <div v-else-if="this.alert.type == 'error'" class="red-aleart px-3 py-2 rounded text-white">
        {{ alertError }}
      </div>
    </div>
    <b-form aria-autocomplete="off" class="text-black change-input-contain">
      {{ $t('firstTime.update_pass') }}
      <div>
        <b-form-input
          :value="userName"
          class="input-create mt--10 text-NTUC-1 font__regular"
          :placeholder="''"
          type="text"
          :disabled="true"
        />
      </div>
      <div>
        <b-form-input
          class="input-create mt--10 text-NTUC-10 font__regular"
          placeholder="Current Password"
          type="text"
          id="firstName"
          name="firstName"
          v-model.lazy="$v.form.currentPass.$model"
          :state="validateState('currentPass')"
          autocomplete="off"
        />
        <b-form-invalid-feedback class="d-block">
          <span v-if="$v.form.currentPass.$model != null && !form.currentPass.length">
            {{ $t('firstTime.validate.blankCurrent') }} <br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="position-relative">
        <b-form-input
          class="input-create mt--10 input text-NTUC-10 font__regular"
          :type="form.showNewPass ? 'text' : 'password'"
          placeholder="New Password"
          v-model="$v.form.newPass.$model"
          :state="validateState('newPass')"
          autocomplete="off"
        />
        <span
          :class="
            $v.form.newPass.$model == null && !$v.form.newPass.$error
              ? 'icon-formfail-login'
              : 'icon-formsuccess-login'
          "
        >
          <b-icon
            @click="toggleShowPassword"
            v-if="form.showNewPass"
            class="cursor-pointer position-absolute"
            icon="eye"
          />
          <b-icon
            @click="toggleShowPassword"
            v-else
            class="cursor-pointer position-absolute"
            icon="eye-slash"
          />
        </span>
        <b-form-invalid-feedback class="d-block">
          <span v-if="$v.form.newPass.$model != null && !form.newPass.length">
            {{ $t('firstTime.validate.blankNew') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isLeast8Characters">
            {{ $t('firstTime.validate.short') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isNotRepeats4Times">
            {{ $t('firstTime.validate.repeat') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isContainUppercase">
            {{ $t('firstTime.validate.upperCase') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isContainLowercase">
            {{ $t('firstTime.validate.lowerCase') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isContainNumber">
            {{ $t('firstTime.validate.digit') }} <br />
          </span>
          <span v-if="$v.form.newPass.$model && !$v.form.newPass.isContainSymbol">
            {{ $t('firstTime.validate.special') }}
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="position-relative">
        <b-form-input
          class="input-create mt--10 input text-NTUC-10 font__regular"
          :type="form.showConfirmPass ? 'text' : 'password'"
          placeholder="Confirm New Password"
          v-model="$v.form.confirmPass.$model"
          :state="validateState('confirmPass')"
          autocomplete="off"
        />
        <span
          :class="
            $v.form.confirmPass.$model == null ? 'icon-formfail-login' : 'icon-formsuccess-login'
          "
        >
          <b-icon
            @click="toggleShowConfirmPass"
            v-if="form.showConfirmPass"
            class="cursor-pointer position-absolute"
            icon="eye"
          />
          <b-icon
            @click="toggleShowConfirmPass"
            v-else
            class="cursor-pointer position-absolute"
            icon="eye-slash"
          />
        </span>

        <b-form-invalid-feedback class="d-block">
          <span v-if="$v.form.confirmPass.$model != null && !form.confirmPass.length">
            {{ $t('firstTime.validate.blankConfirm') }}<br />
          </span>
          <span v-if="!$v.form.confirmPass.sameAsPassword && form.confirmPass != null">
            {{ $t('firstTime.validate.match') }}
          </span>
        </b-form-invalid-feedback>
      </div>
    </b-form>
    <button
      :class="{'btn-step-changepass': !isError ? true : false}"
      class="btn-step bg-NTUC-6 text-white" 
      @click="handleSubmit">
      {{ $t('firstTime.submit') }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { postAxios } from '~/services/callApi';
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import {
  isStrongPassword,
  isContainUppercase,
  isContainLowercase,
  isContainNumber,
  isContainSymbol,
  isLeast8Characters,
  isNotRepeats4Times
} from '~/utils/functions/validatePassword';

export default {
  mixins: [validationMixin],
  props: ['isError'],
  data() {
    return {
      form: {
        currentPass: null,
        newPass: null,
        confirmPass: null,
        showNewPass: false,
        showConfirmPass: false
      },
      alert: {
        isShow: false,
        type: '',
        text: ''
      },
      statusChangePass: false,
      alertError: ''
    };
  },
  validations: {
    form: {
      currentPass: {
        required
      },
      newPass: {
        required,
        isContainSymbol,
        isContainUppercase,
        isContainLowercase,
        isContainNumber,
        isStrongPassword,
        isLeast8Characters,
        isNotRepeats4Times
      },
      confirmPass: {
        required,
        isContainUppercase,
        isContainLowercase,
        isContainNumber,
        isContainSymbol,
        isStrongPassword,
        isLeast8Characters,
        isNotRepeats4Times,
        sameAsPassword: sameAs('newPass')
      }
    }
  },
  computed: {
    ...mapGetters('login', ['benefitEnroll']),
    userName: function () {
      return localStorage.getItem('name');
    }
  },
  methods: {
    ...mapActions('firstTimeLogin', [
      'changeCurrentStep',
      'handleChangeAlert',
      'handleCloseAlert',
      'handleSetShowFirst'
    ]),
    ...mapActions('login', ['fetchGetRelatedLoginInfo']),

    toggleShowPassword() {
      this.form.showNewPass = !this.form.showNewPass;
    },
    toggleShowConfirmPass() {
      this.form.showConfirmPass = !this.form.showConfirmPass;
    },
    async handleSubmit() {
      try {
        this.alert = {
          isShow: false,
          type: 'success',
          text: ''
        };
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          this.form = {
            currentPass: this.form.currentPass == null ? '' : this.form.currentPass,
            newPass: this.form.newPass == null ? '' : this.form.newPass,
            confirmPass: this.form.confirmPass == null ? '' : this.form.confirmPass,
            showNewPass: false,
            showConfirmPass: false
          };
          return;
        }
        await this.handleChangePass();
        await this.refreshLocalStorage();
        let displayFlag = JSON.parse(this.benefitEnroll.value).displayflag;
        let first_time_login = localStorage.getItem('first_time_login') === 'true' ? true : false;
        let isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true' ? true : false;
        let isEnrolledFirstTime = localStorage.getItem('firstEnrollFlag') === 'true' ? true : false;
        if (this.statusChangePass) {
          setTimeout(() => {
            if(first_time_login){
              if(localStorage.getItem('isUsernameChanged') == 'false'){
                this.changeCurrentStep(3);
              } else {
                this.handleSetShowFirst(false);
              }
            } else {
              if (isPasswordChanged) {
                if(displayFlag==1 && isEnrolledFirstTime ){
                  // this.$router.push({name: 'first-time-login-benefit'})
                  this.$router.push({name: 'first-time-login-employee-verification'})
                  this.handleSetShowFirst(false);
                } else {
                  // this.$router.push({name: 'first-time-login-dashboard'});
                  this.$router.push({name: 'first-time-login-employee-verification'});
                  this.handleSetShowFirst(false);
                }
              } else{
                this.handleSetShowFirst(false);
              }
            }
          }, 1000);
        }
      } catch (error) {
        this.alert = {
          isShow: true,
          type: 'error',
          text: 'Your password could not be updated at this time. Please try again. If this persist, you may contact support@benefitsolutions.com.sg for details.'
        };
      }
    },
    async handleChangePass() {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Leave.ChangePassword',
          a1: {
            existingPwd: this.form.currentPass,
            newPwd: this.form.newPass
          }
        });
        this.$emit('handleClickSubmit')
        if (res.data.data[0].dt == 'default') {
          this.statusChangePass = true;
          this.alert = {
            isShow: true,
            type: 'success',
            text: 'Your password has been updated'
          };
        } else {
          this.statusChangePass = false;
          this.alertError = res.data.data[0].value.split(':').pop()
          this.alert = {
            isShow: true,
            type: 'error',
            text:
              res.data.data[0].value.slice(10) ??
              'Your password could not be updated at this time. Please try again. If this persist, you may contact support@benefitsolutions.com.sg for details.'
          };
        }
      } catch (error) {}
    },
    async refreshLocalStorage() {
      await this.fetchGetRelatedLoginInfo({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.getRelatedLoginInfo',
        a1: {
          empid: localStorage.getItem('userid')
        }
      });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/step2.css';
.icon-formfail-login {
  right: 0px;
}

.icon-formsuccess-login {
  right: 20px;
}

.icon-formfail-login,
.icon-formsuccess-login {
  position: absolute;
  top: -2px;
}
</style>
