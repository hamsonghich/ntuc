<template>
  <div>
    <div class="container__log bg-NTUC-7 w-100 py--30 px--50 my-0 mx-auto  d-flex" :class="step === 2 ? 'block-step-complete h-100': '' ">
      <StepVerticalLog />
      <div class="cart__log w-100 position-relative br--10 mb--30 ml--15" :class="step === 2 ? 'p-20 min_h_686': '' ">
        <StepOneLog v-if="step === 1.1"/>
        <StepTwoLog v-if="step === 2"/>
      </div>
       <div class="cursor_pointer btn btn-close ml-2  mt-3 mr--50">
          <img
            @click="_redirectClose"
            class="icon__close__dark"
            src="@/assets/images/icon-close-dark.png"
            alt="icon-close-dark"
          />
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import StepVerticalLog from '~/components/log/stepVerticalLog.vue';
import StepOneLog from '~/components/log/stepOneLog.vue';
import StepTwoLog from '~/components/log/stepTwoLog.vue';

export default {
  layout: 'first-time-login',
  components: {
    StepVerticalLog,
    StepOneLog,
    StepTwoLog,
  },
  data: () => ({}),
  computed: {
    ...mapGetters('log', ['step', 'isCreateLog']),
    ...mapGetters('alert', ['alertConfig'])
  },
  created() {
    this.changeStep(1.1);
  },
  methods: {
    ...mapActions('log', ['changeStep', 'changeLog']),
    ...mapActions('notification', ['getBroker']),
    ...mapMutations('log', ['SET_IS_CREATE_LOG']),
    ...mapActions('alert', ['_changeAlertConfig']),
    _handleColeAlert() {
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
      this.SET_IS_CREATE_LOG(1);
    },
    _redirectClose() {
      if (this.$route.params && this.$route.params.isQuickLog) {
        this.$router.push({name: 'login'});
        return;
      }
      this.$router.push({name: 'log'});
    }
  },
  watch: {
  },
  destroyed() {
  }
};
</script>

<style scoped>
@import '@/assets/css/log/log_sub.css';
</style>
