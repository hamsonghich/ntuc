<template>
  <div class="d-flex justify-content-between h-100 LoaderClaim">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">{{ $t('log.understood') }} ...</div>
        <div class="question__quick__log">{{ $t('log.please_wait') }}</div>
        <div class="wap-loader">
          <div class="d-flex justify-content-center loading-spinner margin-top--45">
            <img class="Loader" src="@/assets/images/Loader.png" alt="Loader" />
          </div>
        </div>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import quoteClaim from '../quoteClaim.vue'

  export default {
    components: {
      quoteClaim
    },
    data: () => ({}),

    created() {
      setTimeout(() => {
        this.setCreateClaimStep(4);
      }, 3000);
    },
    methods: {
      ...mapActions('claim', ['setCreateClaimStep']),
      _nextStep() {
        this.setCreateClaimStep(2);
      }
    },
    computed: {
      ...mapGetters('claim', ['createStep'])
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/quick-log/stepContent.css';
  @import '@/assets/css/login/OTP/otp.css';
  @import '@/assets/css/claim/create/loader-claim.css';
</style>
