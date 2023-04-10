<template>
  <div>
    <div class="d-flex justify-content-between contain">
      <div 
        class="container-stepfirst w-100"
        :class="{'space-error': isError ? true : false}"
      >
        <img src="@/assets/logo/logo.png" alt="logo" class="logo" />
        <FirstStep1 v-if="currentStep == 1" />
        <FirstStep2 :isError="isError" @handleClickSubmit="handleClickSubmit" v-if="currentStep == 2" />
        <FirstStep3 v-if="currentStep == 3" :showFirst="showFirst" />
      </div>
      <div>
        <img class="contain" src="@/assets/images/imgrules.png" alt="logo" v-if="currentStep == 1" />
        <img class="contain" src="@/assets/images/imgchangepass.png" alt="logo" v-if="currentStep == 2" />
        <img class="contain" src="@/assets/images/imgchangename.png" alt="logo" v-if="currentStep == 3" />
      </div>
    </div>
  </div>
</template>

<script>
import FirstStep1 from '../first-time-login/first-time-step/step1.vue';
import FirstStep2 from '../first-time-login/first-time-step/step2.vue';
import FirstStep3 from '../first-time-login/first-time-step/step3.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['showFirst'],
  components: {
    FirstStep1,
    FirstStep2,
    FirstStep3
  },
  data(){
    return{
      isError: false
    }
  },
  computed: {
    ...mapGetters('firstTimeLogin', ['alert', 'currentStep'])
  },
  methods: {
    ...mapActions('firstTimeLogin', ['handleCloseAlert']),
    handleClickSubmit(){
      this.isError = true
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/step1.css';
</style>

<style>
#modalPopover___BV_modal_outer_ {
  z-index: 1039 !important;
}
</style>
