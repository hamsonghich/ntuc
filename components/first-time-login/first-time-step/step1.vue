<template>
  <div>
    <div v-if="alert.isShow" class="red-aleart mt--20 mb--20 px-3 py-2 rounded text-white">
      {{ alert.text }}
    </div>
    <h4 class="title-step1 font-400 text-24">{{ $t('firstTime.title_step1') }}</h4>
    <h4 class="font-400 text-black text-20">{{ title }}</h4>
    <div class="descrip-title text-12 mt--20">
      <div v-for="(item, index) in conditions" :key="index">
        <p v-html="item" />
      </div>
    </div>
    <button class="btn-step1 border-0 rounded bg-NTUC-6 text-white" @click="handleNextStep">
      {{ $t('firstTime.Agree') }}
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { postAxios } from '~/services/callApi';
export default {
  data() {
    return {
      alert: {
        isShow: false,
        text: ''
      },
      title: 'Disclaimer & Consent',
    };
  },
  computed: {
    title: JSON.parse(localStorage.getItem('consentagreementitle')) || 'Disclaimer & Consent',
    conditions() {
      let conditions = [];
      const consentagreement = JSON.parse(localStorage.getItem('consentagreement'));
      conditions = consentagreement.split('<br/>');
      return conditions;
    }
  },
  mounted() {
    this.title = JSON.parse(localStorage.getItem('consentagreementitle'));
  },
  methods: {
    ...mapActions('firstTimeLogin', [
      'changeCurrentStep',
      'handleChangeAlert',
      'handleCloseAlert',
      'handleSetShowFirst'
    ]),
    ...mapActions('login', ['fetchGetRelatedLoginInfo']),
    async handleNextStep() {
      //update consentagreementflag
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Employee.ConsentAgreementProcess'
        });

        let not_error = res.data.data[0].dt === 'default';
        let alert_message = res.data.data[0].value;
        let isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true';
        //refresh localStorage
        await this.refreshLocalStorage();

        //show user feedback alert
        if (res.data && not_error) {
          if (!isPasswordChanged) {
            this.changeCurrentStep(2);
          } else {
            //route to dashboard. If the employee has not been verified, a prompt will appear.
            this.$router.push({ name: 'first-time-login-employee-verification' });
            this.handleSetShowFirst(false);
          }
        } else {
          this.alert = {
            isShow: true,
            text: alert_message
            //'Your consent has not been received. We apologise for the inconvenience. Please //contact support@benefitsolutions.com.sg for details'
          };
        }
      } catch (err) {
        this.alert = {
          isShow: true,
          text: alert_message
          //'Your consent has not been received. We apologise for the inconvenience. Please //contact support@benefitsolutions.com.sg for details'
        };
      }
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
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/step1.css';
</style>

<style>
.modal-content {
  border-radius: 8px;
}
.modal-open {
  padding-right: 0 !important;
}
</style>
