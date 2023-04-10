<template>
  <div class="container-step3">
    <h4 class="title-step3 mt--10 m--10 text-24 font-400">{{ $t('firstTime.Personalise') }}</h4>
    <div class="mb-3">
      <p class="text-18 title-step-3 text-NTUC-16">
        {{ pdpaprompt }}
      </p>
    </div>
    <b-form-checkbox id="checkbox-1" v-model="status" class="text-black" name="checkbox-1">
      {{ $t('firstTime.change_user') }}
    </b-form-checkbox>
    <b-form-input
      v-model="form.userName"
      class="input-create text-NTUC-1 mt-2"
      :placeholder="''"
      type="text"
      :disabled="!this.status"
    />
    <b-form-invalid-feedback class="d-block">
      <span v-if="isAlert"> {{ $t('firstTime.validate.username_exist') }} <br /> </span>
    </b-form-invalid-feedback>
    <button class="btn-step border-0 rounded bg-NTUC-6 text-white mt--20" @click="_handleSubmit()">
      {{ $t('firstTime.submit') }}
    </button>
    <button class="btn-step-skip bg-white rounded text-NTUC-6 mt--20" @click="_handleCloseModal()">
      {{ $t('firstTime.skip') }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { postAxios } from '~/services/callApi';
export default {
  props: ['showFirst'],
  data() {
    return {
      form: {
        userName: localStorage.getItem('name')
      },
      status: false,
      alert: {
        isShow: false,
        text: ''
      },
      pdpaprompt: localStorage.getItem('pdpaprompt'),
      isAlert: false
    };
  },
  computed: {
    ...mapGetters('login', ['benefitEnroll'])
  },
  methods: {
    ...mapActions('firstTimeLogin', ['handleSetShowFirst']),
    _handleCloseModal() {
      let displayFlag = JSON.parse(this.benefitEnroll.value).displayflag;
      let isEmployeeVerified = localStorage.getItem('isemployeeverified') === 'true' ? true : false;
      if (isEmployeeVerified) {
        if(displayFlag==1){
          // this.$router.push('/first-time-login/benefit/list-benefit')
          this.$router.push('/first-time-login/employee-verification')
        } else {
          // this.$router.push('/first-time-login/dashboard');
          this.$router.push('/first-time-login/employee-verification');
        }
      } else {
        this.handleSetShowFirst(false);
      }
    },
    async _handleChangeUsername() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PDPA.PostUpdate',
        a1: {
          empid: localStorage.getItem('empid'),
          changedusername: localStorage.getItem('empName'),
          username: this.form.userName,
          contactno: '',
          countrycode: '',
          emailaddress: ''
        }
      });
      let displayFlag = JSON.parse(this.benefitEnroll.value).displayflag;
      let isEmployeeVerified = localStorage.getItem('isemployeeverified') === 'true' ? true : false;
      if (res.data.data[0].dt == 'default') {
        if (!displayFlag && isEmployeeVerified) {
          // this.$router.push('/first-time-login/dashboard');
          this.$router.push('/first-time-login/employee-verification');
        } else {
          this._handleCloseModal();
        }
      } else {
        this.isAlert = true;
      }
    },
    async _handleSubmit() {
      if (this.status) {
        await this._handleChangeUsername();
      } else {
        this._handleCloseModal();
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/step3.css';
</style>
