<template>
  <div class="bg-NTUC-7 pt--30 pb--30 margin-auto d-flex align-items-center justify-content-center h-100">
    <div>
      <div class="text-48 text-NTUC-1 text-center font__regular font-400">{{ $t('take_step.title') }}</div>
      <div class="text-center text-20 mt--20 title font__regular font-400">{{ $t('take_step.ready_to_start') }}</div>
      <div class="mt--20">
        <img src="@/assets/logo/Ellipse 682.png" alt="" class="mr--10">
        <img src="@/assets/logo/Ellipse 680.png" alt="" class="mr--10">
        <img src="@/assets/logo/Ellipse 681.png" alt="">
      </div>
      <div class="mt--10 d-flex justify-content-center">
        <b-button @click="_clickBtnYourCoverage" class="text-16 font__regular bg-NTUC-1 button__hover">
          {{ $t('take_step.proceed_to_customise_yout_coverage') }}
        </b-button>
        <b-button @click='_clickBtnDoThisLater'
          class="text-16 button__hover font__regular btn__primary ml-2 w-auto">
          {{ $t('take_step.do_this_later') }}
        </b-button>
      </div>
      <div class="text-14 font-400 font__regular mx-auto mt--10 text-gray--800" style="max-width:338px;">{{ $t('take_step.button_1') }}</div>
      <div class="text-14 font-400 font__regular mx-auto mt--10 text-gray--900" style="max-width:338px;">{{ $t('take_step.button_2') }}<a class="text-NTUC-3">{{ $t('take_step.here') }}</a>. 
      </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      modalShow: false,
      isLoading: false,
      modalShowEnrolmentdisclaimer: false
    }
  },
  methods: {
    ...mapActions("benefit", ["getListDependent"]),
    async _clickBtnYourCoverage() {
      this.$router.push({ name: "first-time-login-benefit-list-benefit" });
    },
    _clickBtnDoThisLater() {
      this.$router.push({ name: 'dashboard' });
    }
  },
};

</script>

<style scoped>
@import '@/assets/css/button/index.css';
.title {
  line-height: 200%;
}
.button__hover:hover {
  background: var(--NTUC-1) !important;
  border: 1px solid var(--NTUC-1-light) !important;
  box-shadow: 0 0 0 0.2rem var(--NTUC-1-light) !important;
}
</style>
