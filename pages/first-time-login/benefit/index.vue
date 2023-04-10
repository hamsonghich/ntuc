<template>
  <div class="bg-NTUC-7 pt--30 pb--30">
    <b-container>
      <QuickLinks :isSaveAsDraft="false" />
      <b-row>
        <b-col cols="12" md="8">
          <div class="text-23 font__medium text-NTUC-6 mt--20 mb--20">
            {{ $t('benefit.my_core_benefits') }}
          </div>
          <div class="text-20 text-gray--800">
            {{ $t('benefit.description_4') }}
          </div>
          <div class="text-20 text-gray--800">
            {{ $t('benefit.description_6') }}
          </div>
        </b-col>
        <b-col v-if="showCountDown" cols="12" md="4">
          <Countdown />
        </b-col>
      </b-row>
      <b-row> &nbsp; </b-row>
      <b-row>
        <div class="d-flex justify-content-flex-end ml-3">
          <b-button @click="modalShow = true" class="text-16 font__regular mt--5 btn__primary">
            {{ $t('benefit.i’m_happy_with_the_core_benefits') }}
          </b-button>
        </div>
        <div class="d-flex justify-content-flex-end ml-3">
          <b-button @click="_redirect" class="text-16 font__regular mt--5 border-0 bg-NTUC-1">
            {{ $t('benefit.i_want_more_coverage_for_myself_and/or_dependents') }}
          </b-button>
        </div>
      </b-row>
      <CartBenefit :goToHDF="goToHDF" class="benefit" />
    </b-container>
    <b-modal
      v-model="modalShow"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.Important_Notes_please_read')"
      size="xl"
      centered
    >
      <div v-html="enrolmentdisclaimer" class="text-14 text-gray--800" />
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_redirectListBenefit">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CartBenefit from '~/components/first-time-login/benefit/cartBenefit.vue';
import QuickLinks from '~/components/first-time-login/benefit/quickLinks.vue';
import Countdown from '~/components/first-time-login/benefit/countdown.vue';

export default {
  layout: 'first-time-login',
  components: {
    CartBenefit,
    QuickLinks,
    Countdown
  },
  async fetch() {
    try {
      const resWebGetCountDownBarPeriod = await this.webGetCountDownBarPeriod({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Flex.WebGetCountDownBarPeriod',
        a1: {
          employee: localStorage.getItem('empid')
        }
      });
      this.enrolmentdisclaimer = resWebGetCountDownBarPeriod.enrolmentdisclaimer.replaceAll(
        '\n',
        '<br />'
      );
      this.showCountDown = resWebGetCountDownBarPeriod.displayflag;
    } catch (error) {
      console.log('fetch: ' + error);
    }
  },
  data: () => ({
    modalShow: false,
    goToHDF: false,
    enrolmentdisclaimer: '',
    showCountDown: 0
  }),
  methods: {
    ...mapActions('benefit', ['getClaimateList', 'webGetCountDownBarPeriod']),
    _redirectListBenefit() {
      this.$router.push({ name: 'first-time-login-confirm' });
    },
    async _redirect() {
      this.$router.push({ name: 'first-time-login-benefit-wonderful' });
      await this.getClaimateList({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Employee.getClaimateList',
        a1: {
          Emp: localStorage.getItem('empid')
        }
      });
    },
    _redirectHDForm() {
      this.$router.push({
        name: 'first-time-login-benefit-health-declaration',
        params: { healthDeclarationStep: 2 }
      });
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/button/index.css';
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
</style>
<style>
@import '@/assets/css/checkboxOrange';
</style>
