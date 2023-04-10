<template>
  <div>
    <div
      class="container__log bg-NTUC-7 w-100 py--30 px--50 my-0 mx-auto d-flex"
      :class="step === 2 ? 'block-step-complete h-100' : ''"
    >
      <StepVerticalLog />
      <div class="w-100 ml--15">
        <div
          v-if="showAlertSuccess"
          class="alert-wrapper-success d-flex justify-content-between align-items-center"
        >
          <div class="d-flex justify-content-start align-items-center">
            <b-icon class="text-white mx-4" icon="check-circle-fill"> </b-icon>
            <div class="font__regular text-white">{{ $t('log.alert-success-log') }}</div>
          </div>
          <b-icon @click="_handleCloseAlert" class="mr-2 text-white" icon="x-circle-fill"></b-icon>
        </div>
        <div
          v-if="showAlertFail"
          class="alert-wrapper-fail d-flex justify-content-between align-items-center"
        >
          <div class="d-flex justify-content-start align-items-center">
            <b-icon class="text-white mx-4" icon="exclamation-octagon-fill"> </b-icon>
            <div class="font__regular text-white">
              {{ $t('log.alert-fail-log-1') }}
              <a href="">+65 1111 1111 </a>
              {{ $t('log.alert-fail-log-2') }}
              <a href="">support@benefitsolutions.com</a>
            </div>
          </div>
          <b-icon @click="_handleCloseAlert" class="mr-2 text-white" icon="x-circle"></b-icon>
        </div>
        <div
          class="cart__log w-100 position-relative br--10 mb--30"
          :class="step === 2 ? 'p-20 min_h_686' : ''"
        >
          <LogDetail
            @_handleShowAlertSuccess="_handleShowAlertSuccess"
            @_handleShowAlertFail="_handleShowAlertFail"
            @_handleCheckEditLog="_handleCheckEditLog"
          />
        </div>
      </div>
      <div class="cursor_pointer btn btn-close ml-2 mt-3 mr--50">
        <img
          @click="$router.push({ name: 'log' })"
          class="icon__close__dark"
          src="@/assets/images/icon-close-dark.png"
          alt="icon-close-dark"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import LogDetail from '~/components/log/logDetail.vue';
  import AlertSuccess from '~/components/alertSuccess/index.vue';
  import StepVerticalLog from '~/components/log/stepVerticalLog.vue';

  export default {
    layout: 'first-time-login',
    components: {
      LogDetail,
      AlertSuccess,
      StepVerticalLog
    },
    data: () => ({
      alert: {
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      },
      isCheckEditLog: false,
      showAlertSuccess: false,
      showAlertFail: false
    }),
    computed: {
      ...mapGetters('log', ['step', 'isCancelLog', 'log', 'isCreateLog'])
    },
    watch: {
      isCreateLog: async function (newVal) {
        if (newVal == 2) {
          this.alert.isShow = true;
          this.alert.typeAlert = 'success';
          this.alert.textAlert = this.$t('log.edit_success');
          this.SET_IS_CREATE_LOG(1);
        } else if (newVal == 3) {
          const resBroker = await this.getBroker({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Broker.Get'
          });

          this.alert.isShow = true;
          this.alert.typeAlert = 'error';
          this.alert.textAlert = this.$t('log.edit_error', {
            supEmail: resBroker.email,
            numberPhone: resBroker.contactnumber
          });
          this.SET_IS_CREATE_LOG(1);
        }
      }
    },
    mounted() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    methods: {
      ...mapActions('log', ['changeLog']),
      ...mapMutations('log', ['SET_IS_CREATE_LOG']),
      ...mapActions('notification', ['getBroker']),
      _handleCheckEditLog(value) {
        this.isCheckEditLog = value;
      },
      _handleColeAlert() {
        this.alert.isShow = false;
        this.SET_IS_CREATE_LOG(1);
      },
      _handleShowAlertSuccess() {
        this.showAlertSuccess = true;
      },
      _handleShowAlertFail() {
        this.showAlertFail = true;
      },
      _handleCloseAlert() {
        this.showAlertFail = false;
        this.showAlertSuccess = false;
      }
    },
    destroyed() {
      this.changeLog({});
      this.SET_IS_CREATE_LOG(1);
      this.alert.isShow = false;
    }
  };
</script>

<style scoped>
  @import '@/assets/css/log/log_sub.css';
</style>
